<template>
  <div class="checkbox">
    <input type="checkbox" id="checkbox" @click="emitToParent">
    <label for="checkbox">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: "checkbox",
  props: {
    label: String
  },
  methods: {
    emitToParent(event) {
      this.$emit("checkboxClicked", event);
    }
  }
};
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  width: 67vw;
  align-self: center;
}

.checkbox input[type="checkbox"] {
  opacity: 0;
}

.checkbox label {
  font-family: telegrotesknext-regular;
  font-size: 0.9em;
  font-weight: bold;
  position: relative;
  display: inline-block;
  padding-left: 28px;
}

.checkbox label::before,
.checkbox label::after {
  position: absolute;
  content: "";
  display: inline-block;
}

.checkbox label::before {
  height: 16px;
  width: 16px;
  border: 1.5px solid;
  border-color: var(--magenta);
  left: 0px;
  top: 3px;
}

.checkbox label::after {
  height: 5px;
  width: 9px;
  border-left: 2px solid;
  border-bottom: 2px solid;
  transform: rotate(-45deg);
  color: var(--magenta);
  left: 4px;
  top: 7px;
}

.checkbox input[type="checkbox"] + label::after {
  content: none;
}

.checkbox input[type="checkbox"]:checked + label::after {
  content: "";
}

.checkbox input[type="checkbox"]:focus + label::before {
  outline: rgb(59, 153, 252) auto 5px;
}
</style>
