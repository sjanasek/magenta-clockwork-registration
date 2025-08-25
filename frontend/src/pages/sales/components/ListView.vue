<template>
  <div id="listWrapper" v-touch:swipe="swipeHandler">
    <pull-to :top-load-method="refresh" :topConfig="touchReloadConfig">
      <transition name="fade" mode="out-in">
        <ul id="visitorList" :key="$route.params.tab">
          <transition-group name="list-complete" tag="ul">
            <li
              class="listElement"
              v-for="visitor in getList[tab]"
              :key="`${visitor.user_hash_id}`"
            >
              <div @click="handleDetailView(visitor)" class="visitor">
                <div class="col_1">
                  <img
                    class="visitorPhoto"
                    :src="visitor.visitor_picture_url || '/img/icons/sales_placeholder.png'"
                  />
                  <span
                    class="bubble"
                  >{{Math.trunc(((new Date()-new Date().getTimezoneOffset()-Date.parse(visitor.time_of_registration))/1000)/60)}} min</span>
                </div>
                <div class="col_2">
                  <p class="even">{{visitor.first_name + ' ' + visitor.last_name}}</p>
                  <p class="odd">{{visitor.company}}</p>
                  <p class="even">{{visitor.job_title}}</p>
                  <p
                    class="odd"
                  >{{getProducts[visitor.product_type-1] !== undefined ? getProducts[visitor.product_type-1].name : ''}}</p>
                </div>
              </div>
            </li>
          </transition-group>
        </ul>
      </transition>
      <nav id="tabs">
        <router-link
          class="navLink"
          v-model="getList.hot"
          @change="newVisitor"
          to="/sales/list/hot"
        >Hot{{change ? '+' : ''}} {{toleranceTime('hot') ? '*' : ''}}</router-link>
        <router-link class="navLink" to="/sales/list/warm">Warm {{toleranceTime('warm') ? '*' : ''}}</router-link>
        <router-link class="navLink" to="/sales/list/cold">Cold {{toleranceTime('cold') ? '*' : ''}}</router-link>
        <router-link
          class="navLink"
          to="/sales/list/unknown"
        >Unknown {{toleranceTime('unknown') ? '*' : ''}}</router-link>
        <router-link class="navLink" to="/sales/list/done">Done</router-link>
        <router-view :key="$route.name + ($route.params.tab || tab)"></router-view>
      </nav>
    </pull-to>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PullTo from "vue-pull-to";

export default {
  name: "List",
  components: {
    PullTo
  },
  data() {
    return {
      tab:
        sessionStorage.getItem("tab") ||
        location.pathname.match(/^\/sales\/list\/(hot|warm|cold|unknown|done)$/)
          ? location.pathname.match(
              /^\/sales\/list\/(hot|warm|cold|unknown|done)$/
            )[1]
          : "hot",
      tabs: ["hot", "warm", "cold", "unknown", "done"],
      poll: "",
      change: false,
      touchReloadConfig: {
        pullText: "Fetch visitors!",
        triggerText: "Fetching visitors!",
        loadingText: "Fetching..",
        doneText: "Visitors fetched!",
        failText: "Could not load Visitors!",
        loadedStayTime: 400,
        stayDistance: 50,
        triggerDistance: 70
      }
    };
  },
  methods: {
    ...mapActions(["fetchList", "fetchConfig", "setVisitor", "changeStatus"]),
    handleDetailView(visitor) {
      if (visitor.handled_by_sales !== "done") {
        visitor.handled_by_sales = "in progress";
        this.changeStatus(visitor);
      }
      this.setVisitor(visitor);
      this.$router.push({ path: "/sales/detail/" + visitor.user_hash_id });
    },
    toleranceTime(tab) {
      const bool = this.getList[tab].some(visitor => {
        if (
          visitor &&
          Math.trunc(
            (new Date() -
              new Date().getTimezoneOffset() -
              Date.parse(visitor.time_of_registration)) /
              1000 /
              60
          ) >
            this.getConfig[tab] / 1000 / 60
        ) {
          return true;
        } else {
          return false;
        }
      });
      return bool;
    },
    newVisitor() {
      if (this.tab !== "hot") {
        this.change = true;
      } else {
        this.change = false;
      }
    },
    swipeHandler(event) {
      if (event === "right" && this.tab !== "hot") {
        const nextTab = this.tabs.findIndex(tab => tab === this.tab);
        this.$router.push({ path: "/sales/list/" + this.tabs[nextTab - 1] });
      }
      if (event === "left" && this.tab !== "done") {
        const nextTab = this.tabs.findIndex(tab => tab === this.tab);
        this.$router.push({ path: "/sales/list/" + this.tabs[nextTab + 1] });
      }
    },
    async refresh(loaded) {
      await this.fetchList();
      loaded("done");
    }
  },
  computed: {
    ...mapGetters(["getToken", "getList", "getConfig", "getProducts"])
  },
  created() {
    this.fetchList();
    this.fetchConfig().then(() => {
      this.poll = setInterval(() => {
        this.fetchList();
      }, this.getConfig.pollingInterval);
    });
  },
  beforeDestroy() {
    clearInterval(this.poll);
  },
  watch: {
    "$route.params.tab"(tab) {
      this.fetchList(this.getToken);
      this.tab = tab;
    }
  }
};
</script>

<style scoped>
#listWrapper {
  height: 100vh;
  width: 100vw;
}

#listWrapper .default-text {
  font-family: "telegrotesknext-regular" !important;
  background: var(--magenta);
}

#visitorList {
  display: flex;
  flex-direction: column;
  font-family: "telegrotesknext-regular";
  padding-bottom: 6vh;
}

.visitor {
  display: flex;
  align-items: center;
  margin: 5vw 5vw 0 5vw;
  padding: 5px;
  border-radius: 5px;
  background: var(--magenta);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
}

.visitor:last-of-type {
  margin-bottom: 2vh;
}

.visitorPhoto {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

.col_1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.col_2 {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  background: #fff;
  height: 100px;
  width: 80vw;
  border-radius: 5px;
  margin-left: 10px;
  padding: 5px;
}

.col_2 p {
  color: black !important;
}

.even {
  background: #efefef;
  border-radius: 5px;
  font-size: 1.2em;
}

.odd {
  background: #d1d1d1;
  border-radius: 5px;
  font-size: 1.2em;
}

.odd,
.even {
  min-height: 20px;
}

.bubble {
  margin-top: 5px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid darkslategrey;
  width: 70px;
  background: lightgrey;
}

#tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 7vh;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--magenta);
  opacity: 0.96;
  border-top: 0.1px solid white;
}

.navLink {
  font-family: "telegrotesknext-regular";
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

.navLink:first-child {
  margin-left: 2vw;
}

.navLink:last-of-type {
  margin-right: 2vw;
}

.router-link-active {
  border-bottom: 2px solid white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
