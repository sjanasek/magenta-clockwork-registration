<template>
  <div class="login">
    <transition name="fade" v-leave v-enter>
      <Popup v-if="getPopup.bool"/>
    </transition>
    <form action>
      <input class="loginInput" type="text" placeholder="Username" v-model="credentials.user">
      <input
        class="loginInput"
        type="password"
        placeholder="Password"
        v-model="credentials.password"
      >
      <CustomButton
        id="loginButton"
        :btnName="'Login'"
        v-on:buttonClicked="fetchToken(credentials)"
      />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CustomButton from "../../../sharedComponents/CustomButton.vue";
import Popup from "../../../sharedComponents/Popup.vue";

export default {
  name: "Login",
  data() {
    return {
      credentials: {
        user: "",
        password: ""
      }
    };
  },
  components: { CustomButton, Popup },
  methods: {
    ...mapActions(["fetchToken"])
  },
  computed: {
    ...mapGetters(["getToken", "getPopup"])
  },
  mounted() {
    history.pushState(
      {
        loggedIn: true
      },
      null,
      "/backoffice"
    );
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 27vh;
}

.loginInput {
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

input.loginInput:focus {
  outline: none;
  background: #f5f5f5;
  box-shadow: inset 0 0 0 2px var(--magenta) !important;
}

#loginButton {
  margin-top: 4.5vh;
  width: 25vw;
  font-size: 1em;
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
