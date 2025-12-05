import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        setSession: ({ token, user }) => set({ token, user }),
        updateUser: (updates) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : state.user
          })),
        signOut: () => set({ token: null, user: null })
      }),
      { name: "ux-meals-auth" }
    )
  )
);
