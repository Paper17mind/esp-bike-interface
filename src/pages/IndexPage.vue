<template>
  <div style="width: 100vw; overflow: auto; height: 100vh">
    <div
      style="position: absolute; opacity: 0.6; top: 0px; left: 0px; z-index: 0"
      v-if="showMap"
    >
      <maps />
    </div>
    <div class="row text-center q-pt-md" :class="{ 'q-pa-sm': !showMap }">
      <div class="col-12 col-sm-4">
        <q-knob
          :angle="180"
          v-model="vSpeed"
          :size="$q.screen.width > 400 ? '240px' : '310px'"
          :thickness="0.12"
          :color="cSpeed"
          center-color="grey-9"
          track-color="grey-3"
          class="q-ma-md glow"
          show-value
        >
          <div>
            {{ vSpeed }}
            <div class="text-h5">Km/H</div>
          </div>
        </q-knob>
      </div>
      <div class="col-6 col-sm-4">
        <div class="row q-col-gutter-xs">
          <div v-if="$q.screen.gt.xs" class="col-12">
            <speed-info :hideSide="true" />
          </div>
          <div class="col-12">
            <!-- <q-img width="90%" :src="cmp"></q-img> -->
            <compass @change="setCoord" />
          </div>
        </div>
      </div>
      <div class="col-6 col-sm-4">
        <q-knob
          :angle="180"
          :max="46"
          v-model="vBatt"
          show-value
          :size="$q.screen.gt.xs ? '250px' : '120px'"
          reverse
          :thickness="0.12"
          center-color="grey-9"
          :color="cBatt"
          track-color="grey"
          class="q-ma-md glow"
        >
          <div>{{ vBatt }} <small>V</small></div>
        </q-knob>
      </div>
      <div class="col-12 text-bold" v-if="$q.screen.xs">
        <speed-info />
      </div>
      <q-btn
        to="/setting"
        outline
        round
        style="position: absolute; top: 15px; right: 5px"
        color="red"
      >
        <q-icon name="settings" class=""></q-icon>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import cmp from "assets/compass.png";
import Compass from "components/Compass.vue";
import SpeedInfo from "components/SpeedInfo.vue";
import { useCalculation } from "src/stores/storage";
import Maps from "src/components/Maps.vue";
export default {
  components: { Compass, SpeedInfo, Maps },
  setup() {
    const calc = useCalculation();
    const vSpeed = ref(0);
    const vBatt = ref(0);
    return {
      vSpeed,
      vBatt,
      cmp,
      showMap: computed({
        get: () => calc.$state.showMap,
      }),
      cBatt: computed({
        get: () => (vBatt.value > 35 ? "green" : "orange"),
      }),
      cSpeed: computed({
        get: () => (vSpeed.value < 35 ? "green-6" : "red-9"),
      }),
      setCoord(e) {
        calc.$state.coords = e;
      },
    };
  },
};
</script>

<style scoped>
.glow {
  -webkit-box-shadow: 0px 0px 53px 9px rgba(245, 12, 12, 0.57);
  -moz-box-shadow: 0px 0px 53px 9px rgba(245, 12, 12, 0.57);
  box-shadow: 0px 0px 23px 9px rgba(245, 12, 12, 0.57);
  border-radius: 50%;
}
.kph-glow {
  -webkit-box-shadow: 0px 0px 53px 19px rgba(12, 245, 82, 0.57);
  -moz-box-shadow: 0px 0px 53px 19px rgba(51, 245, 12, 0.57);
  box-shadow: 0px 0px 53px 19px rgba(12, 245, 31, 0.589);
  border-radius: 50%;
}
</style>
