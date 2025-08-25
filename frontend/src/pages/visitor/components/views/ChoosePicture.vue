<template>
  <div>
    <transition
      :name="'slide-right'"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <ViewQuestion v-if="quiz"/>
      <ViewAnswered @changeDirection="$emit('slideLeft')" v-else/>
    </transition>
  </div>
</template>

<script>
import ViewQuestion from "./choosePicture/ViewQuestion";
import ViewAnswered from "./choosePicture/ViewAnswered";
import { mapGetters } from "vuex";
export default {
  name: "ChoosePicture",
  components: {
    ViewAnswered,
    ViewQuestion
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    }
  },
  computed: {
    ...mapGetters(["quiz"])
  }
};
</script>

<style scoped>
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}


.slide-right-enter-active {
  transition-duration: 0.5s;
  transition-property: height, opacity;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>