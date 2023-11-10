import { createJSONStorage, type StateStorage } from "zustand/middleware";

const storageAPI:StateStorage = {
  getItem: (key: string):string|Promise<string|null> | null => {
    const data = sessionStorage.getItem(key);
    return data;
  },
  setItem: (key: string, value: string):void|Promise<void> => {
    sessionStorage.setItem(key, value);
  },
  removeItem: (key: string):void|Promise<void> => window.sessionStorage.removeItem(key),
}

export const customSessionStorage = createJSONStorage(() => storageAPI);