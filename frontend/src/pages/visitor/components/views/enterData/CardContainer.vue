<template>
  <div id="cardPreview">
    <p>{{cardError ? getJSON.pageFour.cardError : checkboxError ? getJSON.pageFour.cardCheckboxError : getJSON.pageFour.takePictureAgain}}</p>
    <img id="card" :src="src">
    <Checkbox id="cardCheckbox" :label="getJSON.pageFour.checkboxDataStorage"/>
    <CustomButton
      id="orderCTA"
      :btnName="getJSON.pageFour.buttonConfirmOrder"
      @buttonClicked="handleVisitorData"
    />
  </div>
</template>

<script>
import Checkbox from "../../../../../sharedComponents/CustomCheckbox";
import CustomButton from "../../../../../sharedComponents/CustomButton";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CardContainer",
  props: {
    src: String
  },
  components: {
    Checkbox,
    CustomButton
  },
  data() {
    return {
      cardError: false,
      checkboxError: false
    };
  },
  methods: {
    ...mapActions(["sendVisitorData", "setStatus"]),
    handleVisitorData() {
      if (
        document.querySelector("#checkbox").checked &&
        this.getVisitorData.business_card !== ""
      ) {
        this.sendVisitorData({
          visitor: this.getVisitorData,
          img: document.querySelector('input[type="file"]').files[0]
        }).then(err => {
          if (err !== undefined) {
            this.cardError = true;
          }
        });
        this.cardError = false;
        this.checkboxError = false;
      } else if (this.getVisitorData.business_card === "") {
        this.cardError = true;
      } else {
        this.checkboxError = true;
      }
    }
  },
  computed: {
    ...mapGetters(["getJSON", "getVisitorData"])
  }
};
</script>

<style scoped>
#cardPreview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#card {
  height: 150px;
  width: 300px;
  margin-bottom: 2vh;
}

#cardPreview p {
  font-family: telegrotesknext-regular;
  font-size: 13px;
  font-weight: bold;
  color: black;
  text-align: center;
  max-width: 75vw;
  margin-bottom: 2vh;
}

#cardCheckbox {
  margin-bottom: 2vh;
}

#orderCTA {
  width: 50vw;
  height: 10vh;
  margin-bottom: 2vh;
}

@media only screen and (min-device-height: 700px) {
  #card {
    margin-bottom: 4vh;
  }

  #cardPreview p {
    margin-bottom: 4vh;
  }

  #cardCheckbox {
    margin-bottom: 4vh;
  }

  #orderCTA {
    margin-bottom: 8vh;
  }
}

@media only screen and (min-device-width: 600px) {
  #card {
    height: 200px;
    width: 400px;
    margin-bottom: 4vh;
  }
}

@media only screen and (min-device-width: 1200px) {
  #card {
    height: 250px;
    width: 500px;
    margin-bottom: 4vh;
  }
}
</style>
