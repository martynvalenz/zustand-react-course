import { StateCreator } from "zustand";

export interface PersonSlice {
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value }),
});