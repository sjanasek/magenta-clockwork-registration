<template>
  <ul id="infoList">
    <transition-group name="list" tag="p">
      <li
        id="listElement"
        v-for="visitor in getList"
        v-bind:key="visitor.user_hash_id"
        v-on:click="setDetail(visitor)"
      >
        <p>
          <b>Vorname:</b>
          {{ visitor.first_name.length > 15 ? visitor.first_name.substring(0,15) + "..." : visitor.first_name.padEnd(13, " ") }}
        </p>
        <p>
          <b>&emsp;Nachname:</b>
          {{ visitor.last_name.length > 15 ? visitor.last_name.substring(0,15) + "..." : visitor.last_name.padEnd(13, " ") }}
        </p>
        <p>
          <b>&emsp;Firma:</b>
          {{ visitor.company.length > 15 ? visitor.company.substring(0,15) + "..." : visitor.company.padEnd(13, " ") }}
        </p>
        <p>
          <b>&emsp;Job:</b>
          {{ visitor.job_title.length > 15 ? visitor.job_title.substring(0,15) + "..." : visitor.job_title.padEnd(13, " ") }}
        </p>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "List",
  methods: {
    ...mapActions(["fetchList", "setDetail"])
  },
  computed: mapGetters(["getList"])
};
</script>

<style scoped>
@font-face {
  font-family: telegrotesknext-regular;
  src: url(../../../../public/fonts/Webfonts/telegrotesknext-regular.woff);
}

#infoList {
  display: flex;
  flex-direction: column;
}

#listElement {
  display: flex;
  color: black;
  font-family: "telegrotesknext-regular";
  text-align: left;
  font-size: 1rem;
  border-radius: 25px;
  margin: 2.5vh 0 0 1vh;
  border: 0.2vh solid var(--magenta);
  padding: 0.5vh 0 0.5vh 0;
  width: 70vw;
}

#listElement:hover {
  background-color: var(--magenta);
  cursor: pointer;
}

#listElement:hover p {
  color: white;
}

#listElement p {
  color: black;
  font-family: "telegrotesknext-regular";
  text-align: left;
  font-size: 1.1rem;
  flex-grow: 1;
  flex-basis: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
</style>