import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: {},
  loginUser: (user) => set({ user }),
  logoutUser: () => set({user: {}}),
  signInUser: (user) => set({ user }),
}));

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       user: {},
//       loginUser: (user) => set({ user }),
//       logoutUser: () => set({ user: {} }),
//       signInUser: (user) => set({ user }),
//     }),
// {
//   name: "auth-store",
//   getStorage: () => localStorage,
//   serialize: (state) => JSON.stringify(state),
//   deserialize: (state) => JSON.parse(state),
//   onRehydrateStorage: (state) => console.log("Store rehydrated from storage"),
// }
//   )
// );
