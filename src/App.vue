<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useCalculation } from "./stores/storage";

export default defineComponent({
  name: "App",
  setup() {
    const store = useCalculation();
    let tmp = localStorage.getItem("store");
    if (tmp) {
      const last = JSON.parse(tmp);
      store.$patch((state) => {
        Object.keys(last).forEach((e) => {
          state[e] = last[e];
        });
      });
    }
    store.$subscribe((mutation, state) => {
      mutation.payload;
      localStorage.setItem("store", JSON.stringify(state));
    });
  },
});
</script>
