import { create } from 'zustand';
import { IAccountAttributes } from '../types/account';

export interface IAccountStore {
  account: IAccountAttributes | null;
  setUser: (user: IAccountAttributes | null) => void;
}

export const useAccountStore = create<IAccountStore>((set) => ({
  account: null,
  setUser: (user) => set({ account: user }),
}));
