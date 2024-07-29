'use client';

import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { customLocalStorage } from "../storage/local-storage";
import { Cita } from "@/types/cita";


interface StoreState {
  dates: Cita[];
  addDate: (date: Cita) => void;
  changeDate: (date: Cita, newDate: Cita) => void;
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
      const dateToUpdate = state.dates.find(item => 
        item.fecha === date.fecha &&
        item.hora === date.hora)
        console.log("To update ->",dateToUpdate);
      if (dateToUpdate) {
        dateToUpdate.ape_nom = date.ape_nom;
        dateToUpdate.id_paciente = date.id_paciente;
        dateToUpdate.id_agenda = date.id_agenda;
        return { dates: [...state.dates] };
      }
      return { dates: [...state.dates, date] };
    }
  }),
  changeDate: (date, newDate) => set((state) => {
    // Verifica si ya existe un elemento con la misma fecha y hora
    const exists = state.dates.some(i => i.fecha === date.fecha && i.hora === date.hora);

    // Si existe, modifica el elemento
    if (exists) {
        return {
            dates: state.dates.map(i => (i.fecha === date.fecha && i.hora === date.hora ? newDate : i))
        };
    }

    // Si no existe, agrega el nuevo elemento
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
      name: 'dates',
      storage: customLocalStorage
    })

);

//TODO -> fix cuando no hay item, en changeDate