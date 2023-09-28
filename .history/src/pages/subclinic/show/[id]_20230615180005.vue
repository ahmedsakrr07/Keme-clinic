<script setup>
import { useSubClinicListStore } from '@/views/apps/subclinic/useSubClinicListStore'

const SubClinicListStore = useSubClinicListStore()
const route = useRoute()
const SubClinicData         = ref()

const actives = [
  { value: 0, name:"Deactive" },
  { value: 1, name:"Active" },
]

const title               = ref()
const description               = ref()
const clinic_id          = ref()
const active             = ref()

SubClinicListStore.fetchsubClinic(Number(route.params.id)).then(response => {
  title.value                  = response.data.data.title
  description.value                  = response.data.data.description
  clinic_id.value             = response.data.data.clinic
  active.value                = response.data.data.active
})
</script>

<template>
  <VCard
    :title="$t('Questioneer Details Doctor')"
  >
    
      <VCol cols="12">
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              title :
            </VSubheader>{{ title }}
          </VCol>
         
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              clinic :
            </VSubheader>{{ clinic_id }}
          </VCol>
          
              
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Status :
            </VSubheader>{{ (active == 0)?'InActive':'Active' }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              description :
            </VSubheader>{{ description }}
          </VCol>
        </VRow>
              
        
      </VCol>
   
  </VCard>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: questioneer-show
  </route>


