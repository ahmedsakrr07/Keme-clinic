<script setup>
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors
</script>

<template>
  <VRow class="match-height">
  
    <!-- 👉 Website analytics -->
    <!-- <VCol
      cols="12"
      md="6"
    >
      <AnalyticsWebsiteAnalytics />
    </VCol> -->

    <!-- 👉 Sales Overview -->
     <VCol
      cols="12"
      md="3"
      sm="6"
    >
      <AnalyticsSalesOverview />
    </VCol> -->

    <!-- 👉 Statistics Vertical -->
    <!-- <VCol
      cols="12"
      md="3"
      sm="6"
    >
      <CardStatisticsVertical v-bind="statisticsVertical" />
    </VCol> -->

    <!-- 👉 Earning Reports Weekly Overview -->
    <!-- <VCol
      cols="12"
      md="6"
    >
      <AnalyticsEarningReportsWeeklyOverview />
    </VCol> -->

    <!-- 👉 Support Tracker -->
    <!-- <VCol
      cols="12"
      md="6"
    >
      <AnalyticsSupportTracker />
    </VCol> -->

    <!-- 👉 Sales by Countries -->
    <!-- <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AnalyticsSalesByCountries />
    </VCol> -->

    <!-- 👉 Total Earning -->
    <!-- <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AnalyticsTotalEarning />
    </VCol> -->

    <!-- 👉 Monthly Campaign State -->
    <!-- <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AnalyticsMonthlyCampaignState />
    </VCol> -->

    <!-- 👉 Source Visits -->
    <!-- <VCol
      cols="12"
      sm="6"
      lg="4"
    >
      <AnalyticsSourceVisits />
    </VCol> -->

    <!-- 👉 Project Table -->
    <!-- <VCol
      cols="12"
      lg="8"
    >
      <AnalyticsProjectTable />
    </VCol> -->
  </VRow>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: home
  </route>

