import { View, Text, TouchableOpacity, Image, Linking, Modal } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { cssInterop } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import '../global.css';

cssInterop(MapView, {
  className: 'style',
});

export default function TrackingScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const [optionsVisible, setOptionsVisible] = useState(false);

  // Coordinates for demo (Buenos Aires)
  const origin = { latitude: -34.6037, longitude: -58.3816 }; // Obelisco
  const destination = { latitude: -34.5957, longitude: -58.3816 }; // A few blocks away
  const professionalLocation = { latitude: -34.6000, longitude: -58.3820 }; // In between

  const handleFinishJob = () => {
    router.push('/Rating');
  };

  const displayCategory = category ? category.toString() : 'Servicio General';

  const getServiceDetails = () => {
    let iconSource;
    switch (displayCategory.toLowerCase()) {
      case 'electricista':
        iconSource = require('../assets/icons/electric-icon.png');
        return {
          icon: iconSource,
          name: 'Carlos Díaz',
          role: 'Electricista Matriculado',
          phone: '+5491112345678'
        };
      case 'plomero':
        iconSource = require('../assets/icons/water-icon.png');
        return {
          icon: iconSource,
          name: 'Ricardo Gómez',
          role: 'Plomero Matriculado',
          phone: '+5491187654321'
        };
      case 'gasista':
        // Using generic tool icon if gas specific isn't available or define new one
        iconSource = require('../assets/icons/tool-icon.png');
        return {
          icon: iconSource,
          name: 'José Rodríguez',
          role: 'Gasista Matriculado',
          phone: '+5491111223344'
        };
      case 'albañil':
        iconSource = require('../assets/icons/tool-icon.png');
        return {
          icon: iconSource,
          name: 'Miguel Torres',
          role: 'Constructor Especialista',
          phone: '+5491155667788'
        };
      case 'técnico':
        iconSource = require('../assets/icons/snow-icon.png');
        return {
          icon: iconSource,
          name: 'Martín López',
          role: 'Técnico Especializado',
          phone: '+5491199887766'
        };
      case 'limpieza':
        iconSource = require('../assets/icons/paint-icon.png');
        return {
          icon: iconSource,
          name: 'Ana García',
          role: 'Personal de Limpieza',
          phone: '+5491122334455'
        };
      default:
        iconSource = require('../assets/icons/points-icon.png');
        return {
          icon: iconSource,
          name: 'Juan Pérez',
          role: 'Profesional Verificado',
          phone: '+5491100000000'
        };
    }
  };

  const service = getServiceDetails();

  const handleCall = () => {
    Linking.openURL(`tel:${service.phone}`);
  };

  const handleChat = () => {
    router.push({
      pathname: '/Chat',
      params: {
        name: service.name,
        role: service.role,
        phone: service.phone
      }
    });
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Map Background */}
      <MapView
        className="flex-1 w-full"
        initialRegion={{
          latitude: -34.6000,
          longitude: -58.3816,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker coordinate={origin} title="Tu Ubicación">
          <View className="p-2 bg-[#137FEC] rounded-full border-2 border-white">
            <Ionicons name="home" size={16} color="white" />
          </View>
        </Marker>
        <Marker coordinate={destination} title="Destino" />

        {/* Professional Marker */}
        <Marker coordinate={professionalLocation} title={service.name}>
          <View className="p-2.5 bg-[#137FEC] rounded-full border-[3px] border-white">
            <Image
              source={service.icon}
              style={{ width: 24, height: 24, tintColor: 'white' }}
              resizeMode="contain"
            />
          </View>
        </Marker>

        <Polyline
          coordinates={[origin, professionalLocation, destination]}
          strokeColor="#137FEC"
          strokeWidth={4}
          lineDashPattern={[1]}
        />
      </MapView>

      {/* Header Buttons */}
      <View className="absolute top-[50px] left-5 right-5 flex-row justify-between z-10">
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full justify-center items-center shadow-sm shadow-black/30 elevation-3" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full justify-center items-center shadow-sm shadow-black/30 elevation-3" onPress={() => setOptionsVisible(true)}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Card */}
      <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-5 shadow-lg shadow-black/10 elevation-10 pb-10">

        {/* Handle bar */}
        <View className="w-10 h-1 bg-slate-200 rounded-full self-center mb-5" />

        {/* Status */}
        <View className="flex-row justify-between items-center mb-5">
          <View>
            <View className="flex-row items-center mb-1 gap-1.5">
              <View className="w-2 h-2 rounded-full bg-green-500" />
              <Text className="text-green-500 font-bold text-xs">EN CAMINO</Text>
            </View>
            <Text className="text-2xl font-bold text-slate-900 mb-0.5">Llega en 15 min</Text>
            <Text className="text-slate-500 text-sm">14:30 PM - Est. Llegada</Text>
          </View>
          <View className="w-12 h-12 rounded-full bg-[#EAF5FF] justify-center items-center">
            <Image 
              source={service.icon} 
              style={{ width: 24, height: 24, tintColor: '#137FEC' }} 
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="h-[1px] bg-slate-100 mb-5" />

        {/* Professional Info */}
        <TouchableOpacity 
            className="flex-row items-center mb-6" 
            onPress={() => router.push('/ProfessionalProfile')}
        >
            <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                className="w-12 h-12 rounded-full mr-3"
            />
            <View className="flex-1">
                <Text className="text-base font-bold text-slate-900">{service.name}</Text>
                <Text className="text-sm text-slate-500">{service.role}</Text>
            </View>
            <View className="flex-row items-center bg-[#137FEC] px-2 py-1 rounded-xl mr-3">
                <Ionicons name="star" size={12} color="white" />
                <Text className="text-white font-bold text-xs ml-1">4.8</Text>
            </View>
            <View>
                 <Ionicons name="information-circle-outline" size={24} color="#9CA3AF" />
            </View>
        </TouchableOpacity>

        {/* Actions */}
        <View className="flex-row gap-3 mb-5">
          <TouchableOpacity className="flex-1 flex-row justify-center items-center bg-[#EAF5FF] py-3.5 rounded-xl gap-2" onPress={handleChat}>
            <Ionicons name="chatbubble-outline" size={20} color="#137FEC" />
            <Text className="text-[#137FEC] font-bold text-base">Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-row justify-center items-center bg-[#137FEC] py-3.5 rounded-xl gap-2" onPress={handleCall}>
            <Ionicons name="call" size={20} color="white" />
            <Text className="text-white font-bold text-base">Llamar</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Security */}
        <View className="flex-row justify-center items-center mb-2.5 gap-1">
          <Ionicons name="shield-checkmark" size={14} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs">Servicio asegurado</Text>
        </View>

        {/* Demo Action to Finish Job */}
        <TouchableOpacity className="mt-2.5 self-center p-2.5" onPress={handleFinishJob}>
          <Text className="text-red-500 text-xs font-bold">[Demo] Finalizar Trabajo</Text>
        </TouchableOpacity>

      </View>

      {/* Options Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={optionsVisible}
        onRequestClose={() => setOptionsVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-end"
          activeOpacity={1}
          onPress={() => setOptionsVisible(false)}
        >
          <View className="bg-white rounded-t-3xl px-5 pt-3 pb-10">
            <View className="w-10 h-1 bg-slate-200 rounded-full self-center mb-5" />
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-bold text-slate-900">Opciones del Servicio</Text>
              <TouchableOpacity onPress={() => setOptionsVisible(false)} className="w-[30px] h-[30px] bg-slate-100 rounded-full justify-center items-center">
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Options List */}
            <View className="gap-2">
              <TouchableOpacity className="flex-row items-center py-3">
                <View className="w-10 h-10 rounded-xl justify-center items-center mr-3 bg-blue-50">
                  <Ionicons name="share-social-outline" size={22} color="#137FEC" />
                </View>
                <Text className="flex-1 text-base text-slate-900 font-medium">Compartir mi ubicación</Text>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center py-3">
                <View className="w-10 h-10 rounded-xl justify-center items-center mr-3 bg-blue-50">
                  <Ionicons name="shield-checkmark-outline" size={22} color="#137FEC" />
                </View>
                <Text className="flex-1 text-base text-slate-900 font-medium">Seguridad y Emergencia</Text>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center py-3">
                <View className="w-10 h-10 rounded-xl justify-center items-center mr-3 bg-blue-50">
                  <Ionicons name="help-circle-outline" size={22} color="#137FEC" />
                </View>
                <Text className="flex-1 text-base text-slate-900 font-medium">Contactar Soporte</Text>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center py-3">
                <View className="w-10 h-10 rounded-xl justify-center items-center mr-3 bg-blue-50">
                  <Ionicons name="document-text-outline" size={22} color="#137FEC" />
                </View>
                <Text className="flex-1 text-base text-slate-900 font-medium">Detalle del Seguro</Text>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </TouchableOpacity>

              {/* Divider */}
              <View className="h-[1px] bg-slate-100 my-1" />

              <TouchableOpacity className="flex-row items-center py-3">
                <View className="w-10 h-10 rounded-xl justify-center items-center mr-3 bg-red-50">
                  <Ionicons name="close-circle-outline" size={22} color="#EF4444" />
                </View>
                <Text className="flex-1 text-base text-red-500 font-medium">Cancelar Pedido</Text>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}
