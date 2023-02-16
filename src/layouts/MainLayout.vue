<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
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
