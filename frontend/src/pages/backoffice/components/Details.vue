<template>
  <div id="details">
    <transition name="fade" v-leave v-enter>
      <Popup v-if="getPopup.bool"/>
    </transition>
    <Form id="form"/>
    <div id="columnWrapper">
      <SocialMediaSearch
        :visitor="getVisitor.first_name + ' ' + getVisitor.last_name"
        id="socialMediaSearch"
      />
      <CheckField/>
      <CustomButton
        id="sendButton"
        :btnName="'Absenden'"
        v-on:buttonClicked="buttonClicked(getVisitor)"
      />
    </div>
    <BusinessCard id="businessCard" :card="getVisitor" v-if="getVisitor.business_card !== null"/>
    <CustomButton id="goBackButton" :btnName="'Zurück'" v-on:buttonClicked="goBack"/>
  </div>
</template>

<script>
import Form from "./Form.vue";
import BusinessCard from "./BusinessCard.vue";
import SocialMediaSearch from "./SocialMediaSearch.vue";
import CheckField from "./CheckField";
import CustomButton from "../../../sharedComponents/CustomButton.vue";
import Popup from "../../../sharedComponents/Popup.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Details",
  methods: {
    ...mapActions([
      "updateVisitorLocally",
      "updateVisitor",
      "fetchList",
      "togglePopup"
    ]),
    buttonClicked(visitor) {
      if (visitor.rating !== "not rated yet" && !this.getPopup.bool) {
        this.updateVisitor(visitor);
      } else if (!this.getPopup.bool) {
        this.togglePopup({ bool: true, message: "Wähle ein Ranking aus!" });
      }
    },
    goBack() {
      this.togglePopup({ bool: false, message: "" });
      this.fetchList();
    }
  },
  components: {
    Form,
    BusinessCard,
    SocialMediaSearch,
    CustomButton,
    CheckField,
    Popup
  },
  computed: {
    ...mapGetters(["getVisitor", "getPopup"])
  },
  beforeDestroy() {
    const visitor = this.getVisitor;
    history.pushState( { 
      details: true,
      visitor: visitor
    }, null, "/backoffice/details");
  },
};
</script>

<style>
#details {
  display: flex;
  flex-direction: row;
  overflow: hidden !important;
}

#form {
  max-height: 62vh;
  margin: 2.5vh 0vw 0vh 2vw;
  padding: 3vh 2vw 4vh 2vw;
  border: 2px solid var(--magenta);
  border-radius: 4px;
  background-color: #f8f8f8;
  box-shadow: 5px 5px 5px 5px lightgrey;
}

#columnWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  max-height: 70vh;
  margin: 0vh 0vw 0vh 2vw;
}

#socialMediaSearch {
  padding: 3vh 2vw 4vh 0vw;
  border: 2px solid var(--magenta);
  border-radius: 4px;
  background-color: #f8f8f8;
  box-shadow: 5px 5px 5px 5px lightgrey;
  min-width: 30.1vw;
}

#businessCard {
  min-width: 30vw;
  height: 42vh;
  border-radius: 8px;
  border: 2.5px solid white;
  margin: 2vh 1vw 0vh 1.55vw;
}

#goBackButton {
  width: 12.5vw;
  bottom: 0px;
  right: 2vw;
  position: absolute;
  margin-bottom: 4vh;
}

#sendButton {
  min-height: 7vh;
  margin-bottom: -3vh;
  width: inherit;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>