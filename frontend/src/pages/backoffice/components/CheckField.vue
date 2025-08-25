<template>
  <div id="checkField">
    <CustomRadioButton class="radioBtn" :radioName="'hot'" v-on:radioClicked="radioClicked('hot')"/>
    <CustomRadioButton
      class="radioBtn"
      :radioName="'warm'"
      v-on:radioClicked="radioClicked('warm')"
    />
    <CustomRadioButton
      class="radioBtn"
      :radioName="'cold'"
      v-on:radioClicked="radioClicked('cold')"
    />
    <CustomRadioButton
      class="radioBtn"
      :radioName="'unknown'"
      v-on:radioClicked="radioClicked('unknown')"
    />
    <CustomRadioButton
      class="radioBtn"
      :radioName="'fake'"
      v-on:radioClicked="radioClicked('fake')"
    />
  </div>
</template>

<script>
import CustomRadioButton from "../../../sharedComponents/CustomRadioButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CheckField",
  components: { CustomRadioButton },
  methods: {
    ...mapActions(["rateVisitor", "togglePopup"]),
    radioClicked(rating) {
      if (this.getPopup.message === "Wähle ein Ranking aus!") {
        this.togglePopup(false, "");
        this.rateVisitor(rating);
      } else {
        this.rateVisitor(rating);
      }
    }
  },
  computed: {
    ...mapGetters(["getPopup"])
  }
};
</script>

<style>
#checkField {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 2px solid var(--magenta);
  border-radius: 4px;
  background-color: #f8f8f8;
  box-shadow: 5px 5px 5px 5px lightgrey;
  padding-top: 2vh;
}

.radioBtn {
  margin-left: 1.5vw;
  padding-left: 2vw;
}
</style>
