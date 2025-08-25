<template>
  <div id="enterDataWrapper">
    <div id="formWrapper">
      <h2>{{getJSON.pageFour !== undefined ? getJSON.pageFour.header : ''}}</h2>
      <div id="options" v-if="navigator">
        <CustomIcon
          @iconClicked="handleFormClick($event)"
          :description="getJSON.pageFour.formDescription"
          :src="formSrc"
          :left="false"
        />
        <CustomIcon
          @iconClicked="handleFileInputClick($event)"
          :description="getJSON.pageFour.cardDescription"
          :src="cardSrc"
          :left="true"
        />
      </div>
      <Form v-if="!navigator || getOption === 'form'"/>
      <CardContainer :src="getVisitorData.business_card" v-else-if="getOption === 'photo'"/>
      <input type="file" accept=".png, .jpg, .jpeg">
    </div>
  </div>
</template>

<script>
import Form from "./enterData/Form";
import CardContainer from "./enterData/CardContainer";
import CustomIcon from "../../../../sharedComponents/CustomIcon";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EnterData",
  components: {
    Form,
    CardContainer,
    CustomIcon
  },
  data() {
    return {
      navigator: false,
      registrationTimeout: null,
      formSrc: "/img/icons/check-form.png",
      cardSrc: "/img/icons/camera_icon.png"
    };
  },
  methods: {
    ...mapActions(["setOption", "updateSrc", "resetProductInfo"]),
    handleFormClick() {
      this.toggleIcon("form");
      this.setOption("form");
    },
    handleFileInputClick() {
      this.toggleIcon("card");
      const input = document.querySelector('input[type="file"]');
      input.addEventListener("input", this.handleFileDisplay);
      if (
        this.getOption === undefined ||
        this.getVisitorData.business_card === null
      ) {
        input.click();
      } else if (this.getOption === "form") {
        this.setOption("photo");
      } else if (this.getOption === "photo") {
        input.click();
      }
    },
    handleFileDisplay() {
      this.setOption("photo");
      const input = document.querySelector('input[type="file"]');
      if (input.files && input.files[0] && this.getOption !== "") {
        const reader = new FileReader();
        reader.onload = e => {
          this.updateSrc(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    toggleIcon(icon) {
      switch (icon) {
        case "form":
          document.querySelector(
            "#options .iconWrapper:nth-child(2) .icon"
          ).style.backgroundColor = "white";
          this.cardSrc = "/img/icons/camera_icon.png";
          document.querySelector("#options .icon").style.backgroundColor =
            "#d6006f";
          this.formSrc = "/img/icons/inverted_check-form.png";
          break;
        case "card":
          document.querySelector("#options .icon").style.backgroundColor =
            "white";
          this.formSrc = "/img/icons/check-form.png";
          document.querySelector(
            "#options .iconWrapper:nth-child(2) .icon"
          ).style.backgroundColor = "#d6006f";
          this.cardSrc = "/img/icons/inverted_camera_icon.png";
      }
    }
  },
  computed: {
    ...mapGetters([
      "getJSON",
      "getOption",
      "getVisitorData",
      "getProductInfo",
      "getTimeout"
    ])
  },
  created() {
    const self = this;
    var test = setInterval(() => {
      if (
        Date.now() -
          Date.parse(self.getProductInfo.reservation.time_of_reservation) >
        this.getTimeout
      ) {
        self.resetProductInfo();
        localStorage.removeItem("productInfo");
      }
      clearInterval(test);
    }, 100);
  },
  mounted() {
    this.setOption("form");
    this.navigator = !!window.navigator.getUserMedia;
    if (localStorage.visitorData) {
      this.visitorData = localStorage.visitorData;
    }
    if (localStorage.visitorCard) {
      this.visitorCard = localStorage.visitorCard;
    }
    const self = this;
    this.registrationTimeout = setTimeout(() => {
      self.resetProductInfo();
      localStorage.removeItem("productInfo");
      self.$modal.show("dialog", {
        title:
          self.getJSON.pageFour !== undefined
            ? self.getJSON.pageFour.timeoutHeader
            : "",
        text:
          self.getJSON.pageFour !== undefined
            ? self.getJSON.pageFour.timeoutMessage
            : ""
      });
    }, this.getTimeout);
  },
  beforeDestroy() {
    clearTimeout(this.registrationTimeout);
  }
};
</script>

<style scoped>
#enterDataWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#formWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80vh;
  width: 90vw;
  border: 2px solid var(--magenta);
  border-radius: 4px;
  background-color: #f8f8f8;
  box-shadow: 5px 5px 5px 5px lightgrey;
}

#formWrapper h2 {
  align-self: center;
  background: var(--magenta);
  text-transform: uppercase;
  font-family: telegrotesknext-regular;
  color: white;
  font-size: 20px;
  font-weight: 900;
  padding: 15px 0px;
  margin-bottom: 5px;
  text-align: center;
  width: 90vw;
}

#options {
  padding-left: 10px;
  display: flex;
  width: 90vw;
  justify-content: center;
  align-content: center;
}

#options:nth-child(2) {
  margin-right: 3vw;
}

input[type="file"] {
  position: absolute;
  right: 1337vh;
}
</style>