import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  area: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      name: 'John Doe',
      email,
      phone: '+91 9876543210',
      addresses: [{
        id: '1',
        type: 'home',
        street: '123 Main Street',
        area: 'Connaught Place',
        city: 'Delhi',
        pincode: '110001',
        isDefault: true
      }]
    });
  };

  const signup = async (userData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: '1',
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      addresses: []
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};