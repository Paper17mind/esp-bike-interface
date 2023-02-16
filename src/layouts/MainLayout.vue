<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "MainLayout",
  components: {},
  setup() {
    const q = useQuasar();
    onMounted(() => {
      q.dark.set(true);
    });
  },
});
</script>
