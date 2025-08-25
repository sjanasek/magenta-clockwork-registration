<template>
  <div class="elementWrapper">
    <img
      class="productImage"
      v-bind:id="product.hasOwnProperty('dropdown') ? '' : 'product_' + product.id"
      v-bind:src="product.product_picture_url"
    >
    <img id="chosenFlower" v-bind:src="getFlower">
    <Dropdown
      v-bind:id="product.product_name"
      class="dropdown"
      :options="product.dropdown"
      :placeholder="placeholder"
      v-if="product.hasOwnProperty('dropdown')"
    ></Dropdown>
  </div>
</template>

<script>
import Dropdown from "vue-simple-search-dropdown";
import { mapGetters } from "vuex";
export default {
  name: "Product",
  components: {
    Dropdown
  },
  props: {
    product: Object,
    placeholder: String
  },
  computed: {
    ...mapGetters(["getFlower"])
  }
};
</script>

<style scoped>
.elementWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin: 10vw, 12vw, 12vw, 12vw;
}

.productImage {
  height: 40vh;
}

#chosenFlower {
  position: absolute;
  top: 25vh;
  height: 15vh;
}

.dropdown {
  position: absolute;
  border: 2px solid var(--magenta);
  border-radius: 0.5vh;
  font-family: "telegrotesknext-regular";
  font-size: 0.5em;
  margin-top: 41vh;
}
</style>
