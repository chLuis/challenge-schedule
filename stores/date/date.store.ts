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

  // addDate: (date: Cita) => set((state) => {
  //   const existingDate = state.dates.find(item => 
  //     item.fecha === date.fecha && 
  //     item.hora === date.hora && 
  //     item.id_paciente === date.id_paciente &&
  //     item.id_agenda === date.id_agenda);
  //   if (existingDate) {
  //     return state;
  //   } else {
  //     const dateToUpdate = state.dates.find(item => 
  //       item.fecha === date.fecha &&
  //       item.hora === date.hora)
  //       //console.log("To update ->",dateToUpdate);
  //     if (dateToUpdate) {
  //       dateToUpdate.ape_nom = date.ape_nom;
  //       dateToUpdate.id_paciente = date.id_paciente;
  //       dateToUpdate.id_agenda = date.id_agenda;
  //       return { dates: [...state.dates] };
  //     }
  //     return { dates: [...state.dates, date] };
  //   }
  // }),