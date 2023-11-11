import { createJSONStorage, type StateStorage } from "zustand/middleware";
const firebaseUrl = '';

const firebaseApi:StateStorage = {
  getItem: async (key: string):Promise<string|null> => {
    try {
      const data = await fetch(`${firebaseUrl}/${key}.json`)
      .then((res) => res.json());
      return JSON.stringify(data);
    } catch (error) {
      throw error;
    }
  },
  setItem: async(key: string, value: string):Promise<void> => {
    await fetch(`${firebaseUrl}/${key}.json`,{
      method:'PUT',
      body: value,
    });

    return
  },
  removeItem: (key: string):void|Promise<void> => window.sessionStorage.removeItem(key),
}

export const firebaseStorage = createJSONStorage(() => firebaseApi);