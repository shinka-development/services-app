
import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Modal } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ProfessionalButon from '../../components/ui/ProfessionalButon';
import Service24h from '../../components/ui/Service-24h';
import RecentServices from '../../components/ui/RecentServices';
import { useState, useCallback, useEffect } from 'react';
import * as Location from 'expo-location';
import { useNotifications } from '../../context/NotificationContext';
import '../../global.css';

export default function HomeScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Location and Notification State
  const [locationAddress, setLocationAddress] = useState('Obteniendo ubicación...');
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const { notifications, unreadCount } = useNotifications();

  useFocusEffect(
    useCallback(() => {
      setSearchTerm('');
    }, [])
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationAddress('Permiso denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (address && address.length > 0) {
         const loc = address[0];

         const neighborhood = loc.district || loc.subregion || loc.city || '';
         const city = loc.region || loc.country || '';
         // Try to be smart about what to show: "Neighborhood, City" is usually good
         setLocationAddress(`${neighborhood}, ${city}`.replace(/^, /, '')); // clean up leading comma if neighborhood empty
      }
    })();
  }, []);

  const handleSearch = () => {
    router.push({
      pathname: '/SearchResults',
      params: { term: searchTerm }
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar style="light" />
      <View className="bg-[#137FEC] pb-6 rounded-b-3xl">
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View className="px-5 pt-2.5">
            {/* Top Row: Location + Notification */}
            <View className="flex-row justify-between items-start mb-6">
              <View className="flex-row items-center gap-2">
                <Ionicons name="location-sharp" size={20} color="white" />
                <View className="justify-center">
                  <Text className="text-blue-50 text-[10px] font-semibold tracking-wide mb-0.5">UBICACIÓN ACTUAL</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-white text-sm font-semibold max-w-[200px]" numberOfLines={1}>{locationAddress}</Text>
                    <Ionicons name="chevron-down" size={12} color="white" className="mt-0.5" />
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-white/20 justify-center items-center relative"
                onPress={() => setNotificationsVisible(true)}
              >
                <Ionicons name="notifications-outline" size={24} color="white" />
                {unreadCount > 0 && (
                    <View className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-red-500 border-[1.5px] border-[#137FEC]" />
                )}
              </TouchableOpacity>
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-white leading-8 mb-6">
              ¿Qué servicio necesitás{'\n'}arreglar hoy?
            </Text>

            {/* Search Bar */}
            <View className="flex-row items-center bg-white rounded-xl h-12 px-3 shadow-sm elevation-3">
              <Ionicons name="search" size={20} color="#137FEC" className="mr-2" />
              <TextInput
                placeholder="Buscar 'plomero', 'gasista'..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-sm text-gray-700 h-full"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              <TouchableOpacity className="p-1">
                <Ionicons name="options-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <ProfessionalButon />
        <Service24h />
        <RecentServices />
      </ScrollView>

      {/* Notifications Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={notificationsVisible}
        onRequestClose={() => setNotificationsVisible(false)}
      >
        <TouchableOpacity 
            className="flex-1 bg-black/50" 
            activeOpacity={1} 
            onPress={() => setNotificationsVisible(false)}
        >
             <View className="absolute top-32 right-5 left-5 bg-white rounded-2xl p-5 shadow-xl">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-slate-900">Notificaciones</Text>
                    <TouchableOpacity onPress={() => setNotificationsVisible(false)} className="bg-gray-100 rounded-full p-1">
                        <Ionicons name="close" size={20} color="#64748B" />
                    </TouchableOpacity>
                </View>
                
                {notifications.length === 0 ? (
                    <Text className="text-slate-500 text-center py-4">No tenés notificaciones nuevas.</Text>
                ) : (
                    <View className="gap-3">
                        {notifications.map(notification => (
                            <View key={notification.id} className={`flex-row gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0 ${notification.unread ? 'bg-blue-50/50 -mx-2 px-2 rounded-lg py-2' : ''}`}>
                                <View className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-[#137FEC]' : 'bg-gray-300'}`} />
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-start">
                                        <Text className={`text-sm text-slate-900 ${notification.unread ? 'font-bold' : 'font-medium'}`}>{notification.title}</Text>
                                        <Text className="text-[10px] text-slate-400 mt-0.5">{notification.time}</Text>
                                    </View>
                                    <Text className="text-xs text-slate-500 mt-0.5 leading-4">{notification.message}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
                
                <TouchableOpacity 
                    className="mt-4 pt-3 border-t border-gray-100 items-center"
                    onPress={() => {
                        setNotificationsVisible(false);
                        router.push('/Notifications');
                    }}
                >
                    <Text className="text-[#137FEC] font-bold text-xs">Ver todas</Text>
                </TouchableOpacity>
             </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}
