<template>
    <input
      class="FormElement"
      v-model="updatedData[Object.keys(formData)[0]]"
      v-on:keyup="emitToForm"
      v-on:focusout="emitValidationToForm"
      v-bind:name="Object.keys(formData)[0]"
    >
</template>

<script>
export default {
  name: "FormElement",
  props: {
    formData: Object
  },
  data() {
    return {
      updatedData: this.formData
    };
  },
  methods: {
    emitToForm() {
      this.$emit("onFormElementKeyup", this.updatedData);
    },
    emitValidationToForm() {
      this.$emit("validate", this.updatedData);
    }
  }
};
</script>

<style scoped>
input.FormElement {
  margin-top: 1.5vh;
  height: 5vh;
  width: 24.5vw;
  border: 1.1px solid var(--magenta) !important;
  border-radius: 0.5vh;
  font-family: "telegrotesknext-regular";
  font-size: 1.3em !important;
  padding-left: 0.5vw;
}

input.FormElement:focus {
  outline: none;
  background: #f5f5f5;
  box-shadow: inset 0 0 0 2px var(--magenta) !important;
}
</style>
