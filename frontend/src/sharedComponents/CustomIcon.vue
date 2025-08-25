<template>
  <div class="iconWrapper">
    <label v-if="left" class="iconDescription left" for="iconImg">{{description}}</label>
    <div class="icon">
      <img class="iconImg" :src="src || '/img/icons/camera_icon.png'" @click="$emit('iconClicked')">
    </div>
    <label v-if="!left" class="iconDescription" for="iconImg">{{description}}</label>
  </div>
</template>

<script>
export default {
  name: "CustomIcon",
  props: {
    src: String,
    description: String,
    left: Boolean
  }
};
</script>

<style scoped>
.iconWrapper {
  display: flex;
  align-items: center;
}

.icon {
  display: flex;
  justify-content: center;
  background-color: var(--magenta);
  height: 7vh;
  width: 7vh;
  border-width: 1vh;
  padding: 5px;
  border: 3px solid grey;
  background: white;
  box-shadow: inset 0 0 0 4px white !important;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.icon:hover {
  border: 4px solid darkslategrey;
  background: var(--magenta);
  box-shadow: inset 0 0 0 3px white !important;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.iconImg {
  align-self: center;
  justify-self: center;
  height: 5vh;
  width: 5vh;
}

.iconDescription {
  font-size: 0.9em;
  font-weight: bold;
  width: 10vw;
  margin-left: 10px;
  font-family: telegrotesknext-regular;
}

.left {
  margin-left: 25px;
  margin-right: 40px;
  text-align: right;
}

</style>
