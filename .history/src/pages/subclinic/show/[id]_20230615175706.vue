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
  clinic_id.value             = response.data.data.clinic_id
  active.value                = response.data.data.active
})
</script>

<template>
  <VCard
    :title="$t('View Doctor')"
  >
    <VCard :title="$t('* Basic Information')">
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
              Clinic :
            </VSubheader>{{ clinic }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Specialization :
            </VSubheader>{{ Specialization }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Email :
            </VSubheader>{{ email }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Phone :
            </VSubheader>{{ phone }}
          </VCol>
              
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Status :
            </VSubheader>{{ (status == 0)?'InActive':'Active' }}
          </VCol>
        </VRow>
              
        
      </VCol>
    </VCard><br>
  </VCard>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: questioneer-show
  </route>


