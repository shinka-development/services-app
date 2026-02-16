import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNotifications } from '../context/NotificationContext';
import '../global.css';

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markAllAsRead } = useNotifications();

  const getIcon = (type: string) => {
    switch(type) {
      case 'service': return { name: 'construct', color: '#137FEC', bg: 'bg-blue-100' };
      case 'payment': return { name: 'card', color: '#16A34A', bg: 'bg-green-100' };
      case 'promo': return { name: 'pricetag', color: '#EAB308', bg: 'bg-yellow-100' };
      default: return { name: 'notifications', color: '#64748B', bg: 'bg-gray-100' };
    }
  };

  const renderNotification = ({ item }: { item: { id: string, title: string, message: string, time: string, unread: boolean, type: string } }) => {
    const icon = getIcon(item.type);
    
    return (
      <TouchableOpacity className={`flex-row p-4 border-b border-gray-100 ${item.unread ? 'bg-blue-50/30' : 'bg-white'}`}>
        <View className={`w-10 h-10 rounded-full ${icon.bg} items-center justify-center mr-3`}>
          <Ionicons name={icon.name as any} size={20} color={icon.color} />
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <Text className={`text-sm text-slate-900 flex-1 mr-2 ${item.unread ? 'font-bold' : 'font-semibold'}`}>
              {item.title}
            </Text>
            <Text className="text-xs text-slate-400">{item.time}</Text>
          </View>
          <Text className="text-xs text-slate-500 leading-5">{item.message}</Text>
        </View>
        {item.unread && (
          <View className="w-2 h-2 rounded-full bg-[#137FEC] mt-2 ml-2" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View className="pt-12 pb-4 px-4 border-b border-gray-100 flex-row items-center gap-4 bg-white sticky top-0 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-100 shadow-sm"
        >
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">Notificaciones</Text>
        <View className="flex-1 items-end">
             <TouchableOpacity onPress={markAllAsRead}>
                <Text className="text-[#137FEC] font-semibold text-xs">Marcar leídas</Text>
             </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
