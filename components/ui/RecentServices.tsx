import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RECENT_SERVICES = [
  {
    id: '1',
    title: 'Reparación Aire',
    date: '24 Ene',
    price: '$12.500',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Electricista',
    date: '18 Feb',
    price: '$25.000',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Plomería Cocina',
    date: '10 Mar',
    price: '$18.000',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=200&auto=format&fit=crop',
  },
];

export default function RecentServices() {
  return (
    <View className="mb-8">
      <Text className="text-lg font-bold text-gray-900 mb-4 px-4">
        Servicios Recientes
      </Text>
      
      <FlatList
        data={RECENT_SERVICES}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex-row items-center w-[280px]">
            {/* Service Image */}
            <Image 
              source={{ uri: item.image }} 
              className="w-20 h-20 rounded-xl bg-gray-200"
              resizeMode="cover"
            />
            
            {/* Content Column */}
            <View className="ml-3 flex-1 justify-center">
              <Text className="font-bold text-base text-gray-900 leading-tight">
                {item.title}
              </Text>
              
              <Text className="text-gray-500 text-xs mt-1 mb-2">
                {item.date} • {item.price}
              </Text>

              <TouchableOpacity 
                activeOpacity={0.7}
                className="flex-row items-center"
              >
                <Ionicons name="refresh" size={14} color="#009EE3" />
                <Text className="text-[#009EE3] text-xs font-bold ml-1.5">
                  Contratar de nuevo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
