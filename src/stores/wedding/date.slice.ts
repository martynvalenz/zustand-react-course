import { StateCreator } from "zustand";

export interface DateSlice {
  eventDate: Date;
  eventYYYYMMDD: () => string;
  eventHHMM: () => string;
  setEventDate:(partialDate:string) => void;
  setEventTime:(partialTime:string) => void; 
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),
  eventYYYYMMDD: () => {
    return get().eventDate.toISOString().split('T')[0];
  },
  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2,'0');
    const minutes = get().eventDate.getMinutes().toString().padStart(2,'0');
    return `${hours}:${minutes}`;
  },
  setEventDate: (partialDate:string) => set((state) => {
    const date = new Date(partialDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate() + 1;

    const newDate = new Date(state.eventDate);
    newDate.setFullYear(year);
    newDate.setMonth(month);
    newDate.setDate(day);

    return {eventDate: newDate};
    
    // const [year, month, day] = partialDate.split('-');
    // const date = new Date(get().eventDate);
    // date.setFullYear(parseInt(year));
    // date.setMonth(parseInt(month)-1);
    // date.setDate(parseInt(day));
    // set({eventDate: date});
  }),
  setEventTime: (partialTime:string) => set((state) => {
    const hours = parseInt(partialTime.split(':')[0]);
    const minutes = parseInt(partialTime.split(':')[1]);
    const newDate = new Date(state.eventDate);
    newDate.setHours(hours,minutes);
    return {eventDate: newDate}
    // const [hours, minutes] = partialTime.split(':');
    // const date = new Date(get().eventDate);
    // date.setHours(parseInt(hours));
    // date.setMinutes(parseInt(minutes));
    // set({eventDate: date});
  })
});