<script setup>
import { useSubClinicListStore } from '@/views/apps/subclinic/useSubClinicListStore';
const SubClinicListStore = useSubClinicListStore()
const route = useRoute()
const SubClinicData         = ref()

SubClinicListStore.fetchSubClinic(Number(route.params.id)).then(response => {
  SubClinicData.value = response.data.data
})

</script>

<template>
  <VRow v-if="SubClinicData">
    <VCol
      cols="12"
      
    >
      <VCol
        cols="12"
        md="6"
      >
      {{ SubClinicData.name }}
    </VCol>
    </VCol>


  </VRow>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: subClinic-show
  </route>


