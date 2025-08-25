<template>
  <div class="banner">
    <span class="bannerText">
      {{infoMessage}}
      <a id="detailLink" href @click.prevent.stop="$emit('linkClicked')">{{link}}</a>
    </span>

    <button v-on:click="$emit('buttonClicked')" class="bannerButton">{{button}}</button>
  </div>
</template>

<script>
export default {
  name: "InfoBanner",
  props: {
    infoMessage: String,
    link: String,
    button: String
  }
};
</script>

<style scoped>
.banner {
  position: absolute;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100vw;
  background-color: rgb(42, 49, 58);
  bottom: 0vh;
}

.bannerText {
  color: white;
  padding: 2vw;
  font-family: "telegrotesknext-regular";
  text-align: justify;
}

#detailLink {
  color: lightskyblue;
}

.bannerButton {
  width: 40vw;
  padding: 2vw;
  margin-right: 2vw;
  font-family: "telegrotesknext-regular";
}
</style>
