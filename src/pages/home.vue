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
const loading = ref(false);
</script>

<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FormDate from "@/pages/formDate.vue";
import ModalHome from "@/pages/modal-home.vue";
import showData from "@/pages/showData.vue";

export default {
  components: {
    FullCalendar,
    ModalHome,
    FormDate,
    showData,
  },
  data() {
    return {
      selectedView: "",
      selectedDoctor: "",
      doctors: [],
      time: null,
      showDialog: false,
      showModal: false,
      calendarOptions: {
        firstDay: 1,
        initialView: "",
        plugins: [dayGridPlugin, interactionPlugin],
        events: [],
        headerToolbar: {
          left: "prev,title,next",
          // right: "dayGridMonth,dayGridWeek,dayGridDay",
        },
        editable: true,
        selectable: true,
        navLinks: true,
        weekends: true,
        eventClick: (info) => {
          console.log(info);
          this.showModal = true;
        },
        select: (info) => {
          console.log(info.startStr);
          this.showDialog = true;
        },
      },
    };
  },
  watch: {
    selectedDoctor(newDoctor) {
      // Watch for changes in selectedDoctor
      this.filterEventsByDoctor(newDoctor);
    },
    selectedView(newView) {
  // Watch for changes in selectedView and update the calendar view
  if (newView === "day") {
    this.calendarOptions.initialView = "dayGridDay";
  } else if (newView === "week") {
    this.calendarOptions.initialView = "dayGridWeek";
  } else if (newView === "month") {
    this.calendarOptions.initialView = "dayGridMonth";
  } else {
    // Default to a sensible view if the selectedView is not recognized
    this.calendarOptions.initialView = "dayGridDay";
  }

  // Return the updated initialView value
  return initialView;
},

  },
  created() {
    this.fetchStaffList();
  },
  methods: {
    fetchStaffList() {
      const staffUrl = "https://keme.za3bot.com/api/meeting/index";

      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OTEyMjhmNS02ZTljLTQ5ZmItOWEzYi1iZjE4NzM0Mjc0YjMiLCJqdGkiOiI5ZDljOTcxZTgzYTNkYmJhZDM4ZDAxYTE0ZjAyYzkwNmQ5OWVlNmFmMTc2NWZkODAzMDgzMTExNzA5Y2NlYmUxMjlmYzczYWJjY2RlZDIwOSIsImlhdCI6MTY5NTg4NTkzOC40NDA2NTgsIm5iZiI6MTY5NTg4NTkzOC40NDA2NTksImV4cCI6MTcyNzUwODMzOC40MzgzNDUsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.TUQMcx_B9O_fLBaZG4PWQEVpBOsKsn8X0Q33r5E756fVDmvBmjneec5vGazHvMpUKfoiMrlMysJ2yLS2InmANPOY32t0FxBrfZmmWsiegEM66jcdzOBT0X9P9fKRRnc6WZKadFpZO02fzxO36MNAdCzD4-YJ2eh3HmEyE3UpOqx4UY38l0nB9LzqH84_tWm7cWD11vurqJkBehd31narVYcj2egA4G5TY7B2d8IDdKPAaDSoiSP5CfgisZlVfjKg2gpZ8Ob1rXc2UNaYdGDJwXkJZGv3Vt2FtDvmO4hP2a-oBLoyqoWxMcjU5syyJJNzK7BOvu9uJZOoBV2i48rQSg83z4AATIguSCHqR2ixq7X2PldnvldiuoKPruQwr9Sdu2nvOSP5cUAYi4BGWd8SD2og_g5Ycy_hONTXI-mqaXDpHE1ne_J17euIzFLS6iKy0jU-53SYl3JRBY2Fm5cVW6Yq0-ivA6hcCHQUro-Q4Z1Frg8Z7iTFsDIAVv7RJsrnJIZsX2Dj0RYKMvPBVeTFnvZW4fE8SZXDMCDhuPo-ksBVv-jw10LS3sfLO_PROjCg0q4AbyZwGIDpMVWpI7dsj7ThzVVdqjQa4YJ1vmH-L9vld5IkWQ8CKFFCfQpXEUIQVdn5CTV4jZn1wbHyT3Z_KoPVzeYeUKAX23z5wc4-DIw";

      axios
        .get(staffUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const events = response.data.data.data.map((event) => ({
            id: event.id,
            title: event.start + " - Meeting With " + "Dr" + "-" + event.doctor,
            start: event.time,
            textColor: event.status == "Confirmed" ? "green" : "red",
            doctor: event.doctor,
          }));
          this.calendarOptions.events = events;
          console.log(events);
          this.allEvents = events;
          const uniqueDoctors = Array.from(
            new Set(response.data.data.data.map((event) => event.doctor))
          );

          this.doctors = uniqueDoctors;
        });
    },
    filterEventsByDoctor(selectedDoctor) {
      // Filter events based on the selected doctor
      const filteredEvents = this.allEvents.filter(
        (event) => event.doctor === selectedDoctor
      );

      // Update the calendar events with the filtered events
      this.calendarOptions.events = filteredEvents;
    },
    addEvent(eventData) {
      this.calendarOptions.events.push(eventData);
    },
    showDialog() {
      this.isDialogVisible = true;
    },
    closeModal() {
      this.showModal = false;
    },
    changeView() {
    this.calendarOptions.initialView = this.selectedView;
  },
    // handleSelectedViewChange(newView) {
    //   // Watch for changes in selectedView and update the calendar view
    //   if (newView === "day") {
    //     this.calendarOptions.initialView = "dayGridDay";
    //     console.log(this.calendarOptions.initialView);
    //   } else if (newView === "week") {
    //     this.calendarOptions.initialView = "dayGridWeek";
    //     console.log("week");
    //   } else if (newView === "month") {
    //     this.calendarOptions.initialView = "dayGridMonth";
    //     console.log("month");
    //   } else {
    //     // Default to a sensible view if the selectedView is not recognized
    //     this.calendarOptions.initialView = "dayGridMonth";
    //   }
    // },

    // ...
  },
};
</script>

