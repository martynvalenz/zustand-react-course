import { create } from "zustand";
import { type PersonSlice, createPersonSlice } from './person.slice';
import { devtools } from "zustand/middleware";
import { createGuestSlice, type GuestSlice } from './guests.slice';
import { type DateSlice, createDateSlice } from "./date.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
      ...createDateSlice(...a)
    })
  )
);