import React, { createContext, useState, useContext } from 'react';

export type ServiceItem = {
  id: string;
  title: string;
  date: string;
  price: string;
  image: string;
  professionalId?: string;
  professionalName?: string;
  professionalRole?: string;
};

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Reparación Aire',
    date: '24 Ene',
    price: '$12.500',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=200&auto=format&fit=crop',
    professionalName: 'Juan Pérez',
    professionalRole: 'Técnico de Aire',
  },
  {
    id: '2',
    title: 'Electricista',
    date: '18 Feb',
    price: '$25.000',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&auto=format&fit=crop',
    professionalName: 'Ricardo G.',
    professionalRole: 'Electricista',
  },
  {
    id: '3',
    title: 'Plomería Cocina',
    date: '10 Mar',
    price: '$18.000',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=200&auto=format&fit=crop',
    professionalName: 'Pedro S.',
    professionalRole: 'Plomero',
  },
];

interface ServiceContextType {
  recentServices: ServiceItem[];
  addService: (service: ServiceItem) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [recentServices, setRecentServices] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const addService = (service: ServiceItem) => {
    setRecentServices((prev) => [service, ...prev]);
  };

  return (
    <ServiceContext.Provider value={{ recentServices, addService }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}
