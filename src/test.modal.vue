<script setup>
import { useMeetingListStore } from "@/views/apps/meeting/useMeetingListStore";
import axios from "@axios";
import * as validate from "@validators";
import Swal from "sweetalert2";
import { useToast } from "vue-toast-notification";

const $toast = useToast();
const { t } = useI18n();
const MeetingListStore = useMeetingListStore();
const route = useRoute();
const router = useRouter();

const start = ref("");
const end = ref("");
const selectedDoctor = ref("");
const selectedPatient = ref("");
const date = ref("");
const emailReminder = ref("");
const textReminder = ref("");
const followUpMessage = ref("");

const Create = () => {
  axios
    .post("/meeting/create", {
      start: this.start,
      end: this.end,
      selectedDoctor: this.selectedDoctor,
      selectedPatient: this.selectedPatient,
      date: this.date,
      emailReminder: this.emailReminder,
      textReminder: this.textReminder,
      followUpMessage: this.followUpMessage,
    })
    .then((r) => {
      const { message, data, status_code } = r.data;
      if (status_code == 200)
        $toast.success(message, { position: "top-right" });
      fetchMeetings();

      //router.go(0)
    })
    .catch((error) => {
      const { message, data, status_code } = error.response.data;
      if (status_code != 200) $toast.error(message, { position: "top-right" });
    });
};
</script>
<template>
    <div class="modal" :class=" show ? 'show' : '' " style="display: block;"   
     aria-hidden="true"  tabindex="-1" role="dialog" transition="fade-transition">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class=" modal-title">create meeting</h5>
          </div>
          <div class="modal-body">
            < v-model="isDialogVisible" max-width="800">
            <v-form  @submit="Create" >
        <v-container>
          <v-row>
            <v-col
                    cols="12"
                  >
                  <p class="text-black">start time</p>
                    <v-text-field
                      placeholder="Start Time"
                      v-modal="start"
                       type="time"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                  <p class="text-black">End Time</p>
                    <v-text-field
                      placeholder="End Time"
                      v-modal="end"
                      type="time"
                      v-model="posts.end"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                  <p class="text-black">Doctor Name</p>
                  <v-autocomplete
                  v-model="selectedDoctor"
                  placeholder="Choose Doctor"
                  required
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                  <p class="text-black">Patient Name</p>
                  <v-autocomplete
                  v-model="selectedPatient"
                  placeholder="Choose patient"
                  required
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                  <p class="text-black">Day</p>
                    <v-text-field
                      placeholder="choose date"
                       type="date"
                       v-model="date"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                  <p class="text-black">Email Reminder</p>
                  <v-autocomplete
                  placeholder="Choose Days"
                  v-model="emailReminder"
                  required
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                  <p class="text-black">Text Reminder</p>
                  <v-autocomplete
                  placeholder="Choose Days"
                  v-model="textReminder"
                  required
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                  <p class="text-black">Follow up Massege</p>
                  <v-autocomplete
                  placeholder="Choose Days"
                  v-model=" followUpMessage"
                  required
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  ></v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox label="confirmed"></v-checkbox>
                  </v-col>
                  <v-col cols="12">
                    <v-checkbox label="allow direct access"></v-checkbox>
                  </v-col>
                  <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-5"
                variant="text"
                class="btn-1 mt-2"
                @click="Create"
              >
                create meeting
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                class="btn-1 mt-2 "
                @click="closeModal"
              >
                close
              </v-btn>
            </v-card-actions>
          </v-row>
          </v-container>
        </v-form>
    </
      </div>
    </div>
    </div>
    </div>
    </template>
<style scoped>
/* Add your custom modal styles here */
/* .modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  margin-top: 50px;
} */

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #000;
}
.modal-title[data-v-5019a23e] {
    font-size: 20px !important;
    font-weight: 600 !important;
    color: black !important;
    margin-left: 33% !important;
    margin-top: -15px;
}
.modal-content[data-v-5019a23e] {
    background-color: #ffffff;
    margin: 23% auto;
    padding: 20px;
    border: none;
    width: 109%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.v-field__field {
    flex: 1 0;
    grid-area: field;
    position: relative;
    align-items: flex-start;
    display: flex;
    background-color: #fafafa !important;
}
.text-black[data-v-5019a23e] {
    --bs-text-opacity: 1;
    color: rgba(var(--bs-black-rgb), var(--bs-text-opacity)) !important;
    margin-bottom: 7px;
    font-weight: 600;
    margin-top: -16px;
}
</style>
