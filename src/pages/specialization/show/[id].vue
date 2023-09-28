<script setup>
import { useSpecializationListStore } from '@/views/apps/specialization/useSpecializationListStore';

const SpecializationListStore = useSpecializationListStore()
const route = useRoute()
const SpecializationData = ref()




SpecializationListStore.fetchSpecialization(Number(route.params.id)).then(response => {
  SpecializationData.value = response.data.data
})
</script>

<template>
  <VRow v-if="ClienicData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
    </VCol>


  </VRow>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: specialization-show
  </route>


