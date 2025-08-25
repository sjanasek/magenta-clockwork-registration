<template>
  <div id="visitorForm">
    <span id="formError">{{getJSON.pageFour !== undefined ? getJSON.pageFour.formError : 'error'}}</span>
    <div class="formRow">
      <div class="formWithError">
        <FormElement
          class="formElement"
          :placeholder="getJSON.pageFour !== undefined ? getJSON.pageFour.firstName : ''"
          type="text"
          :formData="{first_name: getVisitorData.first_name}"
          v-on:onFormElementKeyup="updateVisitorData"
          v-on:validate="validateLength($event,2)"
        />
        <transition name="fade" mode="out-in">
          <span
            :key="firstNameError"
            id="firstNameError"
            :style="{visibility: firstNameError ? 'visible' : 'hidden'}"
          >{{getJSON.pageFour !== undefined ? getJSON.pageFour.firstNameError : 'error'}}</span>
        </transition>
      </div>
      <div class="formWithError">
        <FormElement
          class="formElement"
          :placeholder="getJSON.pageFour !== undefined ? getJSON.pageFour.lastName : ''"
          type="text"
          :formData="{last_name: getVisitorData.last_name}"
          v-on:onFormElementKeyup="updateVisitorData"
          v-on:validate="validateLength($event,2)"
        />
        <transition>
          <span
            :key="lastNameError"
            id="lastNameError"
            :style="{visibility: lastNameError ? 'visible' : 'hidden'}"
          >{{getJSON.pageFour !== undefined ? getJSON.pageFour.lastNameError : 'error'}}</span>
        </transition>
      </div>
    </div>
    <div class="formRow">
      <div class="formWithError">
        <FormElement
          class="formElement"
          :placeholder="getJSON.pageFour !== undefined ? getJSON.pageFour.company : ''"
          type="text"
          :formData="{company: getVisitorData.company}"
          v-on:onFormElementKeyup="updateVisitorData"
          v-on:validate="validateLength($event,3)"
        />
        <transition>
          <span
            :key="companyError"
            id="companyError"
            :style="{visibility: companyError ? 'visible' : 'hidden'}"
          >{{getJSON.pageFour !== undefined ? getJSON.pageFour.companyError : 'error'}}</span>
        </transition>
      </div>
      <div class="formWithError">
        <FormElement
          class="formElement"
          :placeholder="getJSON.pageFour !== undefined ? getJSON.pageFour.jobTitle : ''"
          type="text"
          :formData="{job_title: getVisitorData.job_title}"
          v-on:onFormElementKeyup="updateVisitorData"
          v-on:validate="validateLength($event,3)"
        />
        <transition>
          <span
            :key="jobTitleError"
            id="jobTitleError"
            :style="{visibility: jobTitleError ? 'visible' : 'hidden'}"
          >{{getJSON.pageFour !== undefined ? getJSON.pageFour.jobTitleError : 'error'}}</span>
        </transition>
      </div>
    </div>
    <div class="formRow">
      <div class="formWithError">
        <FormElement
          class="formElement"
          :placeholder="getJSON.pageFour !== undefined ? getJSON.pageFour.phone : ''"
          type="text"
          :formData="{phone: getVisitorData.phone}"
          v-on:onFormElementKeyup="updateVisitorData"
        />
        <span id="placeholderError" :style="{visibility: 'hidden'}">placeholder</span>
      </div>
      <div class="formWithError">
        <FormElement
          class="formElement"
          :placeholder="getJSON.pageFour !== undefined ? getJSON.pageFour.email : ''"
          type="text"
          :formData="{mail: getVisitorData.mail}"
          v-on:onFormElementKeyup="updateVisitorData"
        />
        <span id="placeholderError" :style="{visibility: 'hidden'}">placeholder</span>
      </div>
    </div>

    <Checkbox
      id="acceptDataUse"
      :label="getJSON.pageFour !== undefined ? getJSON.pageFour.checkboxDataStorage : ''"
    />

    <CustomButton
      id="order"
      :btnName="getJSON.pageFour !== undefined ? getJSON.pageFour.buttonConfirmOrder : ''"
      @buttonClicked="handleVisitorData"
    />
  </div>
</template>

<script>
import FormElement from "../../../../../sharedComponents/FormElement.vue";
import CustomButton from "../../../../../sharedComponents/CustomButton.vue";
import Checkbox from "../../../../../sharedComponents/CustomCheckbox";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Form",
  components: {
    FormElement,
    CustomButton,
    Checkbox
  },
  data() {
    return {
      firstNameError: false,
      lastNameError: false,
      companyError: false,
      jobTitleError: false,
      error: true
    };
  },
  methods: {
    ...mapActions(["updateVisitorData", "sendVisitorData", "setStatus"]),
    validateLength(string, len) {
      const test = string[Object.keys(string)];
      if (test.length < len) {
        switch (event.target.name) {
          case "first_name":
            this.firstNameError = true;
            break;
          case "last_name":
            this.lastNameError = true;
            break;
          case "company":
            this.companyError = true;
            break;
          case "job_title":
            this.jobTitleError = true;
        }
      } else {
        switch (event.target.name) {
          case "first_name":
            this.firstNameError = false;
            break;
          case "last_name":
            this.lastNameError = false;
            break;
          case "company":
            this.companyError = false;
            break;
          case "job_title":
            this.jobTitleError = false;
        }
      }
    },
    handleVisitorData() {
      if (
        document.querySelector("#checkbox").checked &&
        !this.firstNameError &&
        !this.lastNameError &&
        !this.companyError &&
        !this.jobTitleError &&
        this.getVisitorData.first_name.trim() !== "" &&
        this.getVisitorData.last_name.trim() !== "" &&
        this.getVisitorData.company.trim() !== "" &&
        this.getVisitorData.job_title.trim() !== ""
      ) {
        document.querySelector('#formError').style.visibility = 'hidden';
        this.sendVisitorData({ visitor: this.getVisitorData, img: undefined });
        localStorage.status = 0;
        this.setStatus(0);
      } else {
        document.querySelector('#formError').style.visibility = 'visible';
      }
    }
  },
  computed: {
    ...mapGetters(["getVisitorData", "getJSON"])
  }
};
</script>

<style scoped>
#visitorForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh;
}

.formRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80vw;
}

.formWithError {
  display: flex;
  flex-direction: column;
}

.formElement {
  width: 35vw !important;
}

#acceptDataUse {
  margin-top: 2vh;
  width: 90vw;
}

#order {
  margin-top: 3vh;
  width: 50vw;
  height: 6vh;
}

[id*="Error"] {
  font-family: "telegrotesknext-regular";
  border-radius: 5%;
  background-color: rgba(221, 0, 0, 0.2);
  color: red;
  font-weight: bold;
  font-size: 0.8em;
  width: 35vw;
  text-align: center;
}

#formError {
  visibility: hidden;
  width: 80vw;
  font-size: 1.0em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
