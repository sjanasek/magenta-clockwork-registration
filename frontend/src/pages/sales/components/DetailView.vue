<template>
  <div id="detailWrapper">
    <div id="imageBubbles">
      <img
        id="visitorImage"
        :src="getVisitor.visitor_picture_url || '/img/icons/sales_placeholder.png'"
      />
      <div id="bubbles">
        <span
          class="bubble"
        >{{Math.trunc(((new Date()-new Date().getTimezoneOffset()-Date.parse(getVisitor.time_of_registration))/1000)/60)}} min</span>
        <span class="bubble">{{getVisitor.rating}}</span>
      </div>
    </div>
    <div id="visitorData">
      <div class="formRow">
        <FormElement
          class="formElement"
          placeholder="Vorname"
          type="text"
          :formData="{first_name: getVisitor.first_name}"
          v-on:onFormElementKeyup="updateVisitor"
          v-on:validate="''"
        />
        <FormElement
          class="formElement"
          placeholder="Nachname"
          type="text"
          :formData="{last_name: getVisitor.last_name}"
          v-on:onFormElementKeyup="updateVisitor"
          v-on:validate="''"
        />
      </div>
      <div class="formRow">
        <FormElement
          class="formElement"
          placeholder="Firma"
          type="text"
          :formData="{company: getVisitor.company}"
          v-on:onFormElementKeyup="updateVisitor"
          v-on:validate="''"
        />
        <FormElement
          class="formElement"
          placeholder="Position"
          type="text"
          :formData="{job_title: getVisitor.job_title}"
          v-on:onFormElementKeyup="updateVisitor"
          v-on:validate="''"
        />
      </div>
      <div class="formRow">
        <FormElement
          class="formElement"
          placeholder="E-Mail"
          type="email"
          :formData="{email: getVisitor.email}"
          v-on:onFormElementKeyup="updateVisitor"
          v-on:validate="''"
        />
        <FormElement
          class="formElement"
          placeholder="Telefonnr."
          type="number"
          :formData="{phone: getVisitor.phone}"
          v-on:onFormElementKeyup="updateVisitor"
          v-on:validate="''"
        />
      </div>
      <div class="formRow">
        <FormElement
          class="formElement"
          placeholder="Produkt"
          type="text"
          :formData="{product: getProducts[getVisitor.product_type-1] !== undefined ? getProducts[getVisitor.product_type-1].name : ''}"
          v-on:onFormElementKeyup="''"
          v-on:validate="''"
          :readonly="'readonly'"
        />
        <FormElement
          class="formElement"
          placeholder="Social Media"
          type="url"
          :formData="{social_media_url: getVisitor.social_media_url}"
          v-on:onFormElementKeyup="updateVisitor"
          v-on:validate="''"
        />
      </div>
    </div>
    <Dropdown
      v-bind:id="getVisitor.user_hash_id"
      class="dropdown"
      :options="[ { id: 1, name: 'none' },
                  { id: 2, name: 'email' },
                  { id: 3, name: 'phone' },
                  { id: 4, name: 'personal conversation' } 
                ]"
      :placeholder="getVisitor.appointment == 'none' ? 'Termin gewünscht' : getVisitor.appointment"
      @selected="getOption"
    ></Dropdown>
    <div id="pictograms">
      <img class="pictogram" :src="getPictograms[0]['A'+getVisitor.answer_one]" />
      <img class="pictogram" :src="getPictograms[1]['A'+getVisitor.answer_two]" />
      <img class="pictogram" :src="getPictograms[2]['A'+getVisitor.answer_three]" />
    </div>
    <div id="navigation">
      <CustomButton
        :btnName="getVisitor.handled_by_sales == 'done' ? 'Ändern' : 'Abgearbeitet'"
        v-on:buttonClicked="showModal"
      />
      <CustomButton :btnName="'Zurück'" v-on:buttonClicked="handleReturnButton" />
    </div>
    <v-dialog id="confirmDialog" :width="300" />
  </div>
</template>

<script>
import FormElement from "../../../sharedComponents/FormElement";
import CustomButton from "../../../sharedComponents/CustomButton";
import Dropdown from "vue-simple-search-dropdown";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DetailView",
  components: {
    FormElement,
    CustomButton,
    Dropdown
  },
  data() {
    return {
      browserBack: true
    };
  },
  methods: {
    ...mapActions(["updateVisitor", "changeStatus"]),
    handleCTA() {
      this.browserBack = false;
      this.updateVisitor({ handled_by_sales: "done" });
      this.changeStatus(this.getVisitor);
      const tab =
        this.getVisitor.handled_by_sales === "done"
          ? "done"
          : this.getVisitor.rating;
      this.$router.push({
        path: "/sales/list/" + tab
      });
    },
    handleReturnButton() {
      this.browserBack = false;
      let unchangedVisitor = this.getUnchangedVisitor;
      if (unchangedVisitor.handled_by_sales !== "done") {
        unchangedVisitor.handled_by_sales = "not yet";
        this.changeStatus(unchangedVisitor);
      }
      const tab =
        this.getVisitor.handled_by_sales === "done"
          ? "done"
          : this.getVisitor.rating;
      this.$router.push({
        path: "/sales/list/" + tab
      });
    },
    showModal() {
      this.$modal.show("dialog", {
        title: "Bestätigung",
        text: "Bist du dir sicher?",
        buttons: [
          {
            title: "Ja!",
            handler: this.handleCTA
          },
          {
            title: "Nein, zurück.",
            default: true
          }
        ]
      });
    },
    getOption(option) {
      this.updateVisitor({ appointment: option.name });
    }
  },
  computed: {
    ...mapGetters([
      "getVisitor",
      "getUnchangedVisitor",
      "getProducts",
      "getPictograms"
    ])
  },
  mounted() {
    document
      .querySelector(".dropdown-input")
      .setAttribute("readonly", "readonly");
  },
  beforeDestroy() {
    if (this.browserBack) {
      let unchangedVisitor = this.getUnchangedVisitor;
      if (unchangedVisitor.handled_by_sales !== "done") {
        unchangedVisitor.handled_by_sales = "not yet";
        this.changeStatus(unchangedVisitor);
      }
    }
  }
};
</script>

<style scoped>
#detailWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  font-family: "telegrotesknext-regular";
}

#imageBubbles {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  background: var(--magenta);
  padding: 2vh 0;
}

#bubbles {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 20vh;
}

#visitorImage {
  height: 30vh;
  width: 30vh;
  border-radius: 50%;
}

.bubble {
  margin-top: 5px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid darkslategrey;
  width: 70px;
  background: lightgrey;
}

#visitorData {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  background: linear-gradient(180deg, lightgrey, white);
  box-shadow: 0px 0 0px 0px lightgrey;
}

.formRow {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
}

.formElement {
  width: 40vw !important;
}

.dropdown {
  font-size: 1.5em !important;
  border: 1px solid var(--magenta);
  border-radius: 3px;
}

#pictograms {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
  width: 100vw;
}

.pictogram {
  height: 70px;
  width: 70px;
  padding: 10px;
  border-radius: 5px;
  background: var(--magenta);
}

#navigation {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
}

#navigation * {
  text-align: center;
  height: 10vh;
  width: 50vw;
}
</style>
