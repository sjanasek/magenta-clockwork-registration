<template>
  <div class="popup">
    <p class="message">{{getPopup.message}}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Popup",
  computed: {
    ...mapGetters(["getPopup"])
  }
};
</script>

<style>
.message {
  height: 3vh;
  width: 12vw;
  position: absolute;
  background: var(--magenta);
  text-transform: uppercase;
  font-family: telegrotesknext-regular;
  color: white;
  font-size: 16px;
  font-weight: bold;
  right: 0;
  margin: 0;
  padding: 3.5vh 1vw;
  text-align: center;
  border-radius: 25px 0px 0px 25px;
}
</style>
