import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const categories = [
  {
    id: 1,
    name: 'Electricista',
    icon: require('../../assets/icons/electric-icon.png'),
  },
  {
    id: 2,
    name: 'Plomero',
    icon: require('../../assets/icons/water-icon.png'),
  },
  {
    id: 3,
    name: 'Albañil',
    icon: require('../../assets/icons/tool-icon.png'),
  },
  {
    id: 4,
    name: 'Técnico',
    icon: require('../../assets/icons/snow-icon.png'),
  },
  {
    id: 5,
    name: 'Limpieza',
    icon: require('../../assets/icons/paint-icon.png'),
  },
  {
    id: 6,
    name: 'Más',
    icon: require('../../assets/icons/points-icon.png'),
  },
];

export default function ProfessionalButon() {
  const router = useRouter();
  return (
    <View className="w-full px-4 mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-slate-900">Categorías</Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-medium text-sm border-b border-blue-500 pb-[1px]">Ver todas</Text>
        </TouchableOpacity>
      </View>
      
      <View className="flex-row flex-wrap justify-between">
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            className="w-[30%] bg-white rounded-2xl shadow-sm items-center py-4 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
            onPress={() => router.push({ pathname: "/RequestService", params: { category: category.name } })}
          >
            <View className="w-14 h-14 items-center justify-center mb-2">
              <Image 
                source={category.icon} 
                className="w-15 h-15"
                resizeMode="contain"
              />
            </View>
            <Text className="text-xs font-medium text-slate-700 text-center">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}