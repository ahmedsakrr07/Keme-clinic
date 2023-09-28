<script setup>
import { useSubClinicListStore } from '@/views/apps/subclinic/useSubClinicListStore';
const SubClinicListStore = useSubClinicListStore()
const route = useRoute()
const SubClinicData         = ref()
const actives = [
  { value: 0, name:"Deactive"},
  { value: 1, name:"Active"},
]
const title               = ref()
const description               = ref()
const clinic_id          = ref()
const active             = ref()

SubClinicListStore.fetchsubClinic(Number(route.params.id)).then(response => {
  title.value                  = response.data.data.title
  description.value                  = response.data.data.description
  clinic_id.value             = response.data.data.clinic_id
  active.value                = response.data.data.active
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
    subject: questioneer-show
  </route>


