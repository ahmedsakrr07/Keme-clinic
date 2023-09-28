<script setup>
import { useTheme } from 'vuetify'
import { useMeetingListStore } from '@/views/apps/meeting/useMeetingListStore'

const MeetingListStore = useMeetingListStore()
const meettings = ref([
          {
            title: "booking",
            start: "2023-06-25",
            end: "2023-06-25",},{title: "booking2",start: "2023-06-25",end: "2023-06-25",},])

const fetchMeetings = () => {
  MeetingListStore.fetchMeetings({
    id:Number(route.params.id),
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
    meettings.value = response.data.data.data
    rowPerPage.value = response.data.data.meta.per_page
    totalPage.value = response.data.data.meta.last_page
    totalAppointments.value = response.data.data.meta.total
  }).catch(error => {
    console.error(error)
  }).finally(() => {
    loading.value =  false
  })
}

const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors
</script>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        },
        editable: true,
        selectable: true,
        navLinks: true,
        weekends: true,
        events: ,
        eventMouseEnter: this.handleEventMouseEnter,
        eventMouseLeave: this.handleEventMouseLeave,
      },
      event: null,
    }
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        headerToolbar: {
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        },
        editable: true,
        selectable: true,
        navLinks: true,
        weekends: true,
        events: meettings,
        eventMouseEnter: this.handleEventMouseEnter,
        eventMouseLeave: this.handleEventMouseLeave,
      },
      event: null,
    }
  },
  methods: {
    handleDateClick(events) {
      this.event = events
      console.log(events)
    },
    handleEventMouseEnter({ event }) {
      console.log(event)
    },
    handleEventMouseLeave() {
      this.event = null
    },
  },
}
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>

<style data-fullcalendar>
* body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.clender {
  background-color: #f6f6f6;
  padding-top: 33px;
  margin-top: -21px;
}

.user {
  background-color: white;
  padding: 6px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn-1 {
  background-color: #9e94f5;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  padding: 6px;
  font-size: 15px;
  cursor: pointer;
  margin: 0px;
  color: white;
}
.alarm {
  cursor: pointer;
  color: #696872;
  font-size: 17px;
  padding-right: 18px;
}
.bell {
  cursor: pointer;
  color: #696872;
  padding-right: 20px;
  font-size: 16px;
}
.person {
  cursor: pointer;
  margin-right: 21px;
  font-size: 17px;
}
.btn-2 {
  background-color: #9e94f5;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  padding: 6px;
  font-size: 15px;
  cursor: pointer;
  margin: 0px;
  color: white;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: 12px;
}
.form-control {
  display: block;
  width: 100%;
  padding: 5px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  background-color: #f3f3f3;
  background-clip: padding-box;
  border: var(--bs-border-width) solid var(--bs-border-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: var(--bs-border-radius);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.fc .fc-view-harness {
  flex-grow: 1;
  position: relative;
  background-color: white;
}
.fc .fc-col-header-cell-cushion {
  display: inline-block;
  padding: 2px 4px;
  text-decoration: none;
  color: black;
  font-size: 13px;
  font-weight: 600;
}
.fc .fc-daygrid-day-number {
  padding: 4px;
  position: relative;
  z-index: 4;
  text-align: center;
  text-decoration: none;
  display: flex;
  color: black;
  margin-right: 59px;
  padding-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

.fc-theme-standard td,
.fc-theme-standard th {
  border: 1px solid #ebebeb;
}
.fc .fc-toolbar-title {
  font-size: 22px;
  margin: 0px;
}
.tooltip {
  position: relative;
  background-color: black;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 9999;
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child) {
  background-color: white;
  border: none;
  color: rebeccapurple;
  margin-right: -5px;
  border-radius: 8px;
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  background-color: white;
  border: none;
  color: rebeccapurple;
  margin-left: 13px;
  border-radius: 8px;
}
.fc .fc-button .fc-icon {
  font-size: 18px;
  vertical-align: middle;
}
</style>

<route lang="yaml">
  meta:
    action: read
    subject: home
  </route>

