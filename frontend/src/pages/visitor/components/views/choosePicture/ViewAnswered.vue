<template>
  <div id="afterQuiz">
    <h2>{{getJSON.pageTwo.flowerHeader}}</h2>
    <img id="visitorFlower" v-bind:src="getFlower">
    <div class="buttonWrapper">
      <CustomButton v-on:buttonClicked="toggle" :btnName="getJSON.pageTwo.buttonRepeatQuiz"/>
      <CustomButton v-on:buttonClicked="setPictureInfo" :btnName="getJSON.pageTwo.buttonNext"/>
    </div>
  </div>
</template>

<script>
import CustomButton from "../../../../../sharedComponents/CustomButton";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ViewAnswered",
  components: {
    CustomButton
  },
  methods: {
    ...mapActions(["toggleQuiz", "toggleDone", "updateVisitorData"]),
    setPictureInfo() {
      this.toggleDone();
      localStorage.getPictureInfo = JSON.stringify(this.getPictureInfo);
      this.updateVisitorData({
        answer_one: this.getPictureInfo.questions[0].answer
      });
      this.updateVisitorData({
        answer_two: this.getPictureInfo.questions[1].answer
      });
      this.updateVisitorData({
        answer_three: this.getPictureInfo.questions[2].answer
      });
    },
    toggle() {
      this.$emit("changeDirection");
      this.toggleQuiz(true);
    }
  },
  computed: {
    ...mapGetters(["getJSON", "getFlower", "getPictureInfo"])
  }
};
</script>

<style scoped>
#afterQuiz {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#afterQuiz > * {
  margin-top: 10vh;
}

#afterQuiz h2 {
  font-family: "telegrotesknext-regular";
  font-size: 2em;
}

#visitorFlower {
  height: 30vh;
}

.buttonWrapper {
  width: 70vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.buttonWrapper button {
  height: 8vh;
  width: 30vw;
}
</style>
