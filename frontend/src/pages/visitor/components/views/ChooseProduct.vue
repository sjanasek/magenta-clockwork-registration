<template>
  <div id="chooseProduct">
    <h2 class="productSlogan">{{ getJSON.pageThree.chooseProduct }}</h2>
    <div id="noProductError" :style="{visibility: error ? 'visible': 'hidden'}">
      <img src="/img/icons/error.png">
      <span>{{getJSON.pageThree.error}}</span>
    </div>
    <span v-if="slideLeft" class="slideLeft"/>
    <slider ref="slider" :options="slideOptions">
      <slideritem
        class="slide"
        v-for="product in getAvailableProducts"
        v-bind:key="product.product_id"
      >
        <Product :product="product" :placeholder="getJSON.pageThree.dropdownPlaceholder"/>
      </slideritem>
    </slider>
    <span v-if="slideRight" class="slideRight"/>
    <CustomButton
      id="ctaButton"
      v-on:buttonClicked="chooseProduct"
      :btnName="getJSON.pageThree.buttonChooseProduct"
    />
  </div>
</template>

<script>
import Product from "./chooseProduct/Product";
import CustomButton from "../../../../sharedComponents/CustomButton";
import { slider, slideritem } from "vue-concise-slider";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ChooseProduct",
  components: {
    Product,
    CustomButton,
    slider,
    slideritem
  },
  data() {
    return {
      slideOptions: {
        speed: 500
      },
      error: false,
      slideLeft: false,
      slideRight: false,
      activeSlide: ""
    };
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "reserveProduct",
      "toggleProductDone",
      "updateVisitorData"
    ]),
    chooseProduct() {
      let error = false;
      const activeSlide = document.querySelectorAll(
        ".slide.slider-item.slider-active"
      ).length
        ? document.querySelector(".slide.slider-item.slider-active")
        : document.querySelector(".slide.slider-item.slider-active");
      let product_id = activeSlide.querySelector('[id*="product"]')
        ? activeSlide.querySelector('[id*="product"]').id.slice(-1)
        : -1;
      if (!~product_id) {
        if (activeSlide.querySelectorAll(".dropdown-item").length > 1) {
          error = true;
        } else if (activeSlide.querySelectorAll(".dropdown-item").length) {
          error = false;
          const productName = activeSlide
            .querySelector(".dropdown-item")
            .textContent.trim();
          const unparsedProductGroupName = productName
            .slice(0, productName.length - 1)
            .trim();
          const productGroupName = unparsedProductGroupName.replace(/\s/g, "-");

          this.getAvailableProducts.forEach(productGroup => {
            if (
              productGroup.hasOwnProperty("product_name") &&
              productGroup.product_name.trim() == productGroupName.trim()
            ) {
              productGroup.dropdown.forEach(product => {
                if (product.name.trim() == productName.trim()) {
                  product_id = product.id;
                }
              });
            }
          });
        }
      }
      if (error || !~product_id) {
        this.error = true;
      } else {
        const date = new Date();
        const payload = {
          reserved_hash_id: this.getID,
          reserved_product: product_id,
          time_of_reservation: date.toUTCString()
        };
        this.toggleProductDone(true);
        const self = this;
        this.reserveProduct(payload).then(() => {
          localStorage.productInfo = JSON.stringify(this.getProductInfo);
          self.updateVisitorData({
            product_type: this.getProductInfo.reservation.reserved_product
          });
        });
      }
    },
    slide(/**direction */) {
      const current = document.querySelector(".slider-active");
      const allSlides = Array.from(document.querySelectorAll(".slider-item"));
      const index = allSlides.findIndex(slide => slide == current);
      // const next =
      //   direction === "left" ? allSlides[index - 1] : allSlides[index + 1];
      // next.classList.add(".slider-active");
      // current.classList.remove(".slider-active");

      if (index == 0) {
        this.slideLeft = false;
      } else {
        this.slideLeft = true;
      }
      if (index == allSlides.length - 1) {
        this.slideRight = false;
      } else {
        this.slideRight = true;
      }
      this.slideLeft = true;
      this.slideRight = true;
    }
  },
  computed: {
    ...mapGetters([
      "getJSON",
      "getAvailableProducts",
      "getID",
      "getProductInfo"
    ])
  },
  created() {
    this.fetchProducts();
  },
  mounted() {
    setInterval(() => {
      const dropdownInputs = document.querySelectorAll(".dropdown-input");
      dropdownInputs.forEach(input => {
        input.setAttribute("readonly", "readonly");
      });
    }, 1500);

    setTimeout(() => {
      const current = document.querySelector(".slider-active");
      this.activeSlide = current;
      const allSlides = Array.from(document.querySelectorAll(".slider-item"));
      const index = allSlides.findIndex(slide => slide == current);

      if (index == 0) {
        this.slideLeft = false;
      }
      if (index == allSlides.length - 1) {
        this.slideRight = false;
      } else {
        this.slideRight = true;
      }
    }, 500);
  },
  watch: {
    activeSlide: function() {
      this.slide();
    }
  }
};
</script>

<style scope>
#chooseProduct {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-items: center;
  align-items: center;
}

.productSlogan {
  color: black;
  font-family: "telegrotesknext-regular";
  margin-bottom: 2vh;
}

.slide {
  display: flex;
  flex-basis: 100%;
  flex-direction: row;
  position: relative;
  align-content: center;
  justify-content: center;
  /* border-radius: 10px;
  border-color: var(--magenta);
  background: var(--magenta); 
  box-shadow: inset 0 0 0 3vh white !important; */
  height: 40vh;
  width: 100%;
  padding-bottom: 20vh;
}

.slideLeft {
  position: absolute;
  left: 20px;
  top: 47%;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 20px 10px 0;
  border-color: transparent #d6006f transparent transparent;
}

.slideRight {
  position: absolute;
  width: 0;
  height: 0;
  top: 47%;
  right: 20px;
  border-style: solid;
  border-width: 10px 0 10px 20px;
  border-color: transparent transparent transparent #d6006f;
}

#ctaButton {
  height: 7vh;
  width: 30vw;
}

#ctaButton p {
  font-size: 1.3em;
}

#noProductError {
  display: flex;
  color: red;
  font-family: "telegrotesknext-regular";
  font-weight: bold;
  align-items: center;
}

#noProductError img {
  height: 3vh;
  width: 3vh;
  margin-right: 1vw;
}
</style>