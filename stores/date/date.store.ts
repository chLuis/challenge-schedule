'use client';

import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { customLocalStorage } from "../storage/local-storage";
import { Cita } from "@/types/cita";


interface StoreState {
  dates: Cita[];
  addDate: (date: Cita) => void;
  removeDate: (date: Cita) => void;
  removeAllDate: () => void;
}

const storeApi: StateCreator<StoreState> = (set) => ({
  dates: [],
  addDate: (date: Cita) => set((state) => {
    const existingDate = state.dates.find(item => 
      item.fecha === date.fecha && 
      item.hora === date.hora && 
      item.id_paciente === date.id_paciente &&
      item.id_agenda === date.id_agenda);
    if (existingDate) {
      return state;
    } else {
      return { dates: [...state.dates, date] };
    }
  }),
  removeDate: (date: Cita) => set((state) => ({ dates: state.dates.filter((i) => i.id_agenda !== date.id_agenda) })),
  removeAllDate: () => set((state) => ({dates: [] })),
});

export const useDatesStore = create<StoreState>()(
  persist(
    storeApi,
    {
      name: 'dates',
      storage: customLocalStorage
    })

);