<template>
  <div id="wrapper">
    <circle-menu id="languagePicker" type="bottom" circle :number="2">
      <img id="languagePickerBtn" :src="'/img/icons/language-icon.png'" type="button" slot="item_btn"/>
      <img
        v-for="(language, index) in getLanguages"
        :key="language"
        :slot="'item_'+index++"
        class="language"
        :src="'/img/icons/'+language+'.png'"
        @click="handleLanguage(language)"
      >
    </circle-menu>
    <transition
      :name="transitionName"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <Status v-if="status || typeof getStatus !== 'boolean'"/>
      <EnterData v-else-if="productDone || getProductInfo.productDone"/>
      <ChooseProduct v-else-if="pictureDone || getPictureInfo.done"/>
      <ChoosePicture @slideLeft="toggleAnimation('slide-left')" v-else-if="showPicture"/>
      <LandingPage v-else/>
    </transition>
    <InfoBanner
      :infoMessage="getJSON.pageOne !== undefined ? getJSON.pageOne.cookieInfo : ''"
      :link="getJSON.pageOne !== undefined ? getJSON.pageOne.cookieInfoDetail : ''"
      :button="getJSON.pageOne !== undefined && getJSON.pageOne.hasOwnProperty('cookieInfo') ? getJSON.pageOne.cookieInfoConfirm : ''"
      v-if="getCookieInfo"
      v-on:linkClicked="showModal"
      v-on:buttonClicked="hideCookieBar"
    />
    <v-dialog id="cookieDialog" :width="300"/>
  </div>
</template>

<script>
import LandingPage from "./views/LandingPage";
import ChoosePicture from "./views/ChoosePicture";
import ChooseProduct from "./views/ChooseProduct";
import EnterData from "./views/EnterData";
import Status from "./views/Status";
import { mapActions, mapGetters } from "vuex";
import CircleMenu from "vue-circle-menu";

import InfoBanner from "../../../sharedComponents/InfoBanner";

export default {
  name: "Content",
  components: {
    LandingPage,
    ChoosePicture,
    ChooseProduct,
    EnterData,
    Status,
    InfoBanner,
    CircleMenu
  },
  data() {
    return {
      pictureDone: false,
      productDone: false,
      status: false,
      transitionName: "slide-right"
    };
  },
  methods: {
    ...mapActions([
      "fetchID",
      "hideCookieBar",
      "deserializeJSON",
      "updateVisitorData",
      "fetchLanguage"
    ]),
    showModal() {
      const self = this;
      this.$modal.show("dialog", {
        title:
          self.getJSON.pageOne !== undefined
            ? self.getJSON.pageOne.detailHeader
            : "",
        text:
          self.getJSON.pageOne !== undefined ? self.getJSON.pageOne.details : ""
      });
    },
    toggleAnimation(direction) {
      this.transitionName = direction;
    },
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
    },
    handleLanguage(language) {
      document.querySelector(".oy-menu-group").classList.remove("open");
      this.fetchLanguage(language);
    }
  },
  computed: {
    ...mapGetters([
      "getID",
      "getJSON",
      "showPicture",
      "getCookieInfo",
      "getJSON",
      "getPictureInfo",
      "getProductInfo",
      "getStatus",
      "getLanguages"
    ])
  },
  mounted() {
    if (!localStorage.user_hash_id) {
      this.fetchID().then(() => {
        localStorage.user_hash_id = this.getID;
        this.updateVisitorData({ user_hash_id: this.getID });
        localStorage.json = JSON.stringify(this.getJSON);
      });
    } else {
      this.deserializeJSON(localStorage.json);
    }
    if (
      localStorage.hasOwnProperty("getPictureInfo") &&
      JSON.parse(localStorage.getPictureInfo).done
    ) {
      this.pictureDone = true;
    }
    if (
      localStorage.hasOwnProperty("productInfo") &&
      JSON.parse(localStorage.productInfo).productDone
    ) {
      this.productDone = true;
    }
    if (localStorage.hasOwnProperty("status")) {
      this.status = localStorage.status;
    }
  }
};
</script>

<style scoped>
* {
  -webkit-backface-visibility: hidden;
}

#wrapper {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
}

#languagePicker {
  position: absolute;
  top: 10px;
  right: 10px;
}

#languagePickerBtn {
  height: 40px;
  width: 40px;
}

.language {
  z-index: 1337;
  width: 40px;
  height: 40px;
}

.slide-left-leave-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter-active,
.slide-right-enter-active {
  transition-duration: 0.5s;
  transition-property: height, opacity;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

#cookieDialog {
  font-family: "telegrotesknext-regular";
  z-index: 1337;
}

@media only screen and (min-device-height: 700px) {
  #languagePicker {
    position: absolute;
    top: 15px;
    right: 10px;
  }
}

@media only screen and (min-device-width: 668px) {
  #languagePicker {
    position: absolute;
    top: 30px;
    right: 10px;
  }
}
</style>

