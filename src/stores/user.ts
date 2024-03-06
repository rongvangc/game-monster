import { create } from "zustand";

interface UserState {
  user: User | null;
  users: User[] | null;
  setCurrentUser: (user: User) => void;
  setAllUsers: (users: User[]) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  users: null,
  setCurrentUser: (user) => {
    set((state) => ({
      ...state,
      user,
    }));
  },
  setAllUsers: (users) => {
    set((state) => ({
      ...state,
      users,
    }));
  },
}));

export default useUserStore;
