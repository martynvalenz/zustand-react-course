import { type StateCreator, create } from "zustand";
// import { firebaseStorage } from "../storages/firebase.storage";
import { devtools, persist } from "zustand/middleware";
import { logger } from "../middlewares/logger.middleware";
import { useWeddingBoundStore } from "../wedding";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> =(set) => ({
  firstName: '',
  lastName: '',
 
  setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
  setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),
});



export const usePersonStore = create<PersonState & Actions>()(
  logger(
    devtools(
      persist(
        storeAPI, 
        {
          name:'person-storage',
          // storage: firebaseStorage,
        }
      )
    )
  )
);

usePersonStore.subscribe((nextState, _/* prevState */) => {
  const {firstName, lastName} = nextState;

  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});