
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

const actives = [
  { value: 0, name:"Deactive" },
  { value: 1, name:"Active" },
]

const doctors = ref([])

NoteListStore.fetchDoctors().then(response => {
  doctors.value = response.data.data.data
})

const patient_id = ref(route.params.id)
const doctor_id = ref()
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
  doctor_id.value = response.data.data.doctor
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
    doctor_id: doctor_id.value,
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
        @submit.prevent="update"
      >
        
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="doctor_id"
              :label="$t('doctors')"
              :items="doctors"
              item-title="name"
              item-value="id"
              :rules="[validate.requiredValidator]"
            />
          </VCol>
          <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="date_of_service"
                label="Date Of Service"

                type="date"
              />
            </VCol>
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
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="services"
              :label="$t('services')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          
           
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_modality"
              :label="$t('treatment_modality')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_goals"
              :label="$t('treatment_goals')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="session_narrative"
              :label="$t('session_narrative')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_response"
              :label="$t('treatment_response')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="diagnosis"
              :label="$t('diagnosis')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_and_follow_up_plan"
              :label="$t('treatment_and_follow_up_plan')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="chief_complaint"
              :label="$t('chief_complaint')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
         
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


