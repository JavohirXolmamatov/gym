import { create } from "zustand";

type authState = "login" | "register";

interface IAuthStateStore {
  authState: authState;
  setAuthState: (authState: authState) => void;
}

export const useAuthStateStore = create<IAuthStateStore>((set) => ({
  authState: "login",
  setAuthState: (authState) => set({ authState }),
}));
