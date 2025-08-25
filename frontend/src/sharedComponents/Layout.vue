<template>
  <div id="layout">
    <div class="header">
      <h1>
        <img id="logo_white" src="/img/logo/logo_white.png">
      </h1>
    </div>
    <BackofficeContent v-if="/backoffice/.test(currentPath)" class="content"/>
    <VisitorContent v-else class="content"/>
  </div>
</template>

<script>
import BackofficeContent from "../pages/backoffice/components/BackofficeContent.vue";
import VisitorContent from "../pages/visitor/components/VisitorContent.vue";
export default {
  name: "Layout",
  data() {
    return {
      currentPath: ""
    };
  },
  components: {
    BackofficeContent,
    VisitorContent
  },
  created() {
    this.currentPath = location.pathname;
  }
};
</script>

<style>
@font-face {
  font-family: telegrotesknext-regular;
  src: url(../../public/fonts/Webfonts/telegrotesknext-regular.woff);
}

* {
  margin: 0;
  padding: 0;
  --magenta: #d6006f;
}

.header {
  background-color: var(--magenta);
  height: 12vh;
  width: 100vw;
  background: var(--magenta);
}

#logo_white {
  float: left;
  margin-top: 2.5vh;
  margin-left: 2vw;
  width: 45vh;
  height: 6.5vh;
}

#spiro {
  float: right;
  margin-top: 1vh;
  margin-right: 2vw;
  width: 8vw;
  height: 13vh;
}

.content {
  height: 85vh;
  width: 100vw;
}

p {
  color: white;
  font-family: "telegrotesknext-regular";
  font-size: 0.8em;
  margin-left: 2vw;
  padding-top: 0.5vh;
}

/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */
/* Portrait */
@media only screen and (min-device-height: 320px) and (max-device-width: 400px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .content {
    height: 90vh;
  }

  #logo_white {
    width: 75vw;
    height: 11vw;
  }

  #spiro {
    margin-top: 0.5vh;
    width: 15vw;
    height: 9vh;
  }
}

/* ----------- iPhone 6, 6S, 7 and 8 ----------- */
/* Portrait */
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .content {
    height: 90vh;
  }

  #spiro {
    margin-top: 0.5vh;
    width: 15vw;
    height: 9vh;
  }
}

/* ----------- iPhone 6+, 7+ and 8+ ----------- */
/* Portrait */
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
  .content {
    height: 90vh;
  }

  #spiro {
    margin-top: 0.5vh;
    width: 15vw;
    height: 9vh;
  }
}

/* ----------- iPhone X ----------- */
/* Portrait */
@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
  .content {
    height: 90vh;
  }

  #spiro {
    margin-top: 0.5vh;
    width: 15vw;
    height: 9vh;
  }
}

/* ----------- Google Pixel ----------- */
/* Portrait */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
  .content {
    height: 90vh;
  }

  #spiro {
    margin-top: 0.5vh;
    width: 15vw;
    height: 9vh;
  }
}

/* ----------- Google Pixel XL ----------- */
/* Portrait */
@media screen and (device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 4) and (orientation: portrait) {
  .content {
    height: 90vh;
  }

  #spiro {
    margin-top: 0.5vh;
    width: 15vw;
    height: 9vh;
  }
}

@media screen and (orientation: landscape) {
  p {
    font-size: 0.5em;
  }
}
</style>