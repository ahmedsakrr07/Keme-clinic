
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

NoteListStore.fetchRoles().then(response => {
  roles.value = response.data.data.data
})


const patient_id = ref(route.params.id)
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
  patient_id.value = response.data.data.patient_id
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
    patient_id: patient_id.value,
    date_of_service: date_of_service.value,
    treatment_type : treatment_type.value,
    services: services.value,
    treatment_modality: treatment_modality.value,
    treatment_goals: treatment_goals.value,
    session_narrative: session_narrative.value,
    treatment_response: treatment_response.value,
    diagnosis: diagnosis.value,
    treatment_and_follow_up_plan: treatment_and_follow_up_plan.value,
    chief_complaint: chief_complaint.value,
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
  <VCard
    :title="$t('Edit Note')"
  >
    <VCol cols="12">
      <VForm
        v-if="name"
        @submit.prevent="update"
      >
        
        <VRow>
         
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_type"
              :label="$t('treatment_type')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
        
        </VRow>
        </VRow>
       
        
       
        <VCol cols="2">
          <VBtn
            block
            type="submit"
          >
            {{ $t('Update') }}
          </VBtn>
        </VCol>
      </VForm>
      
    </VCol>
  </VCard>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: note-edit
</route>


