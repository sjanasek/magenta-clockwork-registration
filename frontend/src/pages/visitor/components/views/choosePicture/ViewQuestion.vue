<template>
  <div id="viewQuestion">
    <div id="progressBar">
      <div
        :class="!index ? 'fillOut' : ''"
        :id="'progressBubble_'+index"
        v-for="(question, index) in getJSON.pageTwo.questions"
        v-bind:key="question.question"
      ></div>
    </div>
    <QuestionBox
      v-for="(question, index) in getJSON.pageTwo.questions"
      v-bind:key="question.question"
      :class="index == questionIndex ? index % 2 ? 'showCard card-question' : 'showCard card-answer' : index % 2 ? 'hideCard card-question' : 'hideCard card-answer'"
      :id="'question_'+ index"
      :question="getJSON.pageTwo.questions[index].question"
      :tooltip="getJSON.pageTwo.tooltip"
    />
    <AnswerBox
      :answers="getJSON.pageTwo.questions[questionIndex].answers"
      v-on:buttonClicked="handleAnswer"
    />
  </div>
</template>

<script>
import QuestionBox from "./QuestionBox";
import AnswerBox from "./AnswerBox";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ViewQuestion",
  data() {
    return {
      questionIndex: 0,
      pictureInfo: { questions: {} }
    };
  },
  components: {
    QuestionBox,
    AnswerBox,
  },
  methods: {
    ...mapActions(["toggleQuiz", "setQuestions", "fetchFlower"]),
    handleAnswer(answerIndex) {
      Object.assign(this.pictureInfo.questions, {
        [this.questionIndex]: {
          question: this.getJSON.pageTwo.questions[this.questionIndex].question
        }
      });
      Object.assign(this.pictureInfo.questions[this.questionIndex], {
        answer: answerIndex
      });
      if (this.questionIndex === this.getJSON.pageTwo.questions.length - 1) {
        this.setQuestions(this.pictureInfo.questions);
        this.questionIndex = 0;
        this.fetchFlower(this.pictureInfo.questions);
        this.toggleQuiz(false);
      } else {
        this.questionIndex++;
      }
    }
  },
  computed: {
    ...mapGetters(["getJSON"])
  },
  beforeDestroy() {
    document.querySelector(".tooltip").style.display = "none";
  },
  watch: {
    questionIndex: index => {
      document
        .querySelector("#progressBubble_" + index)
        .classList.add("fillOut");

      const prevIndex = index - 1;

      if (document.querySelectorAll("#question_" + index).length) {
        document
          .querySelector("#question_" + prevIndex)
          .classList.remove("showCard");
        document
          .querySelector("#question_" + prevIndex)
          .classList.add("hideCard");
        document.querySelector("#question_" + index).classList.add("showCard");
      }
    }
  }
};
</script>

<style scoped>
#viewQuestion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "telegrotesknext-regular";
}

#questionHeader {
  margin-bottom: 3vh;
  font-family: "telegrotesknext-regular";
  font-size: 1.7em;
}

#progressBar {
  display: flex;
  width: 60vw;
  justify-content: space-evenly;
  margin-bottom: 2vw;
}

[id^="progressBubble_"] {
  height: 5vh;
  width: 10vw;
  border: 2px solid #716a6e;
  border-radius: 25%;
  background-color: white;
  box-shadow: 0 0 5px var(--magenta);
}

.fillOut {
  background-color: var(--magenta);
  outline: none;
  border-color: var(--magenta);
  box-shadow: 0 0 9px var(--magenta);
  transition: opacity 2s;
}

.hideCard {
  display: none;
  position: relative;
}

.showCard {
  display: flex;
}

.flip-enter-active {
  transition: all 0.4s ease;
}

.flip-leave-active {
  display: none;
}

.flip-enter,
.flip-leave {
  transform: rotateY(180deg);
  opacity: 0;
}

@media only screen and (min-device-width: 630px) {
  [id^="progressBubble_"] {
    height: 35px;
    width: 70px;
    border: 2px solid #716a6e;
    border-radius: 12px;
  }

  #questionTooltip {
    right: 40px;
    top: 40px;
  }
}

@media only screen and (min-device-height: 700px) and (min-device-width: 668px) {
  #questionTooltip {
    top: 50px;
  }
}

@media only screen and (min-device-height: 800px) and (min-device-width: 668px) {
  #questionTooltip {
    top: 55px;
  }
}

@media only screen and (min-device-height: 850px) and (min-device-width: 668px) {
  #questionTooltip {
    top: 60px;
  }
}

@media only screen and (min-device-width: 900px) {
  #progressBar {
    width: 580px;
    /* 60vw; */
    justify-content: space-evenly;
  }
}
</style>
