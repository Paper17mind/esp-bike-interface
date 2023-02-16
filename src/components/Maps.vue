<template>
  <div style="height: 600px; width: 800px">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { defineComponent, ref } from "@vue/runtime-core";
export default defineComponent({
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  setup() {
    const zoom = ref(3);
    return {
      zoom,
    };
  },
});
</script>

<style>
</style>
