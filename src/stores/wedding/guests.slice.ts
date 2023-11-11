import { StateCreator } from "zustand";

export interface GuestSlice {
  guestCount: number;
  setGuestCount: (value: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
  guestCount: 0,
  setGuestCount: (value: number) => set({
    guestCount: value > -1 ? value : 0
  })
});