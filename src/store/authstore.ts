import { create } from 'zustand';


interface User {
  id: string;
  name: string;
  email: string;
 
}


interface AuthState {
  user: User | null; 
  token: string | null;
  isAuthenticated: boolean;
  setUser: (userData: User) => void; 
  setToken: (token: string) => void; 
  logout: () => void; 
}


const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (userData: User) => set({ user: userData, isAuthenticated: true }),
  setToken: (token: string) => set({ token }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;
