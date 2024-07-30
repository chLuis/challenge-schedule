'use client';

import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StoreState {
  day: string;
  getDay: () => string;
  newDay: (newDate : Date) => void;
  removeDay: () => void;
}

const formatDateToArgentina = (date: Date): string => {
  const argentinaOffset = -3 * 60;
  const localTime = date.getTime();//                                         1631761200000
  const argentinaTime = new Date(localTime + argentinaOffset * 60 * 1000); // 2021-09-16T00:00:00.000Z
  const isoString = argentinaTime.toISOString().split('.')[0]; //             2021-09-16T00:00:00
  return isoString;
};

const storeApi: StateCreator<StoreState> = (set, get) => ({
  day: "2021-09-16T00:00:00",
  getDay: () => get().day,
  newDay: (newDate: Date ) => set(() => ({ day: formatDateToArgentina(newDate) })),
  removeDay: () => set((state) => ({ day: "" }))
});

export const useDayStore = create<StoreState>()(
  persist(
    storeApi,
    {
      name: 'day',
      storage: createJSONStorage(() => localStorage),
    })
);