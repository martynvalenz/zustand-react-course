import { create } from "zustand";
import { type PersonSlice, createPersonSlice } from './person.slice';
import { devtools, persist } from "zustand/middleware";
import { createGuestSlice, type GuestSlice } from './guests.slice';
import { type DateSlice, createDateSlice } from "./date.slice";
import { type ConfirmationSlice, createConfirmationSlice } from "./confirmation.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<ShareState>()(
  //! To persist the store, uncomment the following line and comment the next line
  //! To persist the store, the Date event must be turned into a primite number and parse it in the view
  // persist(
    devtools(
      (...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a),
        ...createConfirmationSlice(...a)
      })
    // ), {name: 'wedding-store'}
  )
);