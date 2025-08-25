<template>
  <div id="content">
    <transition name="fade" mode="out-in">
      <Login v-if="!getState.loggedIn"/>
      <Details v-else-if="getState.detail"/>
      <ListView v-else/>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Login from "./Login.vue";
import ListView from "./ListView.vue";
import Details from "./Details.vue";

export default {
  name: "Content",
  computed: mapGetters(["getState", "getList", "getBusinessCards"]),
  components: {
    Login,
    ListView,
    Details
  },
  methods: {
    ...mapActions(["fetchList", "setDetail", "logout"]),
  },
  created() {
    const self = this;
    window.onpopstate = function(event) {
      if (event.state !== null && event.state.list) {
        self.fetchList();
      } else if (event.state.details) {
        const checkList = [...self.getBusinessCards, ...self.getList]
        var unchangedVisitor = false;
        for (let visitor of checkList) {
          if (event.state.visitor.user_hash_id === visitor.user_hash_id) {
            unchangedVisitor = true;
            break;
          }
        }
        if (unchangedVisitor) {
          self.setDetail(event.state.visitor);
        } else {
          self.fetchList();
          location.pathname = "/backoffice/list";
        }
      } else {
        self.logout();
      }
    };
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
