import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfessionalProfile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <SafeAreaView className="bg-white z-10">
        <View className="flex-row justify-between items-center px-4 py-2 bg-white">
            <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
                <Ionicons name="chevron-back" size={24} color="#0F172A" />
                <Text className="text-[#0F172A] text-base font-medium ml-1">Volver</Text>
            </TouchableOpacity>
            <View className="flex-row gap-4">
                <TouchableOpacity>
                    <Ionicons name="share-outline" size={24} color="#0F172A" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={24} color="#0F172A" />
                </TouchableOpacity>
            </View>
        </View>
      </SafeAreaView>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Profile Header */}
        <View className="items-center px-4 mt-4">
            <View className="relative">
                <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                    className="w-24 h-24 rounded-full"
                />
                <View className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white" />
            </View>
            
            <Text className="text-xl font-bold text-gray-900 mt-3 text-center">Carlos Rodriguez</Text>
            <Text className="text-gray-500 text-sm mt-1 text-center">Electricista Matriculado</Text>

            <View className="flex-row items-center bg-blue-50 px-3 py-1.5 rounded-full mt-3">
                <Ionicons name="checkmark-circle" size={16} color="#137FEC" />
                <Text className="text-[#137FEC] text-xs font-bold ml-1.5">IDENTIDAD VERIFICADA</Text>
            </View>
        </View>

        {/* Stats */}
        <View className="flex-row justify-center items-center mt-6 px-4 divide-x divide-gray-200">
            <View className="px-6 items-center">
                <Text className="text-gray-900 font-bold text-base">12</Text>
                <Text className="text-gray-500 text-[10px] mt-0.5">Años Exp.</Text>
            </View>
            <View className="h-8 w-[1px] bg-gray-200" />
            <View className="px-6 items-center">
                <View className="flex-row items-center">
                    <Text className="text-gray-900 font-bold text-base mr-1">4.9</Text>
                    <Ionicons name="star" size={12} color="#FBBF24" />
                </View>
                <Text className="text-gray-500 text-[10px] mt-0.5">Calificación</Text>
            </View>
            <View className="h-8 w-[1px] bg-gray-200" />
            <View className="px-6 items-center">
                <Text className="text-gray-900 font-bold text-base">150+</Text>
                <Text className="text-gray-500 text-[10px] mt-0.5">Trabajos</Text>
            </View>
        </View>

        <View className="h-2 bg-gray-50 mt-6" />

        {/* About */}
        <View className="px-4 py-6">
            <Text className="text-gray-900 font-bold text-lg mb-2">Sobre mí</Text>
            <Text className="text-gray-600 text-sm leading-5">
                Especialista en instalaciones domiciliarias, tableros eléctricos y urgencias las 24hs. Trabajo con materiales homologados y garantizo seguridad en cada proyecto. Matriculado en Buenos Aires.
            </Text>
        </View>

        {/* Portfolio */}
        <View className="py-2">
            <View className="px-4 flex-row justify-between items-center mb-3">
                <Text className="text-gray-900 font-bold text-lg">Trabajos Realizados</Text>
                <TouchableOpacity>
                    <Text className="text-[#137FEC] text-xs font-semibold">Ver todo</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
                {[
                    { title: 'Tablero nuevo', img: 'https://images.unsplash.com/photo-1621905251189-08b95d646285?q=80&w=200&auto=format&fit=crop' },
                    { title: 'Iluminación LED', img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=200&auto=format&fit=crop' },
                    { title: 'Cableado', img: 'https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?q=80&w=200&auto=format&fit=crop' }
                ].map((item, index) => (
                    <View key={index} className="relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 w-36 h-36">
                        <Image source={{ uri: item.img }} className="w-full h-full" resizeMode="cover" />
                        <View className="absolute bottom-0 left-0 right-0 bg-black/40 p-2">
                            <Text className="text-white text-[10px] font-medium">{item.title}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>

        {/* Reviews */}
        <View className="px-4 py-6">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-900 font-bold text-lg">Reseñas (84)</Text>
                <View className="flex-row items-center bg-blue-50 px-2 py-1 rounded-md">
                    <Text className="text-[#137FEC] font-bold text-xs mr-1">4.9</Text>
                    <Ionicons name="star" size={10} color="#137FEC" />
                </View>
            </View>
            
            {/* Review Cards */}
            <View className="gap-4">
                <View className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <View className="flex-row justify-between items-start mb-2">
                         <View className="flex-row items-center gap-2">
                            <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center">
                                <Text className="text-orange-600 font-bold text-xs">ML</Text>
                            </View>
                            <View>
                                <Text className="text-gray-900 font-bold text-sm">Maria Lujan</Text>
                                <View className="flex-row gap-0.5">
                                    {[1,2,3,4,5].map(s => <Ionicons key={s} name="star" size={10} color="#FBBF24" />)}
                                </View>
                            </View>
                         </View>
                         <Text className="text-gray-400 text-[10px]">Hace 2 días</Text>
                    </View>
                    <Text className="text-gray-600 text-xs leading-4">Excelente trabajo, muy prolijo. Me explicó todo lo que iba a hacer antes de empezar y dejó todo limpio. Súper recomendable.</Text>
                </View>

                <View className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <View className="flex-row justify-between items-start mb-2">
                         <View className="flex-row items-center gap-2">
                            <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center">
                                <Text className="text-blue-600 font-bold text-xs">JP</Text>
                            </View>
                            <View>
                                <Text className="text-gray-900 font-bold text-sm">Juan Perez</Text>
                                <View className="flex-row gap-0.5">
                                    {[1,2,3,4,5].map(s => <Ionicons key={s} name="star" size={10} color="#FBBF24" />)}
                                </View>
                            </View>
                         </View>
                         <Text className="text-gray-400 text-[10px]">Hace 1 sem</Text>
                    </View>
                    <Text className="text-gray-600 text-xs leading-4">Llegó puntual y arregló el problema rápido. El precio me pareció razonable para la urgencia.</Text>
                </View>
            </View>

            <TouchableOpacity className="mt-4 bg-gray-50 py-3 rounded-xl items-center border border-gray-100">
                <Text className="text-gray-500 text-xs font-semibold">Ver todas las reseñas</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Floating Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 pt-3 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <View className="flex-row items-center gap-3">
             <View>
                <Text className="text-gray-500 text-[10px]">Visita desde</Text>
                <View className="flex-row items-baseline">
                    <Text className="text-gray-900 font-bold text-xl">$8.500</Text>
                    <Text className="text-gray-400 text-[10px] ml-1">ARG</Text>
                </View>
             </View>
             
             <TouchableOpacity 
                className="flex-1 bg-[#137FEC] h-12 rounded-xl flex-row items-center justify-center shadow-lg shadow-blue-500/20"
                onPress={() => router.push('/RequestService')} 
             >
                <Text className="text-white font-bold text-base mr-2">Pedir Presupuesto</Text>
                <Ionicons name="arrow-forward" size={18} color="white" />
             </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center mt-3 gap-1">
             <Ionicons name="lock-closed" size={10} color="#9CA3AF" />
             <Text className="text-gray-400 text-[10px]">Pagá seguro con <Text className="text-[#009EE3] font-semibold">Mercado Pago</Text></Text>
        </View>
      </View>

    </View>
  );
}
