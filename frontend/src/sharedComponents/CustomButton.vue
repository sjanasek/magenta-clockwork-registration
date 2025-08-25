<template>
  <button type="button" v-on:click="$emit('buttonClicked')">
    <transition name="fade" mode="out-in">
      <p class="btnName" :key="btnName">{{btnName}}</p>
    </transition>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    btnName: String
  }
};
</script>

<style>
button {
  width: 20vw;
  height: 5vh;
  border: none;
  border-radius: 0.5vh;
  border: 1px solid #38001d;
  color: white;
  background-color: var(--magenta);
  font-family: "telegrotesknext-regular";
  background-image: -webkit-linear-gradient(top, var(--magenta), #b8005f);
  background-image: -moz-linear-gradient(top, var(--magenta), #b8005f);
  background-image: -ms-linear-gradient(top, var(--magenta), #b8005f);
  background-image: -o-linear-gradient(top, var(--magenta), #b8005f);
  background-image: linear-gradient(to bottom, #ff0586, #b8005f);

  -webkit-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset,
    0 -1px 0 rgba(255, 255, 255, 0.1) inset, 0 1px 0 #ad4257,
    0 1px 2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset,
    0 -1px 0 rgba(255, 255, 255, 0.1) inset, 0 1px 0 #ad4257,
    0 1px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset,
    0 -1px 0 rgba(255, 255, 255, 0.1) inset, 0 1px 0 #ad4257,
    0 1px 2px rgba(0, 0, 0, 0.5);
}

button:hover {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.btnName {
  font-family: "telegrotesknext-regular";
  font-size: 1.4em;
  text-align: center;
  padding-right: 2vw;
}
</style>
