<template>
  <div :class="{ 'text-left q-ml-sm': !hideSide, 'q-mb-xl q-pb-xl': hideSide }">
    <q-separator />
    <q-item>
      <q-item-section>
        <q-item-label :caption="hideSide">Journey</q-item-label>
        <q-item-label v-if="hideSide">{{ distance }} Km</q-item-label>
      </q-item-section>
      <q-item-section v-if="!hideSide" side> {{ distance }} Km </q-item-section>
    </q-item>
    <q-separator />
    <q-item>
      <q-item-section>
        <q-item-label :caption="hideSide">Top Speed</q-item-label>
        <q-item-label v-if="hideSide">{{ speed }} Km/h</q-item-label>
      </q-item-section>
      <q-item-section v-if="!hideSide" side> {{ speed }} Km/h </q-item-section>
    </q-item>
    <q-separator />
  </div>
</template>

<script>
import { useCalculation } from "src/stores/storage";
import { computed } from "@vue/runtime-core";
export default {
  props: {
    hideSide: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = useCalculation();
    const speed = computed({
      get: () => store.$state.speed,
    });
    const distance = computed({
      get: () => store.$state.distance,
    });
    return {
      speed,
      distance,
    };
  },
};
</script>

<style>
</style>
