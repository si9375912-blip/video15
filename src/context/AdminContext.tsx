import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  adminSettings: {
    canManageContent: boolean;
    canViewAnalytics: boolean;
    canManageUsers: boolean;
  };
  updateAdminSettings: (settings: Partial<AdminContextType['adminSettings']>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
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

export default AdminContext;