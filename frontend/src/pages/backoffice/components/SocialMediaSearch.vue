<template>
  <div id="socialmediaSearch">
    <div id="socialMediaHeader">Social Media</div>

    <input
      type="text"
      class="inputSM"
      v-bind:placeholder="placeholderLinkedIn"
      v-model="$attrs.visitor"
    >
    <CustomButton
      class="searchButton"
      :btnName="'Auf LinkedIn Suchen'"
      v-on:buttonClicked="searchLinkedIn($attrs.visitor)"
    />
    <input
      type="text"
      class="inputSM"
      v-bind:placeholder="placeholderXing"
      v-model="$attrs.visitor"
    >
    <CustomButton
      class="searchButton"
      :btnName="'Auf XING Suchen'"
      v-on:buttonClicked="searchXing($attrs.visitor)"
    />
  </div>
</template>

<script>
import CustomButton from "../../../sharedComponents/CustomButton.vue";
export default {
  name: "SocialMediaSearch",
  data() {
    return {
      placeholderLinkedIn: "LinkedIn",
      placeholderXing: "Xing"
    };
  },
  prop: {
    visitor: String
  },
  components: { CustomButton },
  methods: {
    searchLinkedIn(name) {
      if (name.length) {
        const query =
          "https://www.linkedin.com/search/results/all/?keywords=" +
          name +
          "&origin=GLOBAL_SEARCH_HEADER";
        window.open(query, "_blank");
      } else {
        this.placeholderLinkedIn = "Bitte gib einen Namen ein!";
      }
    },
    searchXing(name) {
      if (name.length) {
        const query =
          "https://www.xing.com/search/members?hdr=1&keywords=" + name;
        window.open(query, "_blank");
      } else {
        this.placeholderXing = "Bitte gib einen Namen ein!";
      }
    }
  }
};
</script>

<style>
#socialMediaHeader {
  background: var(--magenta);
  text-transform: uppercase;
  font-family: telegrotesknext-regular;
  color: white;
  font-size: 20px;
  font-weight: 900;
  padding: 20px;
  margin: -3vh -2vw 30px 0vw;
  text-align: center;
  min-width: 30.1vw;
}

#socialMediaSearch {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.searchButton {
  margin-top: 1vh;
  width: 12.5vw;
  height: 8vh;
}

.inputSM {
  display: flex;
  border: 1px solid #a4a4a4;
  border-radius: 0.5vh;
  font-family: "telegrotesknext-regular";
  font-size: 1em;
  margin-top: 1.5vh;
  height: 5vh;
  width: 24.5vw;
  border: 1.1px solid var(--magenta) !important;
  border-radius: 0.5vh;
  font-family: "telegrotesknext-regular";
  font-size: 1.3em !important;
  padding-left: 0.5vw;
}

.inputSM:focus {
  outline: none;
  background: #f5f5f5;
  box-shadow: inset 0 0 0 2px var(--magenta) !important;
}

#linkedin {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#xing {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

@media (max-device-width: 1497px) {
  #socialMediaHeader {
    padding: 20px;
    margin: -3vh -2vw 30px 0vw;
    min-width: 35vw;
  }
}
</style>
