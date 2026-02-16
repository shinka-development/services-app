import { Tabs } from 'expo-router';
import React from 'react';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '../../components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#137FEC',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: Platform.OS === 'ios' ? 92 : 72,
          paddingBottom: Platform.OS === 'ios' ? 34 : 12,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Reservas"
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Add"
        options={{
          title: '',
          tabBarButton: (props) => (
            <HapticTab
              {...props}
              style={{
                top: -24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View className="w-[60px] h-[60px] rounded-full bg-[#137FEC] items-center justify-center shadow-lg shadow-blue-500/40">
                <Ionicons name="add" size={32} color="white" />
              </View>
            </HapticTab>
          ),
        }}
      />
      <Tabs.Screen
        name="Mensajes"
        options={{
          title: 'Mensajes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? 'chatbubble' : 'chatbubble-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
      {/* Hidden tabs if needed, but we removed explore */}
      <Tabs.Screen
        name="Explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
