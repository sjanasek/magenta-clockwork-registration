<template>
  <div id="answerBox">
    <div class="rowOne">
      <CustomButton
        v-on:buttonClicked="emit(0)"
        class="answerButton columnOne"
        :btnName="$attrs.answers[0]"
      />
      <CustomButton v-on:buttonClicked="emit(1)" class="answerButton" :btnName="$attrs.answers[1]"/>
    </div>
    <div class="rowTwo">
      <CustomButton
        v-on:buttonClicked="emit(2)"
        class="answerButton columnOne"
        :btnName="$attrs.answers[2]"
      />
      <CustomButton v-on:buttonClicked="emit(3)" class="answerButton" :btnName="$attrs.answers[3]"/>
    </div>
  </div>
</template>

<script>
import CustomButton from "../../../../../sharedComponents/CustomButton.vue";

export default {
  name: "AnswerBox",
  props: {
    answer: Array
  },
  components: {
    CustomButton
  },
  methods: {
    emit(answerIndex) {
      this.$emit("buttonClicked", answerIndex);
    }
  }
};
</script>

<style scoped>
#answerBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 85vw;
}

.rowOne {
  margin-bottom: 3vw;
}

.rowOne, .rowTwo {
  display: flex;
}

.answerButton {
  border-radius: 20px;
  height: 13vh;
  width: 40vw;
  box-shadow: 3px 3px 3px grey;
  font-size: 0.75em;
}

.answerButton p {
  max-width: 20px;
}

.columnOne {
  margin-right: 3vw;
}

@media only screen and (min-device-width: 500px) {
  .answerButton {
    height: 100px;
    width: 190px;
  }
}
</style>
