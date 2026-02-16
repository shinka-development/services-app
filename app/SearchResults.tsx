import { View, Text, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useMemo } from 'react';
import '../global.css';

// Mock Data
const ALL_PROFESSIONALS = [
  {
    id: '1',
    name: 'Ricardo G.',
    role: 'Electricista',
    rating: 4.8,
    verified: true,
    distance: 1.5,
    jobs: 124,
    price: 5000,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    name: 'Martín L.',
    role: 'Electricista',
    rating: 4.5,
    verified: true,
    distance: 2.2,
    jobs: 89,
    price: 4500,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: '3',
    name: 'Javier M.',
    role: 'Electricista',
    rating: 4.9,
    verified: false,
    distance: 0.8,
    jobs: 210,
    price: 6200,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    availabilityText: 'Excelente disponibilidad',
  },
  {
    id: '4',
    name: 'Esteban Q.',
    role: 'Electricista',
    rating: 4.2,
    verified: true,
    distance: 3.5,
    jobs: 45,
    price: 3800,
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
];

export default function SearchResultsScreen() {
  const router = useRouter();
  const { term, immediate } = useLocalSearchParams(); 
  
  // States for filters
  const [immediateAvailability, setImmediateAvailability] = useState(immediate === 'true');
  const [activeFilter, setActiveFilter] = useState<'rating' | 'price' | 'distance' | 'jobs' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter Logic
  const filteredProfessionals = useMemo(() => {
    let result = [...ALL_PROFESSIONALS];

    if (immediateAvailability) {
       result = result.filter(p => p.id !== '4'); 
    }

    if (activeFilter === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
    } else if (activeFilter === 'price') {
        result.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    } else if (activeFilter === 'distance') {
        result.sort((a, b) => sortOrder === 'asc' ? a.distance - b.distance : b.distance - a.distance);
    } else if (activeFilter === 'jobs') {
        result.sort((a, b) => sortOrder === 'asc' ? a.jobs - b.jobs : b.jobs - a.jobs);
    }

    return result;
  }, [activeFilter, sortOrder, immediateAvailability]);

  const toggleFilter = (filter: 'rating' | 'price' | 'distance' | 'jobs') => {
    if (activeFilter === filter) {
        if (filter === 'price' || filter === 'distance' || filter === 'jobs') {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
             setActiveFilter(null);
        }
    } else {
        setActiveFilter(filter);
        setSortOrder('asc'); // Reset sort to asc (or desc logic depending on filter)
        if (filter === 'rating' || filter === 'jobs') setSortOrder('desc'); // High rating/jobs first usually
    }
  };

  const renderProfessionalCard = ({ item }: { item: typeof ALL_PROFESSIONALS[0] }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row gap-4">
        {/* Avatar Section */}
        <View className="relative">
          <Image
            source={{ uri: item.image }}
            className="w-16 h-16 rounded-full bg-gray-200"
          />
          {item.verified && (
            <View className="absolute bottom-0 right-0 bg-[#137FEC] rounded-full p-0.5 border-2 border-white">
              <Ionicons name="checkmark" size={10} color="white" />
            </View>
          )}
        </View>

        {/* Info Section */}
        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-lg font-bold text-slate-900">{item.name}</Text>
              {item.verified && (
                <View className="flex-row items-center mt-0.5 mb-1">
                  <Ionicons name="shield-checkmark" size={12} color="#137FEC" />
                  <Text className="text-[#137FEC] text-[10px] font-bold ml-1">IDENTIDAD VERIFICADA</Text>
                </View>
              )}
              {!item.verified && item.availabilityText && (
                 <Text className="text-gray-400 text-[10px] mt-0.5">{item.availabilityText}</Text>
              )}
            </View>
            <View className="bg-yellow-50 px-2 py-1 rounded-lg flex-row items-center gap-1">
              <Ionicons name="star" size={12} color="#EAB308" />
              <Text className="text-yellow-700 font-bold text-xs">{item.rating}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3 mt-1">
            <View className="flex-row items-center gap-1">
              <Ionicons name="location-sharp" size={12} color="#64748B" />
              <Text className="text-slate-500 text-xs">a {item.distance} km</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={12} color="#64748B" />
              <Text className="text-slate-500 text-xs">{item.jobs} trabajos</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="h-[1px] bg-gray-100 my-4" />

      {/* Footer Price & Action */}
      <View className="flex-row justify-between items-end">
        <View>
          <Text className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">PRECIO BASE DESDE</Text>
          <Text className="text-2xl font-bold text-slate-900">${item.price.toLocaleString('es-AR')}</Text>
        </View>
        <TouchableOpacity
          className="bg-[#137FEC] px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/20"
          onPress={() => router.push('/ProfessionalProfile')}
        >
          <Text className="text-white font-bold text-sm">Ver Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-100 sticky top-0 z-10 w-full">
        <View className="flex-row items-center gap-4 mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-100 shadow-sm"
          >
            <Ionicons name="chevron-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <View>
            <Text className="text-lg font-bold text-slate-900">
              {term ? `${term.toString().charAt(0).toUpperCase() + term.toString().slice(1)} Cercanos` : 'Electricistas Cercanos'}
            </Text>
            <Text className="text-xs text-slate-500">Buenos Aires, Argentina</Text>
          </View>
        </View>

        {/* Filters Horizontal Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingRight: 20 }}>
          {/* Rating */}
          <TouchableOpacity 
            onPress={() => toggleFilter('rating')}
            className={`flex-row items-center px-4 py-2 rounded-full gap-1.5 border transition-all ${activeFilter === 'rating' ? 'bg-[#137FEC] border-[#137FEC]' : 'bg-white border-gray-200'}`}
          >
            <Ionicons name="star" size={14} color={activeFilter === 'rating' ? "white" : "#64748B"} />
            <Text className={`font-medium text-xs ${activeFilter === 'rating' ? "text-white" : "text-slate-700"}`}>Rating</Text>
          </TouchableOpacity>

          {/* Precio */}
          <TouchableOpacity 
            onPress={() => toggleFilter('price')}
            className={`flex-row items-center px-4 py-2 rounded-full gap-1.5 border ${activeFilter === 'price' ? 'bg-blue-50 border-[#137FEC]' : 'bg-white border-gray-200'}`}
          >
            <Text className={`font-medium text-xs ${activeFilter === 'price' ? "text-[#137FEC]" : "text-slate-700"}`}>Precio</Text>
            <Ionicons name={activeFilter === 'price' && sortOrder === 'desc' ? "chevron-up" : "chevron-down"} size={14} color={activeFilter === 'price' ? "#137FEC" : "#64748B"} />
          </TouchableOpacity>

          {/* Distancia */}
          <TouchableOpacity 
             onPress={() => toggleFilter('distance')}
             className={`flex-row items-center px-4 py-2 rounded-full gap-1.5 border ${activeFilter === 'distance' ? 'bg-blue-50 border-[#137FEC]' : 'bg-white border-gray-200'}`}
          >
            <Text className={`font-medium text-xs ${activeFilter === 'distance' ? "text-[#137FEC]" : "text-slate-700"}`}>Distancia</Text>
            <Ionicons name={activeFilter === 'distance' && sortOrder === 'desc' ? "chevron-up" : "chevron-down"} size={14} color={activeFilter === 'distance' ? "#137FEC" : "#64748B"} />
          </TouchableOpacity>

          {/* Trabajos */}
          <TouchableOpacity 
             onPress={() => toggleFilter('jobs')}
             className={`flex-row items-center px-4 py-2 rounded-full gap-1.5 border ${activeFilter === 'jobs' ? 'bg-blue-50 border-[#137FEC]' : 'bg-white border-gray-200'}`}
          >
            <Text className={`font-medium text-xs ${activeFilter === 'jobs' ? "text-[#137FEC]" : "text-slate-700"}`}>Trabajos</Text>
            <Ionicons name={activeFilter === 'jobs' && sortOrder === 'desc' ? "chevron-up" : "chevron-down"} size={14} color={activeFilter === 'jobs' ? "#137FEC" : "#64748B"} />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Availability Toggle */}
        <View className="bg-white p-3 rounded-xl mb-4 flex-row justify-between items-center shadow-sm border border-gray-100">
          <View className="flex-row items-center gap-2">
            <Ionicons name="flash" size={18} color="#22C55E" />
            <Text className="text-slate-700 font-semibold text-sm">Disponibilidad Inmediata</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#137FEC' }}
            thumbColor={'white'}
            ios_backgroundColor="#E2E8F0"
            onValueChange={setImmediateAvailability}
            value={immediateAvailability}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>

        {/* List of Professionals */}
        <View>
            {filteredProfessionals.map((item) => (
                <View key={item.id}>
                    {renderProfessionalCard({ item })}
                </View>
            ))}
        </View>
      </ScrollView>

      {/* Fake Bottom Tab Bar - Matches the image EXACTLY */}
      <View className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex-row justify-between items-center px-6 pb-8 pt-3">
          <TouchableOpacity className="items-center gap-1">
              <View>
                 <Ionicons name="search" size={24} color="#137FEC" />
              </View>
              <Text className="text-[#137FEC] text-[10px] font-medium">Explorar</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center gap-1" onPress={() => router.push('/Reservas')}>
              <Ionicons name="calendar-outline" size={24} color="#94A3B8" />
              <Text className="text-slate-400 text-[10px] font-medium">Turnos</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center gap-1" onPress={() => router.push('/Chat')}>
               <Ionicons name="chatbubble-outline" size={24} color="#94A3B8" />
              <Text className="text-slate-400 text-[10px] font-medium">Mensajes</Text>
          </TouchableOpacity>

           <TouchableOpacity className="items-center gap-1" onPress={() => router.push('/ProfessionalProfile')}>
              <Ionicons name="person-outline" size={24} color="#94A3B8" />
              <Text className="text-slate-400 text-[10px] font-medium">Perfil</Text>
          </TouchableOpacity>
      </View>

    </View>
  );
}
