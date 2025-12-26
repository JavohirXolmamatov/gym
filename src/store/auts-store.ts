import { create } from "zustand";

type authState = "login" | "register";

interface IAuthStateStore {
  authState: authState;
  setAuth: (authState: authState) => void;
}

export const useAuthState = create<IAuthStateStore>((set) => ({
  authState: "login",
  setAuth: (authState) => set({ authState }),
}));
