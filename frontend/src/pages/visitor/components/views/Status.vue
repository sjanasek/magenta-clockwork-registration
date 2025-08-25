<template>
  <div id="statusWrapper">
    <h2>{{getJSON.pageFive.slogan}}</h2>
    <img :src="getFlower">
    <h2>{{getJSON.pageFive.staticStatus}} {{getJSON.pageFive.statuses[getStatus || 0]}}</h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Status",
  data() {
    return {
      polling: null
    };
  },
  methods: {
    ...mapActions(["fetchStatus"]),
    pollStatus() {
      this.polling = setInterval(() => {
        this.fetchStatus(this.getID);
      }, 5000);
    }
  },
  computed: {
    ...mapGetters(["getJSON", "getStatus", "getID", "getFlower"])
  },
  created() {
    this.pollStatus();
  },
  beforeDestroy() {
    clearInterval(this.polling);
  }
};
</script>

<style scoped>
#statusWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

#statusWrapper > * {
  margin-bottom: 13%;
}

#statusWrapper img {
  height: 30vh;
}

#statusWrapper h2 {
  text-align: center;
  font-family: "telegrotesknext-regular";
  max-width: 70vw;
}
</style>
