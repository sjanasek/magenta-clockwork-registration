<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Sales"
};
</script>

<style>
@font-face {
  font-family: telegrotesknext-regular;
  src: url(/fonts/Webfonts/telegrotesknext-regular.woff);
}

html {
  touch-action: pan-down;
}

*,
body {
  margin: 0;
  padding: 0;
  --magenta: #d6006f;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

