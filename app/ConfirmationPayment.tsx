import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ConfirmationPaymentScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'mp' | 'cash'>('mp');

  const handlePayment = () => {
    setLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/Tracking',
        params: { 
          category: displayCategory,
        }
      });
    }, 1500);
  };
  
  // Format category to title case for display if needed, though usually passed correctly
  const displayCategory = category ? category.toString() : 'Servicio General';
  
  // Dynamic professional content based on category
  const getProfessionalTitle = () => {
     switch(displayCategory.toLowerCase()) {
         case 'electricista': return 'Electricista Matriculado';
         case 'plomero': return 'Plomero Matriculado';
         case 'gasista': return 'Gasista Matriculado';
         case 'albañil': return 'Constructor Especialista';
         case 'técnico': return 'Técnico Especializado';
         default: return 'Profesional Verificado';
     }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen 
        options={{
          headerTitle: "Confirmar y Pagar",
          headerTitleStyle: { fontWeight: '700', fontSize: 18, color: '#0F172A' },
          headerTitleAlign: 'center', 
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false, 
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: '#009EE3',
        }} 
      />

      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 150 }}>
        
        {/* Service Detail Card */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">DETALLE DEL SERVICIO</Text>
          
          <View className="flex-row items-center gap-3 mb-4">
            <View className="relative">
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                className="w-12 h-12 rounded-full bg-gray-200"
              />
              <View className="absolute -bottom-1 -right-1 bg-[#137FEC] px-1.5 py-0.5 rounded-full flex-row items-center border border-white">
                <Ionicons name="star" size={10} color="white" />
                <Text className="text-white text-[10px] font-bold ml-0.5">4.9</Text>
              </View>
            </View>
            <View>
              <Text className="text-gray-900 font-bold text-base">Juan Pérez</Text>
              <Text className="text-[#137FEC] text-sm font-medium">{getProfessionalTitle()}</Text>
              <Text className="text-gray-500 text-xs mt-0.5">{displayCategory} - Reparación</Text>
            </View>
          </View>

          <View className="h-px bg-gray-100 my-2" />

          {/* Date */}
          <View className="flex-row items-start gap-3 mt-3">
            <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center">
              <Ionicons name="calendar-outline" size={18} color="#137FEC" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-400 text-xs">Fecha y Hora</Text>
              <Text className="text-gray-900 font-medium text-sm">Martes, 12 de Oct • 14:00 hrs</Text>
            </View>
          </View>

          {/* Location */}
          <View className="flex-row items-start gap-3 mt-3">
            <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center">
              <Ionicons name="location-outline" size={18} color="#137FEC" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-400 text-xs">Ubicación</Text>
              <Text className="text-gray-900 font-medium text-sm">Av. Corrientes 1234, CABA</Text>
            </View>
          </View>
        </View>

        {/* Protected Payment */}
        <View className="bg-[#EAF5FF] rounded-2xl p-4 mb-4 border border-blue-100 flex-row gap-3">
          <Ionicons name="shield-checkmark" size={24} color="#137FEC" />
          <View className="flex-1">
            <Text className="text-[#137FEC] font-bold text-sm mb-1">Pago Protegido</Text>
            <Text className="text-gray-600 text-xs leading-4">
              Tu dinero se libera al profesional solo cuando confirmas que el trabajo está terminado.
            </Text>
          </View>
        </View>

        {/* Insurance Included */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm flex-row items-center gap-3 border-r-4 border-r-red-500 overflow-hidden relative">
           <View className="w-10 h-10 bg-gray-50 rounded-lg items-center justify-center border border-gray-100">
             {/* Simple text representation of logo since we don't have assets */}
             <Text className="text-[8px] font-bold text-red-600">MAPFRE</Text>
           </View>
           <View className="flex-1">
             <View className="flex-row items-center gap-1">
                <Text className="text-gray-900 font-bold text-sm">Seguro Incluido</Text>
                <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
             </View>
             <Text className="text-gray-500 text-xs mt-0.5">
               Cobertura de Responsabilidad Civil durante el servicio.
             </Text>
           </View>
        </View>

        {/* Payment Method */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <View className="flex-row justify-between items-center mb-3">
             <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider">MÉTODO DE PAGO</Text>
          </View>

          {/* Mercado Pago Option */}
          <TouchableOpacity 
            className={`flex-row items-center justify-between p-3 rounded-xl border mb-2 ${selectedPaymentMethod === 'mp' ? 'border-[#009EE3] bg-blue-50' : 'border-gray-100'}`}
            onPress={() => setSelectedPaymentMethod('mp')}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-7 bg-[#009EE3] rounded-md items-center justify-center">
                 <Ionicons name="wallet-outline" size={16} color="white" />
              </View>
              <View>
                <Text className="text-gray-900 font-bold text-sm">Mercado Pago</Text>
                <Text className="text-gray-400 text-xs">Dinero en cuenta o tarjetas guardadas</Text>
              </View>
            </View>
            <Ionicons 
              name={selectedPaymentMethod === 'mp' ? "radio-button-on" : "radio-button-off"} 
              size={22} 
              color={selectedPaymentMethod === 'mp' ? "#009EE3" : "#9CA3AF"} 
            />
          </TouchableOpacity>

          {/* Cash Option */}
          <TouchableOpacity 
            className={`flex-row items-center justify-between p-3 rounded-xl border ${selectedPaymentMethod === 'cash' ? 'border-[#16A34A] bg-green-50' : 'border-gray-100'}`}
            onPress={() => setSelectedPaymentMethod('cash')}
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-7 bg-[#16A34A] rounded-md items-center justify-center">
                 <Ionicons name="cash-outline" size={16} color="white" />
              </View>
              <View>
                <Text className="text-gray-900 font-bold text-sm">Efectivo</Text>
                <Text className="text-gray-400 text-xs">Pagar al profesional al finalizar</Text>
              </View>
            </View>
            <Ionicons 
              name={selectedPaymentMethod === 'cash' ? "radio-button-on" : "radio-button-off"} 
              size={22} 
              color={selectedPaymentMethod === 'cash' ? "#16A34A" : "#9CA3AF"} 
            />
          </TouchableOpacity>
        </View>

        {/* Cost Summary */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">RESUMEN DE COSTOS</Text>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 text-sm">Servicio (Mano de obra)</Text>
            <Text className="text-gray-900 font-medium">$15.000</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 text-sm">Tarifa de servicio</Text>
            <Text className="text-gray-900 font-medium">$1.500</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500 text-sm">Impuestos estimados</Text>
            <Text className="text-gray-900 font-medium">$0</Text>
          </View>
        </View>

      </ScrollView>

      {/* Footer */}
      <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 pt-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-10">
        <TouchableOpacity 
          className={`w-full py-3.5 rounded-xl flex-row justify-center items-center shadow-md active:opacity-90 ${loading ? 'opacity-70' : ''}`}
          style={{ backgroundColor: selectedPaymentMethod === 'mp' ? '#009EE3' : '#16A34A' }}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
             <Text className="text-white font-bold text-lg">Procesando...</Text>
          ) : (
            <>
              {selectedPaymentMethod === 'mp' ? (
                <>
                  <Text className="text-white font-bold text-lg mr-1">Pagar $16.500 con</Text>
                  <Text className="text-white font-extrabold text-lg mr-2">mercadopago</Text>
                </>
              ) : (
                 <Text className="text-white font-bold text-lg mr-2">Confirmar Pago en Efectivo</Text>
              )}
              <Ionicons name="arrow-forward" size={20} color="white" />
            </>
          )}
        </TouchableOpacity>
        <Text className="text-center text-gray-400 text-[10px] mt-3 px-4">
          Al confirmar, aceptas los <Text className="text-[#137FEC]">Términos y Condiciones</Text> y la <Text className="text-[#137FEC]">Política de Cancelación</Text>.
        </Text>
      </View>

    </View>
  );
}
