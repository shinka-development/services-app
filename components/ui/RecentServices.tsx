import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useServices } from '../../context/ServiceContext';

export default function RecentServices() {
  const router = useRouter();
  const { recentServices } = useServices();

  return (
    <View className="mb-8">
      <Text className="text-lg font-bold text-gray-900 mb-4 px-4">
        Servicios Recientes
      </Text>
      
      <FlatList
        data={recentServices}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex-row items-center w-[280px]"
            onPress={() => router.push('/ProfessionalProfile')}
            activeOpacity={0.9}
          >
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
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
