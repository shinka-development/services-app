import { View, Text, ScrollView, TouchableOpacity, TextInput, Linking, Alert, Platform, Pressable, Modal, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

export default function RequestServiceScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const [description, setDescription] = useState('');
  
  // Location State
  const [address, setAddress] = useState({
    street: 'Av. Corrientes 1234',
    city: 'CABA, Argentina'
  });
  
  const [modalVisible, setModalVisible] = useState(false);
  const [tempStreet, setTempStreet] = useState('');
  const [tempCity, setTempCity] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [region, setRegion] = useState({
    latitude: -34.603722,
    longitude: -58.381592,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const handleChangeLocation = () => {
    setTempStreet(address.street);
    setTempCity(address.city);
    setModalVisible(true);
  };

  const handleSaveLocation = async () => {
    // Request permission first (required for Android mostly, good practice)
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la ubicación para buscar la dirección.');
      return;
    }

    const fullAddress = `${tempStreet}, ${tempCity}`;
    try {
      const geocodedLocation = await Location.geocodeAsync(fullAddress);
      
      if (geocodedLocation.length > 0) {
        const { latitude, longitude } = geocodedLocation[0];
        
        // Update both map region and address text
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        setAddress({ street: tempStreet, city: tempCity });
        setModalVisible(false);
      } else {
        Alert.alert("Dirección no encontrada", "Por favor verificá los datos ingresados.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Ocurrió un error al buscar la dirección.");
    }
  };

  const pickImage = async () => {
    if (images.length >= 3) {
      Alert.alert("Límite alcanzado", "Solo puedes subir hasta 3 fotos.");
      return;
    }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleOpenMaps = () => {
    const query = `${address.street}, ${address.city}`;
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(query)}`,
      android: `geo:0,0?q=${encodeURIComponent(query)}`,
    });
    
    // Fallback to web link if scheme fails or generic intent
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    
    Linking.canOpenURL(url!).then(supported => {
      if (supported) {
        Linking.openURL(url!);
      } else {
        Linking.openURL(webUrl);
      }
    }).catch(() => Linking.openURL(webUrl));
  };

  return (
    <View className="flex-1 bg-[#F3F4F6]">
      <Stack.Screen 
        options={{
          headerTitle: "Solicitud de Servicio",
          headerTitleStyle: { fontWeight: '700', fontSize: 18, color: '#0F172A' },
          headerTitleAlign: 'center', 
          headerBackTitle: "", 
          headerShadowVisible: false, 
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#0F172A',
        }} 
      />

      {/* Progress Bar - Sticky under header */}
      <View className="bg-white px-4 pb-4">
        <View className="flex-row gap-2 w-full">
          <View className="h-1.5 flex-1 bg-[#2563EB] rounded-full" />
          <View className="h-1.5 flex-1 bg-blue-100 rounded-full" />
          <View className="h-1.5 flex-1 bg-gray-100 rounded-full" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-4" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Location Card */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center gap-2">
              <Ionicons name="location-sharp" size={18} color="#2563EB" />
              <Text className="text-xs font-bold text-gray-900 uppercase tracking-wider">UBICACIÓN</Text>
            </View>
            <TouchableOpacity onPress={handleChangeLocation}>
              <Text className="text-[#2563EB] font-bold text-sm">Cambiar</Text>
            </TouchableOpacity>
          </View>

          {/* Map View */}
          <View className="h-36 w-full rounded-2xl overflow-hidden relative border border-gray-100">
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ flex: 1 }}
              initialRegion={region}
              region={region}
              scrollEnabled={false}
              zoomEnabled={false}
              pitchEnabled={false}
              rotateEnabled={false}
              toolbarEnabled={false}
              showsMyLocationButton={false}
            >
              <View className="absolute bottom-3 right-4 items-end z-10" pointerEvents="none">
                <Text className="text-black font-bold text-sm text-right shadow-sm">{address.street}</Text>
                <Text className="text-black text-[10px] font-medium text-right opacity-90 shadow-sm">{address.city}</Text>
              </View>
            </MapView>
            
            {/* Gradient Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(31, 41, 55, 0.4)', 'rgba(31, 41, 55, 0.8)']}
              locations={[0, 0.6, 1]}
              className="absolute bottom-0 w-full pt-12 pb-4 px-4"
              pointerEvents="none"
            />
            
            {/* Invisible Pressable for Open Maps Interaction */}
            <Pressable 
              className="absolute inset-0 z-20"
              onPress={handleOpenMaps}
            />
          </View>
        </View>

        {/* Description Card */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="document-text" size={18} color="#3B82F6" />
            <Text className="text-sm font-bold text-gray-800 uppercase tracking-wide">DESCRIPCIÓN DEL PROBLEMA</Text>
          </View>

          <View className="bg-gray-50 rounded-xl p-3 h-32">
            <TextInput
              className="flex-1 text-gray-700 text-sm leading-5"
              placeholder={`Describe tu problema con ${category ? category.toString().toLowerCase() : 'el servicio'} aquí... Ej: La canilla de la cocina pierde agua y no cierra bien.`}
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
              maxLength={500}
            />
            <Text className="text-right text-xs text-gray-400 mt-2">
              {description.length}/500
            </Text>
          </View>
        </View>
        
        {/* Photos Card */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="camera" size={18} color="#3B82F6" />
            <Text className="text-sm font-bold text-gray-800 uppercase tracking-wide">FOTOS DEL PROBLEMA</Text>
          </View>

          <View className="flex-row justify-between gap-2">
            {/* Add Photo Button */}
            <TouchableOpacity 
              className="w-[23%] aspect-square bg-blue-50 border border-dashed border-blue-300 rounded-xl items-center justify-center active:opacity-70"
              onPress={pickImage}
              disabled={images.length >= 3}
              style={{ opacity: images.length >= 3 ? 0.5 : 1 }}
            >
              <Ionicons name="camera" size={24} color="#3B82F6" />
              <View className="absolute top-2 left-2">
                 <Ionicons name="add" size={12} color="#3B82F6" />
              </View>
            </TouchableOpacity>

            {/* Photo Slots */}
            {[0, 1, 2].map((i) => (
              <View key={i} className="w-[23%] aspect-square bg-gray-50 border border-gray-100 rounded-xl items-center justify-center overflow-hidden relative">
                {images[i] ? (
                  <>
                    <Image source={{ uri: images[i] }} className="w-full h-full" resizeMode="cover" />
                    <Pressable 
                      className="absolute top-1 right-1 bg-red-500 rounded-full p-1 shadow-sm"
                      onPress={() => removeImage(i)}
                    >
                      <Ionicons name="close" size={10} color="white" />
                    </Pressable>
                  </>
                ) : (
                  <Text className="text-gray-300 text-xs">Foto {i + 1}</Text>
                )}
              </View>
            ))}
          </View>
          <Text className="text-gray-400 text-xs mt-3 text-center">
            Agregar fotos ayuda a obtener un presupuesto más exacto
          </Text>
        </View>

      </ScrollView>

      {/* Footer */}
      <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 pb-8 shadow-lg">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-gray-500 text-xs mb-0.5">Precio Sugerido</Text>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-2xl font-bold text-gray-900">$15.000</Text>
              <Text className="text-sm font-medium text-gray-500">ARS</Text>
            </View>
          </View>
          
          <View className="bg-green-50 px-3 py-1.5 rounded-full flex-row items-center gap-1.5 border border-green-100">
            <View className="bg-green-500 rounded-full p-0.5">
               <Ionicons name="checkmark" size={10} color="white" />
            </View>
            <Text className="text-green-700 text-xs font-bold">Seguro Incluido</Text>
          </View>
        </View>

        <TouchableOpacity 
          className="w-full bg-[#137FEC] py-3.5 rounded-xl flex-row justify-center items-center shadow-sm active:bg-blue-600 mb-2"
          onPress={() => {
            if (!description.trim()) {
              Alert.alert('Falta descripción', 'Por favor, describe brevemente el problema para continuar.');
              return;
            }
            
            router.push({
              pathname: '/ConfirmationPayment',
              params: {
                category: category,
                description: description,
                address: `${address.street}, ${address.city}`,
                price: '15.000'
              }
            });
          }}
        >
          <Text className="text-white font-bold text-lg mr-2">Continuar</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>

        <View className="flex-row items-center justify-center gap-1.5 mt-2">
          <Ionicons name="lock-closed" size={12} color="#9CA3AF" />
          <Text className="text-gray-400 text-[10px] font-medium">
            Pagos procesados de forma segura con Mercado Pago
          </Text>
        </View>
      </View>

      {/* Edit Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-end">
              {/* Dimmed Background */}
              <Pressable 
                className="absolute inset-0 bg-black/50"
                onPress={() => setModalVisible(false)}
              />
              
              <View className="bg-white rounded-t-3xl p-6 shadow-2xl">
                <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />
                
                <Text className="text-xl font-bold text-gray-900 mb-6">
                  Modificar Dirección
                </Text>

                <View className="space-y-4">
                  <View>
                    <Text className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                      Calle y Número
                    </Text>
                    <TextInput
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900"
                      placeholder="Ej: Av. Corrientes 1234"
                      value={tempStreet}
                      onChangeText={setTempStreet}
                      autoCapitalize="words"
                    />
                  </View>

                  <View>
                    <Text className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                      Ciudad / Localidad
                    </Text>
                    <TextInput
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-base text-gray-900"
                      placeholder="Ej: CABA, Argentina"
                      value={tempCity}
                      onChangeText={setTempCity}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View className="flex-row gap-3 mt-8 mb-4">
                  <TouchableOpacity 
                    className="flex-1 py-3.5 rounded-xl bg-gray-100 items-center justify-center"
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-gray-600 font-bold text-base">Cancelar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    className="flex-1 py-3.5 rounded-xl bg-[#2563EB] items-center justify-center shadow-lg shadow-blue-500/30"
                    onPress={handleSaveLocation}
                  >
                    <Text className="text-white font-bold text-base">Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
