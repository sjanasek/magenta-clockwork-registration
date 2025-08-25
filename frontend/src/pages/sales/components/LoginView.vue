<template>
  <div class="login">
    <form id="salesLogin">
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
        v-on:buttonClicked="handleLogin(credentials)"
      />
    </form>
    <v-dialog id="errorDialog" :width="300"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CustomButton from "../../../sharedComponents/CustomButton.vue";

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
  components: { CustomButton },
  methods: {
    ...mapActions(["fetchToken"]),
    handleLogin(credentials) {
      const self = this;
      this.fetchToken(credentials)
        .then(() => {
          if (self.getLoggedIn) {
            sessionStorage.setItem('token', this.getToken);
            self.$router.push({path: '/sales/list'});
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.warn(err);
          this.showModal();
        });
    },
    showModal() {
      this.$modal.show("dialog", {
        title: "Wups",
        text: "Login nicht erfolgreich!"
      });
    }
  },
  computed: {
    ...mapGetters(["getToken", "getLoggedIn"])
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#salesLogin .loginInput {
  margin-top: 1.5vh;
  height: 5vh;
  width: 50vw;
  border: 1.1px solid var(--magenta) !important;
  border-radius: 0.5vh;
  font-family: "telegrotesknext-regular";
  font-size: 1.3em !important;
  padding-left: 0.5vw;
}

#salesLogin .loginInput:focus {
  outline: none;
  background: #f5f5f5;
  box-shadow: inset 0 0 0 2px var(--magenta) !important;
}

#loginButton {
  margin-top: 2vh;
  width: 50vw;
  height: 8vh;
  text-align: center;
}
</style>
