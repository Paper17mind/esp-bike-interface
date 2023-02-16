<template>
  <div class="q-pa-sm">
    <nav-head />
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input label="Bike IP" v-model="ip" dense></q-input>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              label="PIN"
              @change="onPin"
              debounce="10"
              :max="999999"
              type="number"
              v-model="pin"
              dense
            ></q-input>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-12">
        <q-item clickable to="/histories">
          <q-item-section avatar>
            <q-icon name="history"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>History</q-item-label>
            <q-item-label caption>Lihat riwayat perjalanan</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="arrow_right"></q-icon>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "@vue/runtime-core";
import NavHead from "src/components/NavHead.vue";
import { useCalculation } from "src/stores/storage";

export default defineComponent({
  components: { NavHead },
  setup() {
    const store = useCalculation();
    const ip = computed({
      get: () => store.$state.ip,
      set: (v) => (store.$state.ip = v),
    });
    const pin = computed({
      get: () => store.$state.auth,
      set: (v) => (store.$state.auth = v),
    });
    return {
      ip,
      pin,
      onPin(e) {
        if (!pin.value) return;
        pin.value = pin.value.substring(0, 6);
      },
    };
  },
});
</script>

<style>
</style>
