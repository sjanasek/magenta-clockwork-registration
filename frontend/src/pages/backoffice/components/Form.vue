<template>
  <form action>
    <h2 id="formHeader">Nutzerdaten</h2>
    <FormElement
      class="formElement"
      placeholder="Vorname"
      type="text"
      :formData="{first_name: getVisitor.first_name}"
      v-on:onFormElementKeyup="updateVisitorLocally"
    />
    <FormElement
      class="formElement"
      placeholder="Name"
      type="text"
      :formData="{last_name: getVisitor.last_name}"
      v-on:onFormElementKeyup="updateVisitorLocally"
    />
    <FormElement
      class="formElement"
      placeholder="Firma"
      type="text"
      :formData="{company: getVisitor.company}"
      v-on:onFormElementKeyup="updateVisitorLocally"
    />
    <FormElement
      class="formElement"
      placeholder="Position"
      type="text"
      :formData="{job_title: getVisitor.job_title}"
      v-on:onFormElementKeyup="updateVisitorLocally"
    />
    <FormElement
      class="formElement"
      placeholder="E-Mail Adresse"
      type="email"
      :formData="{email: getVisitor.email}"
      v-on:onFormElementKeyup="updateVisitorLocally"
      v-on:validate="validEmail"
    />
    <FormElement
      class="formElement"
      placeholder="Telefonnummer"
      type="text"
      :formData="{phone: getVisitor.phone}"
      v-on:onFormElementKeyup="updateVisitorLocally"
    />
    <FormElement
      class="formElement"
      type="url"
      placeholder="Social Media URL"
      :formData="{social_media_url: getVisitor.social_media_url}"
      v-on:onFormElementKeyup="updateVisitorLocally"
    />
    <FormElement
      class="formElement"
      type="url"
      placeholder="Profilfoto URL"
      :formData="{visitor_picture_url: getVisitor.visitor_picture_url}"
      v-on:onFormElementKeyup="updateVisitorLocally"
    />
  </form>
</template>

<script>
import FormElement from "../../../sharedComponents/FormElement.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Form",
  components: { FormElement },
  methods: {
    ...mapActions(["updateVisitorLocally", "updateVisitor", "togglePopup"]),
    validEmail(email) {
      if (
        // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email.email
        ) ||
        !email.email.length ||
        email.email === null
      ) {
        this.togglePopup({ bool: false, message: "" });
      } else {
        this.togglePopup({
          bool: true,
          message: "Bitte gib eine valide E-mail an!"
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getVisitor", "getPopup"])
  }
};
</script>

<style>
#formHeader {
  background: var(--magenta);
  text-transform: uppercase;
  font-family: telegrotesknext-regular;
  color: white;
  font-size: 20px;
  font-weight: 900;
  padding: 20px;
  margin: -3vh -2vw 30px -2vw;
  text-align: center;
}

.formElement {
  display: flex;
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
