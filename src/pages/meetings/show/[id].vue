<script setup>
import { useMeetingListStore } from '@/views/apps/meeting/useMeetingListStore';

const route = useRoute()
const patient    = ref()
const doctor    = ref()
const time     = ref()
const clinic     = ref()
const status     = ref()
const start      = ref()
const end      = ref()

const MeetingListStore = useMeetingListStore()

MeetingListStore.fetchMeeting(Number(route.params.id)).then(response => {
  time.value   = response.data.data.time
  clinic.value   = response.data.data.clinic
  patient.value  = response.data.data.patient
  doctor.value  = response.data.data.doctor
  status.value = response.data.data.status
  start.value = response.data.data.start
  end.value = response.data.data.end

})

</script>

<template>
  <VCard
    :title="$t('View Meeting')"
  >
    <VCard :title="$t('* Basic Information')">
      <VCol cols="12">
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              patient :
            </VSubheader>{{ patient }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              doctor :
            </VSubheader>{{ doctor }}
          </VCol>
         
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              time :
            </VSubheader>{{ time }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              clinic :
            </VSubheader>{{ clinic }}
          </VCol>
              
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              start :
            </VSubheader>{{ start }}
          </VCol>
            <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              end :
            </VSubheader>{{ end }}
          </VCol>
        
            <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              status :
            </VSubheader>{{ status }}
          </VCol>
        </VRow>
              
        <VRow v-if="!name">
          <VCol
            cols="12"
            md="6"
          >
            
          </VCol>  
        </VRow>
      </VCol>
    </VCard><br>
    </VCard>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: staff-show
  </route>


