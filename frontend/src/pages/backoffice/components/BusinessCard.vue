<template>
  <img id="testCard" v-bind:src="src" v-on:click="$emit('cardClicked')">
</template>

<script>
export default {
  name: "BusinessCard",
  props: {
    card: Object
  },
  data() {
    return {
      src: this.card.business_card
    };
  }
};
</script>

<style scope>
#testCard {
  float: right;
  width: 22.5vw;
  height: 29vh;
  border-radius: 8px;
  border: 2.5px solid white;
}

#testCard:hover {
  cursor: pointer;
  border: 2.5px solid var(--magenta);
}
</style>