<template>
  <div id="calendar" class="fc">
    <div class="setting sttiky-top">
      <v-row class="ml-2">
        <div class="form mt-4">
          <FormDate />
        </div>
        <v-col cols="4">
          <v-autocomplete
            style="margin-top: 13px"
            v-model="selectedDoctor"
            label="Choose Doctor"
            :items="doctors"
          >
            <v-list-item>{{ selectedDoctor }}</v-list-item>
          </v-autocomplete>
        </v-col>
        <v-col cols="2" style="margin-top: 13px">
          <v-select
            v-model="selectedView"
            :items="['day', 'week', 'month']"
            label="Select View"
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <FullCalendar :options="calendarOptions" />
    <ModalHome v-if="showDialog" />
    <showData v-if="showModal" @close="closeModal" />
  </div>
</template>
<style data-fullcalendar>
* body {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.clender {
  background-color: red;
  margin-block-start: -21px;
  padding-block-start: 33px;
}

.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  border-radius: 7px;
  background-color: white;
}

.btn-1 {
  padding: 6px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  margin: 0;
  background-color: #9e94f5;
  color: white;
  cursor: pointer;
  font-size: 15px;
}

.fc .fc-view-harness {
  position: relative;
  flex-grow: 1;
  /* background-color: white; */
}

.fc .fc-col-header-cell-cushion {
  display: inline-block;
  color: black;
  font-size: 15px;
  font-weight: 600;
  padding-block: 2px;
  padding-inline: 4px;
  text-decoration: none;
  /* height: 61px; */
  text-transform: uppercase;
  padding: 22px;
}

.fc .fc-daygrid-day-number {
  position: relative;
  z-index: 4;
  display: flex;
  padding: 18px;
  color: #656565;
  font-size: 16px;
  font-weight: 500;
  margin-inline-end: 59px;
  padding-block-start: 30px;
  text-align: center;
  text-decoration: none;
  padding-top: 33px;
}

.fc-theme-standard td,
.fc-theme-standard th {
  background-color: white;
}

.fc .fc-toolbar-title {
  margin: 0;
  font-size: 22px;
}

.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
  border: none;
  background-color: #2e3f4f;
  color: #ffffff00;
  display: none;
  margin-left: 0px;
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  margin-left: 0px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  display: none;
}

.fc .fc-button-group {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  margin-right: 36px;
}

.fc .fc-button .fc-icon {
  font-size: 18px;
  vertical-align: middle;
}

.fc-daygrid-block-event .fc-event-time,
.fc-daygrid-block-event .fc-event-title {
  padding: 1px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  white-space: pre-line;
}

.fc-h-event {
  display: block;
  border: none !important;
  background-color: white !important;
}

.fc .fc-daygrid-day-frame {
  position: relative;
  inline-size: 100%;
}

.fc .fc-scroller-liquid-absolute {
  overflow: hidden !important;
}

.fc .fc-button-primary:not(:disabled):active:focus,
.fc .fc-button-primary:not(:disabled).fc-button-active:focus {
  box-shadow: none;
}
.fc-icon-chevron-right:before {
  content: "\e901";
  position: relative;
  bottom: 6px;
  color: black;
  font-weight: bold;
  margin-left: -13px;
}
.fc-icon-chevron-left:before {
  content: "\e900";
  position: relative;
  bottom: 6px;
  color: black;
  left: 0px;
  font-weight: bold;
  margin-left: 2px;
}

.fc .fc-toolbar-title {
  margin: 0;
  font-size: 15px;
  color: black;
  font-weight: 700;
  margin-left: 34px;
  margin-right: 2px;
}

.fc-next-button {
  position: relative;
  left: 103%;
  bottom: 23px;
  padding: 1px !important;
  box-shadow: none !important;
  color: rebeccapurple !important;
}
.fc-prev-button {
  position: relative;
  top: 23px;
  left: 8px;
  padding: 1px !important;
  box-shadow: none !important;
}
.fc-today-button {
  padding: 6px !important;
  margin-top: 21px;
  margin-right: 41px;
  font-size: 18px;
  font-weight: 700;
  box-shadow: none !important;
  display: none;
}

.close:hover {
  color: #000;
}
.setting {
  background-color: white;
  margin-top: -89px;
  position: relative;
  z-index: 100;
  width: 91%;
  height: 65px;
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  margin-left: 0px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) :hover {
  color: red;
  background-color: red;
}
.fc .fc-button-primary {
  color: #fff;
  color: var(--fc-button-text-color, #fff);
  /* background-color: navy; */
  background-color: #2c3e5000 !important;
  border-color: #2c3e50 !important;
  border-color: #2c3e5000 !important;
}
.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 0px;
}
.fc .fc-daygrid-day.fc-day-today {
  background-color: rgb(255 0 0 / 15%);
  background-color: white;
}


/* Style for unconfirmed events */

</style>

<route lang="yaml">
meta:
  action: read
  subject: home
</route>
