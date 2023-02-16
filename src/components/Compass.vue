<template>
  <div>
    <div class="compass">
      <div id="compass-circle" :style="compasStyle"></div>
      <div id="my-point" :style="pointStyle"></div>
    </div>
  </div>
</template>
<script>
import { Toast } from "@capacitor/toast";

const isIOS =
  navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
  navigator.userAgent.match(/AppleWebKit/);

let pointDegree;

function calcDegreeToPoint(latitude, longitude) {
  // Qibla geolocation
  const point = {
    lat: 21.422487,
    lng: 39.826206,
  };

  const phiK = (point.lat * Math.PI) / 180.0;
  const lambdaK = (point.lng * Math.PI) / 180.0;
  const phi = (latitude * Math.PI) / 180.0;
  const lambda = (longitude * Math.PI) / 180.0;
  const psi =
    (180.0 / Math.PI) *
    Math.atan2(
      Math.sin(lambdaK - lambda),
      Math.cos(phi) * Math.tan(phiK) -
        Math.sin(phi) * Math.cos(lambdaK - lambda)
    );
  return Math.round(psi);
}

export default {
  data() {
    return {
      compasStyle: {},
      pointStyle: {},
      heading: 0,
    };
  },
  async mounted() {
    // const coordinates = await Geolocation.getCurrentPosition();
    // alert(JSON.stringify(coordinates))
    navigator.geolocation.getCurrentPosition(this.locationHandler, (e) =>
      Toast.show({ text: e.message })
    );
    if (!isIOS) {
      window.addEventListener("deviceorientationabsolute", this.handler, true);
    }
  },
  destroyed() {
    window.removeEventListener("deviceorientationabsolute", (e) =>
      console.log(e)
    );
    window.removeEventListener("deviceorientation", (e) => console.log(e));
  },
  methods: {
    async handler(e) {
      let compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      this.compasStyle.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
      this.heading = compass;
      // ±15 degree
      if (
        (pointDegree < Math.abs(compass) &&
          pointDegree + 15 > Math.abs(compass)) ||
        pointDegree > Math.abs(compass + 15) ||
        pointDegree < Math.abs(compass)
      ) {
        this.pointStyle.opacity = 0;
      } else if (pointDegree) {
        this.pointStyle.opacity = 1;
      }
    },
    locationHandler(position) {
      const { latitude, longitude } = position.coords;
      pointDegree = calcDegreeToPoint(latitude, longitude);
      if (pointDegree < 0) {
        pointDegree = pointDegree + 360;
      }
    },
    startCompass() {
      if (isIOS) {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", this.handler, true);
            } else {
              alert("has to be allowed!");
            }
          })
          .catch(() => alert("not supported"));
      }
    },
  },
};
</script>
 <style scoped>
body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.compass {
  position: relative;
  width: 100%;
  height: 170px;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  margin: auto;
}

.compass > .arrow {
  position: absolute;
  width: 0;
  height: 0;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  border-style: solid;
  border-width: 30px 20px 0 20px;
  border-color: red transparent transparent transparent;
  z-index: 1;
}

.compass > #compass-circle,
.compass > #my-point {
  position: absolute;
  width: 90%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
  background: url(../assets/compass.png) center no-repeat;
  background-size: contain;
}

.compass > #my-point {
  opacity: 0;
  width: 20%;
  height: 20%;
  background-size: contain;
  /* background: rgb(8, 223, 69); */
  border-radius: 50%;
  transition: opacity 0.5s ease-out;
}

.start-btn {
  margin-bottom: auto;
}
</style>
