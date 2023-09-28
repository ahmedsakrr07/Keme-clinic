<template>
  <div>
    <h1>Select Time Zone</h1>
    <select v-model="selectedTimeZone">
      <option v-for="timeZone in timeZones" :key="timeZone">{{ timeZone }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTimeZone: null,
      timeZones: [], // Populate this array with time zone options
    };
  },
  mounted() {
    // Fetch and populate the time zone options
    this.fetchTimeZones();
  },
  methods: {
    fetchTimeZones() {
      // You can use a library like "luxon" or "moment-timezone" to fetch time zone options
      // For example, using "luxon":
      // import { IANAZone } from "luxon";
      // this.timeZones = IANAZone.zones.map((zone) => zone.name);

      // For simplicity, let's manually add some time zones
      this.timeZones = [
        "America/New_York",
        "America/Chicago",
        "America/Los_Angeles",
        // Add more time zones as needed
      ];

      // Set the selected time zone to the user's time zone
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.selectedTimeZone = userTimeZone;
    },
  },
};
</script>
<route lang="yaml">
  meta:
    action: read
    subject: setting-show
  </route>

