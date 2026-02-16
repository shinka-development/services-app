import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Linking, KeyboardAvoidingView, Platform, Alert, Modal as RNModal, ScrollView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

type Message = {
  id: string;
  text?: string;
  sender: 'user' | 'professional' | 'system';
  time: string;
  type: 'text' | 'image' | 'location';
  imageUrl?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
};

export default function ChatScreen() {
  const router = useRouter();
  const { name, role, phone } = useLocalSearchParams();
  const [inputText, setInputText] = useState('');
  const [toolsVisible, setToolsVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Initial empty state with just a system start message
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Solicitud aceptada - 14:00 HS', sender: 'system', time: '14:00', type: 'text' }
  ]);

  const displayPhone = phone ? phone.toString() : '';

  const handleCall = () => {
    if (displayPhone) {
        Linking.openURL(`tel:${displayPhone}`);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'image',
        imageUrl: result.assets[0].uri
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  const shareLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Permití el acceso a la ubicación para compartirla.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = 'Ubicación actual';
    
    try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
        
        if (reverseGeocode && reverseGeocode.length > 0) {
            const loc = reverseGeocode[0];
            address = `${loc.street || ''} ${loc.streetNumber || ''}, ${loc.city || ''}`.trim();
        }
    } catch (error) {
        console.log("Error finding address", error);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'location',
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address
      }
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    
    setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const openMap = (location?: { latitude: number; longitude: number }) => {
    if (!location) return;
    const { latitude, longitude } = location;
    const url = Platform.select({
      ios: `maps:?q=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`
    });
    Linking.openURL(url || `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.sender === 'system') {
      return (
        <View className="items-center mb-6 mt-4">
             <View className="bg-blue-50 px-4 py-2 rounded-xl flex-row items-center gap-2 border border-blue-100">
                <Ionicons name="construct-outline" size={16} color="#137FEC" />
                <Text className="text-[#137FEC] text-xs font-bold">{item.text}</Text>
             </View>
        </View>
      );
    }

    if (item.sender === 'user') {
        const isImage = item.type === 'image';
        const isLocation = item.type === 'location';

        if (isLocation) {
             return (
                <View className="items-center mb-4">
                    <TouchableOpacity onPress={() => openMap(item.location)} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex-row items-center gap-3 pr-6">
                         {/* Mini Map Representation */}
                         <View className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
                             <View className="absolute inset-0 bg-green-50 opacity-50" />
                             {/* Mock streets */}
                             <View className="absolute top-2 left-0 right-0 h-1 bg-gray-300 transform -rotate-12" />
                             <View className="absolute top-8 left-0 right-0 h-1 bg-gray-300 transform -rotate-12" />
                             <View className="absolute top-0 bottom-0 left-4 w-1 bg-gray-300 " />
                             
                             {/* Pin */}
                             <View className="absolute top-4 left-3">
                                <Ionicons name="location" size={24} color="#3B82F6" />
                             </View>
                         </View>
                         
                         <View>
                            <Text className="text-gray-900 font-bold text-sm">Ubicación compartida</Text>
                            <Text className="text-gray-500 text-xs mt-0.5 max-w-[200px]" numberOfLines={1}>{item.location?.address || 'Ubicación'}</Text>
                         </View>
                    </TouchableOpacity>
                </View>
             );
        }

        return (
            <View className="flex-row justify-end items-end gap-2 mb-4">
                 <View className={`bg-[#137FEC] p-3 rounded-2xl rounded-br-none shadow-sm max-w-[80%] ${isImage ? 'p-1' : ''}`}>
                    {isImage ? (
                        <Image source={{ uri: item.imageUrl }} className="w-48 h-32 rounded-xl" resizeMode="cover" />
                    ) : (
                        <Text className="text-white text-sm leading-5">{item.text}</Text>
                    )}
                    
                    <View className="flex-row justify-end items-center mt-1 gap-1">
                        <Text className={`text-[10px] ${isImage ? 'text-white shadow-sm font-bold bg-black/30 px-1 rounded' : 'text-blue-200'}`}>{item.time}</Text>
                        <Ionicons name="checkmark-done" size={12} color={isImage ? "white" : "#93C5FD"} />
                    </View>
                </View>
            </View>
        );
    }

    // Professional messages (text only for this demo)
    return (
        <View className="flex-row items-end gap-2 mb-4">
             <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                className="w-8 h-8 rounded-full mb-1"
            />
            <View className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm max-w-[80%] border border-gray-100">
                <Text className="text-gray-700 text-sm leading-5">{item.text}</Text>
                <Text className="text-gray-400 text-[10px] text-right mt-1">{item.time}</Text>
            </View>
        </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View className="pt-12 pb-4 px-4 flex-row items-center border-b border-gray-100 bg-white shadow-sm z-10">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="chevron-back" size={28} color="#0F172A" />
        </TouchableOpacity>
        
        <View className="relative">
            <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                className="w-10 h-10 rounded-full"
            />
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </View>
        
        <TouchableOpacity onPress={() => router.push('/ProfessionalProfile')} className="flex-1 ml-3 flex-row items-center">
            <View>
                <Text className="text-gray-900 font-bold text-base">{name || 'Juan Pérez'}</Text>
                <Text className="text-[#137FEC] text-xs font-medium">{role || 'Profesional'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#CBD5E1" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <TouchableOpacity 
            className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center ml-2"
            onPress={handleCall}
        >
            <Ionicons name="call" size={20} color="#137FEC" />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <View className="flex-1 bg-[#F9FAFB]">
        <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View className="p-4 bg-white border-t border-gray-100 flex-row items-center gap-3 pb-8">
             <TouchableOpacity onPress={() => setToolsVisible(true)} className="p-2 mr-1">
                <View className="bg-blue-50 p-2 rounded-full border border-blue-100">
                    <Ionicons name="flash" size={20} color="#137FEC" />
                </View>
             </TouchableOpacity>

             {/* Camera Button */}
             <TouchableOpacity onPress={pickImage} className="p-2">
                <View className="relative">
                   <Ionicons name="camera-outline" size={26} color="#64748B" />
                   <View className="absolute -top-1 -right-1 bg-white rounded-full">
                       <Ionicons name="add" size={12} color="#64748B" style={{fontWeight: 'bold'}} />
                   </View>
                </View>
             </TouchableOpacity>

             {/* Location Button */}
             <TouchableOpacity onPress={shareLocation} className="p-2 mr-1">
                <Ionicons name="location-outline" size={26} color="#64748B" />
             </TouchableOpacity>
             
             {/* Text Input */}
             <View className="flex-1 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-100 flex-row items-center">
                <TextInput 
                    className="flex-1 text-sm text-gray-900"
                    placeholder="Escribí un mensaje..."
                    placeholderTextColor="#9CA3AF"
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={sendMessage}
                    returnKeyType="send"
                />
             </View>

             {/* Send Button */}
             <TouchableOpacity 
                className={`w-10 h-10 rounded-full items-center justify-center shadow-lg shadow-blue-500/30 ${inputText.trim() ? 'bg-[#137FEC]' : 'bg-[#137FEC]'}`}
                onPress={sendMessage}
             >
                <Ionicons name="send" size={18} color="white" style={{ marginLeft: 2 }} />
             </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Worker Tools Modal */}
      <RNModal
        animationType="slide"
        transparent={true}
        visible={toolsVisible}
        onRequestClose={() => setToolsVisible(false)}
      >
        <TouchableOpacity 
            className="flex-1 bg-black/30 justify-end" 
            activeOpacity={1} 
            onPress={() => setToolsVisible(false)}
        >
            <View className="bg-white rounded-t-3xl pt-3 pb-10 h-[85%]">
                <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />
                
                <View className="px-5 flex-row justify-between items-center mb-6">
                    <Text className="text-xl font-bold text-slate-900">Herramientas Rápidas</Text>
                    <TouchableOpacity onPress={() => setToolsVisible(false)}>
                        <Ionicons name="close" size={24} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                    {/* Quick Responses */}
                    <View className="flex-row items-center gap-2 mb-4">
                        <Ionicons name="flash" size={16} color="#137FEC" />
                        <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">RESPUESTAS RÁPIDAS</Text>
                    </View>

                    <View className="gap-3 mb-8">
                        <TouchableOpacity className="flex-row items-center bg-blue-50 p-4 rounded-xl border border-blue-100" onPress={() => { setInputText('Estoy en la puerta'); setToolsVisible(false); }}>
                            <View className="w-8 h-8 bg-white rounded-lg justify-center items-center mr-3 shadow-sm">
                                <Ionicons name="location" size={18} color="#EF4444" />
                            </View>
                            <Text className="text-slate-700 font-semibold text-base">Estoy en la puerta</Text>
                        </TouchableOpacity>

                         <TouchableOpacity className="flex-row items-center bg-blue-50 p-4 rounded-xl border border-blue-100" onPress={() => { setInputText('Llego en 10 minutos'); setToolsVisible(false); }}>
                            <View className="w-8 h-8 bg-white rounded-lg justify-center items-center mr-3 shadow-sm">
                                <Ionicons name="time" size={18} color="#64748B" />
                            </View>
                            <Text className="text-slate-700 font-semibold text-base">Llego en 10 minutos</Text>
                        </TouchableOpacity>

                         <TouchableOpacity className="flex-row items-center bg-blue-50 p-4 rounded-xl border border-blue-100" onPress={() => { setInputText('Necesito comprar un repuesto'); setToolsVisible(false); }}>
                            <View className="w-8 h-8 bg-white rounded-lg justify-center items-center mr-3 shadow-sm">
                                <Ionicons name="construct" size={18} color="#64748B" />
                            </View>
                            <Text className="text-slate-700 font-semibold text-base">Necesito comprar un repuesto</Text>
                        </TouchableOpacity>

                         <TouchableOpacity className="flex-row items-center bg-blue-50 p-4 rounded-xl border border-blue-100" onPress={() => { setInputText('Terminé el trabajo'); setToolsVisible(false); }}>
                            <View className="w-8 h-8 bg-white rounded-lg justify-center items-center mr-3 shadow-sm">
                                <View className="bg-green-500 rounded-md p-0.5">
                                     <Ionicons name="checkmark" size={14} color="white" />
                                </View>
                            </View>
                            <Text className="text-slate-700 font-semibold text-base">Terminé el trabajo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Job Management */}
                    <View className="flex-row items-center gap-2 mb-4">
                        <Ionicons name="briefcase-outline" size={16} color="#137FEC" />
                        <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">GESTIÓN DEL TRABAJO</Text>
                    </View>

                    {/* Extra Budget Card */}
                    <View className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-4">
                        <View className="flex-row justify-between items-start mb-2">
                             <Text className="text-base font-bold text-slate-900">Enviar Presupuesto Extra</Text>
                             <View className="bg-blue-100 px-2 py-0.5 rounded-md">
                                 <Text className="text-[#137FEC] text-[10px] font-bold">NUEVO</Text>
                             </View>
                        </View>
                        <View className="flex-row items-center gap-3 mb-4">
                            <View className="flex-1">
                                <Text className="text-slate-500 text-xs">Si el trabajo es más complejo de lo esperado.</Text>
                            </View>
                            <View className="w-10 h-10 bg-blue-50 rounded-xl justify-center items-center">
                                <Ionicons name="receipt-outline" size={24} color="#137FEC" />
                            </View>
                        </View>
                         <TouchableOpacity className="bg-[#137FEC] py-3 rounded-xl items-center flex-row justify-center gap-2">
                            <Ionicons name="add-circle-outline" size={20} color="white" />
                            <Text className="text-white font-bold text-base">Generar Adicional</Text>
                         </TouchableOpacity>
                         <View className="flex-row justify-center items-center mt-3 gap-1">
                             <Text className="text-gray-400 text-[10px]">PROCESADO POR</Text>
                             <View className="flex-row items-center gap-0.5">
                                 <Ionicons name="logo-yen" size={10} color="#009EE3" /> 
                                 <Text className="text-slate-500 text-[10px] font-bold">mercadopago</Text>
                             </View>
                         </View>
                    </View>

                     {/* Final Payment Button */}
                     <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-2xl p-4 active:bg-gray-50">
                        <View className="w-10 h-10 bg-green-100 rounded-xl justify-center items-center mr-3">
                             <Ionicons name="cash-outline" size={24} color="#16A34A" />
                        </View>
                        <View className="flex-1">
                             <Text className="text-base font-bold text-slate-900">Solicitar Pago Final</Text>
                             <Text className="text-slate-500 text-xs">Enviar link de cobro al cliente</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                     </TouchableOpacity>

                </ScrollView>
            </View>
        </TouchableOpacity>
      </RNModal>

    </View>
  );
}
