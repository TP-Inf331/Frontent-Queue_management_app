import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../interface/api.interface';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    clearAuth: () => void;
    updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            setAuth: (user, token) => {
                localStorage.setItem('nowait_token', token);
                set({ user, token, isAuthenticated: true });
            },
            clearAuth: () => {
                localStorage.removeItem('nowait_token');
                set({ user: null, token: null, isAuthenticated: false });
            },
            updateUser: (user) => set({ user }),
        }),
        {
            name: 'nowait-auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
