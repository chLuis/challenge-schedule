'use client';

import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { customLocalStorage } from "../storage/local-storage";


interface StoreState {
  day: string;
  newDay: (newDate : Date) => void;
  removeDay: () => void;
}

const formatDateToArgentina = (date: Date): string => {
  // Adjust to Argentina timezone (UTC-3)
  const argentinaOffset = -3 * 60; // UTC-3 in minutes
  const localTime = date.getTime();
  const argentinaTime = new Date(localTime + argentinaOffset * 60 * 1000);
  const isoString = argentinaTime.toISOString().split('.')[0]; // Remove milliseconds
  //console.log(isoString);
  //return isoString.replace('Z', ''); // Remove trailing 'Z'
  return isoString;
};

const storeApi: StateCreator<StoreState> = (set) => ({
  day: "2021-09-16T00:00:00",
  newDay: (newDate: Date ) => set(() => ({ day: formatDateToArgentina(newDate) })),
  removeDay: () => set((state) => ({ day: "" }))
});

export const useDayStore = create<StoreState>()(
  persist(
    storeApi,
    {
      name: 'day',
      storage: customLocalStorage
    })

);