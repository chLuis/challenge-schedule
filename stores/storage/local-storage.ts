import { createJSONStorage } from "zustand/middleware";

const storageApi = {
  getItem: function (name : string) {
    const data = localStorage.getItem(name)
    return data
  },

  setItem: function (name: string, value: any) {
    localStorage.setItem(name, value);
  },

  removeItem: function (name: string) {
    localStorage.removeItem(name);
  }
}

export const customLocalStorage = createJSONStorage( () => storageApi )