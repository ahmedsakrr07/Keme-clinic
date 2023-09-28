<script setup>
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors
</script>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
      }
    }
  }
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>

<route lang="yaml">
  meta:
    action: read
    subject: home
  </route>

