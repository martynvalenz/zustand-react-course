import { type StateCreator, create } from "zustand";
import { type StateStorage, persist, createJSONStorage } from "zustand/middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions> =(set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set(state => ({ firstName: value })),
  setLastName: (value: string) => set(state => ({ lastName: value })),
});

const sessionStorage:StateStorage = {
  getItem: (key: string):string|Promise<string|null> | null => window.sessionStorage.getItem(key),
  setItem: (key: string, value: string):void|Promise<void> => window.sessionStorage.setItem(key, value),
  removeItem: (key: string):void|Promise<void> => window.sessionStorage.removeItem(key),
}

export const usePersonStore = create<PersonState & Actions>()(
  persist(
    storeAPI, 
    {
      name:'person-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);