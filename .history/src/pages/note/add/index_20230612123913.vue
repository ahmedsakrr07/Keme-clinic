
<script setup>
// import { useClinicListStore } from '@/views/apps/clinic/useClinicListStore';

import { useNoteListStore } from '@/views/apps/note/useNoteListStore';
import axios from '@axios';
import * as validate from '@validators';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()
const router = useRouter()

// const ClinicListStore = useClinicListStore()
// const clinics = ref([]);

const NoteListStore = useNoteListStore()

const isPasswordVisible = ref(false)

const actives = [
  { value: 0, name:"Deactive"},
  { value: 1, name:"Active"},
]
const id = ref()
const date_of_service = ref()
const treatment_type = ref()
const services = ref()
const treatment_modality = ref()
const treatment_goals = ref()
const session_narrative = ref()
const treatment_response = ref()
const diagnosis    = ref()
const treatment_and_follow_up_plan    = ref()
// const clinic_id = ref()

const Create = () => {
  axios.post('/patient/create', {
   
    id: 
    date_of_service: date_of_service.value,
    treatment_type : treatment_type.value,
    services: services.value,
    treatment_modality: treatment_modality.value,
    treatment_goals: treatment_goals.value,
    session_narrative: session_narrative.value,
    treatment_response: treatment_response.value,
    diagnosis: diagnosis.value,
    treatment_and_follow_up_plan: treatment_and_follow_up_plan.value,
    // clinic_id: clinic_id.value,
  
  }).then(r => {
    const {message,data,status_code} = r.data
    if(status_code == 200)
    $toast.success(message, { position: 'top-right'})
       router.go(-1)
  }).catch(error => {
      const {message,data,status_code} = error.response.data
      if(status_code != 200)
        $toast.error(message, { position: 'top-right'})
   })
}

// ClinicListStore.fetchSelectClinic().then(response => {
//   clinics.value = response.data.data
// })

</script>



<template>
   <VCard
    :title="$t('Add new note')"
   >
    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <VCol cols="12">
        <VForm  @submit.prevent="Create">
          
          <VRow >
            <VCol
              cols="12"
              md="6"
            >
             
              <VTextField
                v-model="date_of_service"
                :label="$t('Date Of Service')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
              />
            </VCol>
          
           
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="treatment_type"
                :label="$t('Treatment Type')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="diagnosis"
                :label="$t('Diagnosis')"
                :rules="[validate.requiredValidator,validate.emailValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="treatment_and_follow_up_plan"
                :label="$t('Treatment And Follow Up Plan')"
                :rules="[validate.requiredValidator,validate.lengthValidator(phone,11),validate.integerValidator]"
              />
            </VCol>
           
           
          </VRow>
          <br>
        
          <VRow >
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="services"
                :label="$t('Services')"
                :rules="[validate.engishValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="treatment_modality"
                :label="$t('Treatment Modality')"
                :rules="[validate.engishValidator]"
              />
            </VCol>
          
           
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="treatment_goals"
                :label="$t('Treatment Goals')"
                :rules="[validate.engishValidator]"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="session_narrative"
                :label="$t('Session Narrative')"
                :rules="[validate.engishValidator]"
              />
            </VCol>
            
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                  v-model="treatment_response"
                  :label="$t('Treatment Response')"
                  :rules="[validate.engishValidator]"
                />

            </VCol>
        
          </VRow>
         
          <VRow>
            </VRow>
            <br>
          
        
         
          <VCol cols="2">
              <VBtn block type="submit">
                {{ $t('Add') }}
              </VBtn>
            </VCol>
        </VForm>
      </VCol>
    </VCardText>
  </VCard>

</template>



<route lang="yaml">
  meta:
    action: read
    subject: patient-create
  </route>


