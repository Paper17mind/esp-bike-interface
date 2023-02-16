<template>
  <div
    :style="{ height: `${$q.screen.height}px`, width: `${$q.screen.width}px` }"
  >
    <l-map ref="map" v-model:zoom="zoom" :center="coords">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="coords"> </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { computed, defineComponent, ref } from "@vue/runtime-core";
import { useCalculation } from "src/stores/storage";
export default defineComponent({
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  setup() {
    const store = useCalculation();
    const coords = computed({
      get: () => {
        if (store.$state.coords.latitude) {
          return [store.$state.coords.latitude, store.$state.coords.longitude];
        }
        return [-7.0642479, 108.0835785];
      },
      set: (v) => (store.$state.coords = v),
    });
    const zoom = ref(13);
    return {
      zoom,
      coords,
    };
  },
});
</script>

<style>
</style>
