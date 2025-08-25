<template>
  <div class="landingpage">
    <img id="spiro_visitor" src="/img/flowers/test.png">
    <header>{{getJSON.pageOne !== undefined ? getJSON.pageOne.slogan : ''}}</header>
    <span id="test" @click="showPicture(true)" >{{getJSON.pageOne !== undefined ? getJSON.pageOne.buttonStart : ''}}</span>
    <img id="landingLogo" src="/img/logo/T_Logo_3c_n_bg.png">
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LandingPage",
  data: () => {
    return {
      loaded: false
    };
  },
  methods: {
    ...mapActions(["showPicture"])
  },
  computed: {
    ...mapGetters(["getJSON"])
  },
  mounted() {
    this.loaded = true;
    document.querySelector("body").style.backgroundColor = "#d6006f";
    document.querySelector(".header").style.display = "none";
  },
  beforeDestroy() {
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
      document.querySelector(".header").style.display = "block";
    }, 500);
  }
};
</script>

<style scoped>
.landingpage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  text-align: center;
  color: white;
  font-family: "telegrotesknext-regular";
  font-size: 2em;
  margin-bottom: 5vh;
}

#spiro_visitor {
  max-height: 35vh;
  max-width: 70vw;
  display: block;
  margin-bottom: 6vh;
  border-radius: 5%;
}

#start {
  height: 10vh;
  width: 45vw;
  margin-bottom: 5vh;
  background-color: white;
  color: var(--magenta);
  font-weight: bolder;
}

#landingLogo {
  height: 10vh;
}

.fade-enter-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}

#start:hover {
  opacity: 0.8;
}

#test {
  background: white;
  color: var(--magenta);
  border: none;
  position: relative;
  height: 60px;
  width: 100vw;
  font-size: 1.6em;
  padding: 0 2em;
  cursor: pointer;
  transition: 800ms ease all;
  outline: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
#test:hover {
  background: var(--magenta);
  color: white;
}
#test:before,
#test:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: white;
  transition: 400ms ease all;
}
#test:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
#test:hover:before,
#test:hover:after {
  width: 100%;
  transition: 800ms ease all;
}
</style>