 <template>
  <div>
    <div class="bigSquare">
      <div class="stripe"></div>
      <img src="/img/logo/LOGO2013.png" class="logo">
      <Tooltip id="questionTooltip" :message="tooltip"/>
    </div>
    <div id="question">
      <p>{{ question }}</p>
    </div>
  </div>
</template>

<script>
import Tooltip from "../../../../../sharedComponents/Tooltip";
export default {
  name: "QuestionBox",
  components: { Tooltip },
  props: {
    question: String,
    tooltip: String
  }
};
</script>

<style scoped>
.bigSquare {
  height: 30vh;
  width: 80vw;
  background-color: rgb(247, 235, 241);
  overflow: hidden;
  position: relative;
  box-shadow: 5px 5px 5px grey;
  font-family: "telegrotesknext-regular";
  margin-bottom: 5vw;
}

#questionTooltip {
  position: absolute;
  top: 5px;
  right: 2px;
}

.stripe {
  background-color: rgb(225, 0, 117);
  height: 60vh;
  width: 7vw;
  transform: rotate(45deg);
  top: -60%;
  right: 13vw;
  position: relative;
}

#question {
  position: absolute;
  top: 40vh;
  left: 15vw;
  right: 15vw;
  text-align: center;
  z-index: 1337;
}

#question p {
  font-size: 1.5em;
  color: black;
}

.logo {
  width: 30vw;
  left: 48vw;
  position: absolute;
  bottom: 0px;
  right: 0px;
}

@media only screen and (min-device-width: 630px) and (min-device-height: 630px) {
  .bigSquare {
    height: 250px;
    width: 400px;
    margin-bottom: 30px;
  }

  .stripe {
    height: 60vh;
    width: 35px;
    top: -35%;
    right: 13vw;
  }

  .logo {
    width: 160px;
    left: 55%;
  }
}

@media only screen and (min-device-width: 800px) {
  .stripe {
    height: 50vw;
  }
}

@media only screen and (min-device-width: 1000px) {
  .stripe {
    height: 60vw;
    top: -55%;
  }
}

@media only screen and (min-device-width: 1200px) {
  .stripe {
    height: 55vw;
    top: -55%;
  }
}

@media only screen and (min-device-width: 1500px) {
  .stripe {
    height: 50vw;
    top: -55%;
  }
}

@media only screen and (min-device-width: 1700px) {
  .stripe {
    height: 44.5vw;
    top: -55%;
  }
}
</style>
 