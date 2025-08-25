<template>
  <div id="listView">
    <InfoList/>
    <div id="BusinessCards">
      <BusinessCard
        class="businessCard"
        v-for="card in getBusinessCards"
        v-bind:key="card.user_hash_id"
        :card="card"
        v-on:cardClicked="setDetail(card)"
      />
      <CustomButton id="updateButton" :btnName="'Aktualisieren'" v-on:buttonClicked="fetchList()"/>
    </div>
  </div>
</template>

<script>
import CustomButton from "../../../sharedComponents/CustomButton.vue";
import InfoList from "./InfoList.vue";
import BusinessCard from "./BusinessCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ListView",
  components: {
    InfoList,
    BusinessCard,
    CustomButton
  },
  methods: {
    ...mapActions(["fetchList", "setDetail"])
  },
  created() {
    history.pushState( { 
      list: true
    }, null, "/backoffice/list");
    this.fetchList();
  },
  computed: {
    ...mapGetters({
      getBusinessCards: "getBusinessCards"
    })
  }
};
</script>

<style scope>
#listView {
  display: flex;
  flex-direction: row;
}

#BusinessCards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding-left: 2vw;
}

.businessCard {
  margin-top: 2.5vh;
  margin-bottom: 1vh;
  margin-right: 2vw;
}

#updateButton {
  width: 22.5vw;
  bottom: 0px;
  right: 0px;
  position: fixed;
  margin-right: 2.5vw;
  margin-bottom: 4vh;
}
</style>