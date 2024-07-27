import { createJSONStorage } from "zustand/middleware";

const storageApi = {
  getItem: function (name : string) {
    if (typeof localStorage !== "undefined") {
      const data = localStorage.getItem(name);
      return data;
    }
    return null;
  },

  setItem: function (name: string, value: any) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(name, value);
    }
  },

  removeItem: function (name: string) {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(name);
    }
  }
}

export const customLocalStorage = createJSONStorage( () => storageApi )