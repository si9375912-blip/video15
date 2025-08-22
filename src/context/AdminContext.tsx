import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextState {
  prices: {
    moviePrice: number;
    seriesPrice: number;
    transferFeePercentage: number;
    novelPricePerChapter: number;
  };
  deliveryZones: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  novels: Array<any>;
}

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  state: AdminContextState;
  updateState: (updates: Partial<AdminContextState>) => void;
  adminSettings: {
    canManageContent: boolean;
    canViewAnalytics: boolean;
    canManageUsers: boolean;
  };
  updateAdminSettings: (settings: Partial<AdminContextType['adminSettings']>) => void;
}

const BASE_DELIVERY_ZONES = [
  { id: '1', name: 'Zona 1', price: 5 },
  { id: '2', name: 'Zona 2', price: 8 },
  { id: '3', name: 'Zona 3', price: 12 }
];

const DEFAULT_NOVELAS: any[] = [];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [state, setState] = useState<AdminContextState>({
    prices: {
      moviePrice: 10,
      seriesPrice: 15,
      transferFeePercentage: 5,
      novelPricePerChapter: 2
    },
    deliveryZones: BASE_DELIVERY_ZONES,
    novels: DEFAULT_NOVELAS
  });
  
  const updateState = (updates: Partial<AdminContextState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };
  
  const [adminSettings, setAdminSettings] = useState({
    canManageContent: false,
    canViewAnalytics: false,
    canManageUsers: false,
  });

  const updateAdminSettings = (settings: Partial<AdminContextType['adminSettings']>) => {
    setAdminSettings(prev => ({ ...prev, ...settings }));
  };

  const value: AdminContextType = {
    isAdmin,
    setIsAdmin,
    state,
    updateState,
    adminSettings,
    updateAdminSettings,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export { AdminContext };