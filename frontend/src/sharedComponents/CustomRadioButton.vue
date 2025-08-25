<template>
  <label class="radio-label" v-bind:for="radioName">
    {{ radioName }}
    <input
      type="radio"
      v-on:click="emitToParent"
      name="rating"
      v-bind:value="radioName"
      v-bind:id="radioName"
    >
    <span></span>
  </label>
</template>

<script>
export default {
  name: "CustomRadioButton",
  props: {
    radioName: String
  },
  methods: {
    emitToParent(event) {
      this.$emit("radioClicked", event.target.value);
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: telegrotesknext-regular;
  src: url(../../public/fonts/Webfonts/telegrotesknext-regular.woff);
}

input[type="radio"] {
  display: none;
}

label {
  font-family: telegrotesknext-regular;
  font-size: 20px;
  font-weight: bold;
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 25px;
}

span {
  background: lightgrey;
  box-shadow: inset 0 0 0 6px white !important;
  width: 14px;
  height: 14px;
  display: inline-block;
  position: absolute;
  top: 3px;
  left: 0;
  transition: all 0.2s linear;
}

input[type="radio"] + span {
  padding: 5px;
  border-radius: 50%;
  border: 2px solid grey;
}

label:hover span {
  border: 3px solid var(--magenta);
}

input[type="checkbox"]:checked + span,
input[type="radio"]:checked + span {
  background: var(--magenta);
  box-shadow: inset 0 0 0 3px white !important;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
}
</style>
