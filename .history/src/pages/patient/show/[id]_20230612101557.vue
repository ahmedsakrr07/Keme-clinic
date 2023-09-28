<script setup>
import { usePatientListStore } from '@/views/apps/patient/usePatientListStore'

const PatientListStore = usePatientListStore()
const route = useRoute()
const PatientData = ref()

PatientListStore.fetchPatient(Number(route.params.id)).then(response => {
  PatientData.value = response.data.data
})
</script>

<template>
  <VRow v-if="PatientData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      {{ PatientData.name }}
    </VCol>
  </VRow>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: questioneer-show
  </route>


