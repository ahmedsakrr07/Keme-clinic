<script setup>
import { useClinicListStore } from '@/views/apps/clinic/useClinicListStore';
const ClinicListStore = useClinicListStore()
const route = useRoute()
const ClinicData         = ref()

ClinicListStore.fetchClinic(Number(route.params.id)).then(response => {
  ClinicData.value = response.data.data
})

</script>

<template>
  <VRow v-if="ClinicData">
    <VCol
      cols="12"
      
    >
      <VCol
        cols="12"
        md="6"
      >
      {{ ClinicData.name }}
    </VCol>
    </VCol>


  </VRow>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: clinic-show
  </route>


