'use client';

import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Cita } from "@/types/cita";

interface StoreState {
  dates: Cita[];
  addDate: (date: Cita) => void;
  getDate: (date: Cita) => Cita | undefined;
  getDates: () => Cita[];
  changeDate: (date: Cita, newDate: Cita) => void;
  removeDate: (date: Cita) => void;
  removeAllDate: () => void;
}

const storeApi: StateCreator<StoreState> = (set, get) => ({
  dates: [],
  addDate: (date) => set((state) => ({ dates: [...state.dates, date] })),
  getDate: (date) => get().dates.find((i) => i.fecha === date.fecha && i.hora === date.hora),
  getDates: () => get().dates,
  changeDate: (date, newDate) => set((state) => {
    const exists = state.dates.some(i => i.fecha === date.fecha && i.hora === date.hora);
    if (exists) {
      return {
        dates: state.dates.map(i => (i.fecha === date.fecha && i.hora === date.hora ? newDate : i))
      };
    }
    return {
      dates: [...state.dates, newDate]
    };
}),
  removeDate: (date: Cita) => set((state) => ({ dates: state.dates.filter((i) => i.id_agenda !== date.id_agenda) })),
  removeAllDate: () => set((state) => ({dates: [] })),
});

export const useDatesStore = create<StoreState>()(
  persist(
    storeApi,
    {
      name: 'dates-storage',
      storage: createJSONStorage(() => localStorage),
    })
);