import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function Service24h() {
  return (
    <View className="w-full px-4 mt-6 mb-8 overflow-hidden">
      <LinearGradient
        colors={['#EF4444', '#E11D48']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full rounded-[22px] relative"
      >
        {/* Background Decorative Icon */}
        <View className="absolute right-[-10] top-[0] opacity-10">
          <Ionicons name="warning" size={160} color="white" style={{ transform: [{ rotate: '-10deg' }] }} />
        </View>

        {/* Content Container */}
        <View className="relative z-10 p-4">
          {/* Header Tag */}
          <View className="flex-row items-center mb-1 gap-2">
            <View className="w-2 h-2 rounded-full bg-white" />
            <Text className="text-white font-bold text-xs tracking-widest uppercase">
              Servicio Urgente
            </Text>
          </View>

          {/* Title */}
          <Text className="text-white font-bold text-3xl mb-1">
            Emergencia 24/7
          </Text>

          {/* Wrapper for Description & Payment Badge */}
          <View className="flex-row items-center justify-between mt-2 mb-3">
            {/* Description */}
            <Text className="text-white/90 text-sm leading-5 flex-1 pr-2">
              Llegamos en menos de 60 minutos a tu domicilio.
            </Text>
            
            {/* Vertical Divider */}
            <View className="h-full w-[1px] bg-white/20 mx-3" />

            {/* Mercado Pago Badge Section */}
            <View className="items-end">
              <Text className="text-white/90 text-[10px] mb-1">Pagá con</Text>
              <View className="bg-white px-2 py-1 rounded-lg flex-row items-center gap-1 shadow-sm">
                <View className="w-2 h-2 rounded-full bg-[#009EE3]" />
                <View className="w-2 h-2 rounded-full bg-[#22C55E]" /> 
                <Text className="text-[#0f172a] font-black text-xs">MP</Text>
              </View>
            </View>
          </View>

          {/* CTA Button - Aligned to bottom left */}
          <View className="items-start">
            <TouchableOpacity 
              className="bg-white px-5 py-2 rounded-xl flex-row items-center gap-2 shadow-sm"
              activeOpacity={0.8}
            >
              <Text className="text-[#DC2626] font-bold text-base">
                Solicitar Ahora
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#DC2626" />
            </TouchableOpacity>
          </View>

        </View>
      </LinearGradient>
    </View>
  );
}