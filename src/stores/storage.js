import { defineStore } from "pinia";

export const useCalculation = defineStore("distance", {
  state: () => ({
    distance: 0,
    speed: 0,
    showMap: true,
    latLongs: [],
    coords: {},
    ip: null,
    auth: null,
  }),
  getters: {
    doubleCount: (state) => state.distance * 2,
  },
  actions: {
    increment() {
      this.distance++;
    },
  },
});
