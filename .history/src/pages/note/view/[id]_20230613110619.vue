
<script setup>
import { useNoteListStore } from '@/views/apps/note/useNoteListStore'
import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const router = useRouter()
const route = useRoute()

const NoteListStore = useNoteListStore()
const roles = ref([])
const isPasswordVisible = ref(false)

NoteListStore.fetchRoles().then(response => {
  roles.value = response.data.data.data
})


const date_of_service = ref()
const treatment_type = ref()
const services = ref()
const treatment_modality = ref()
const treatment_goals = ref()
const session_narrative = ref()
const treatment_response = ref()
const diagnosis    = ref()
const treatment_and_follow_up_plan    = ref()
const chief_complaint = ref()

NoteListStore.fetchNote(Number(route.params.id)).then(response => {
  date_of_service.value = response.data.data.date_of_service
  treatment_type .value = response.data.data.treatment_type
  services.value = response.data.data.services
  treatment_modality.value = response.data.data.treatment_modality
  treatment_goals.value = response.data.data.treatment_goals
  session_narrative.value = response.data.data.session_narrative
  treatment_response.value = response.data.data.treatment_response
  diagnosis.value = response.data.data.diagnosis
  treatment_and_follow_up_plan.value = response.data.data.treatment_and_follow_up_plan
  chief_complaint.value = response.data.data.chief_complaint
})

const update = () => {
  axios.post('/note/edit/'+route.params.id, {
   
    relationship_status: relationship_status.value,
    employment_status: employment_status.value,
    insurance_number: insurance_number.value,
    billing: billing.value,

    emergency_name: emergency_name.value,
    emergency_relation: emergency_relation.value,
    emergency_email: emergency_email.value,
    emergency_phone_number: emergency_phone_number.value,
    emergency_is_send_emails: emergency_is_send_emails.value,
    emergency_is_leave_voice: emergency_is_leave_voice.value,
    emergency_is_leave_text: emergency_is_leave_text.value,

    password: password.value,
    active: active.value,
    role: role.value,
  }).then(r => {
    const { message,data,status_code } = r.data
    if(status_code == 200)
      $toast.success(message, { position: 'top-right' })
    router.go(-1)
  }).catch(error => {
    const { message,data,status_code } = error.response.data
    if(status_code != 200)
      $toast.error(message, { position: 'top-right' })
  })
}
</script>

<template>
      <VCard :title="$t('* Basic Information')">
        <VCol cols="12">
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                First Name :
              </VSubheader>{{ name }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Middle Name :
              </VSubheader>{{ middle_name }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Last Name :
              </VSubheader>{{ last_name }}
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
</template>

<route lang="yaml">
  meta:
    action: read
    subject: patient-edit
</route>


