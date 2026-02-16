import React, { createContext, useState, useContext } from 'react';

const INITIAL_NOTIFICATIONS = [
  { id: '1', title: 'Servicio Confirmado', message: 'Tu electricista Ricardo G. está en camino a tu domicilio.', time: 'Hace 5 min', unread: true, type: 'service' },
  { id: '2', title: 'Pago Exitoso', message: 'Has pagado $16.500 por el servicio de electricidad.', time: 'Hace 1 hora', unread: false, type: 'payment' },
  { id: '3', title: 'Bienvenido', message: 'Gracias por unirte a nuestra app. Completá tu perfil para empezar.', time: 'Ayer', unread: false, type: 'system' },
  { id: '4', title: 'Descuento Disponible', message: 'Tenés un 10% de descuento en tu próximo servicio de Plomería.', time: 'Hace 2 días', unread: false, type: 'promo' },
  { id: '5', title: 'Actualización de App', message: 'Hemos mejorado el rendimiento y corregido errores de la versión anterior.', time: 'Hace 1 sem', unread: false, type: 'system' },
];

type Notification = typeof INITIAL_NOTIFICATIONS[0];

interface NotificationContextType {
  notifications: Notification[];
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <NotificationContext.Provider value={{ notifications, markAllAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
