
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '@/types';

interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    [key: string]: any;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  role: UserRole | null;
  email: string | null;
  name: string | null;
  user: User | null;
  login: (email: string, name: string, role: UserRole, userId: string) => void;
  logout: () => void;
  updateRole: (role: UserRole) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,
      role: null,
      email: null,
      name: null,
      user: null,
      login: (email, name, role, userId) => set({
        isAuthenticated: true,
        email,
        name,
        role,
        userId,
        user: {
          id: userId,
          email,
          user_metadata: {
            full_name: name
          }
        }
      }),
      logout: () => set({
        isAuthenticated: false,
        userId: null,
        role: null,
        email: null,
        name: null,
        user: null
      }),
      updateRole: (role) => set({ role })
    }),
    {
      name: 'gpo-auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        role: state.role,
        email: state.email,
        name: state.name,
        user: state.user,
      }),
    }
  )
);
