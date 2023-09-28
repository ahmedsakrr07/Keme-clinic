
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
  axios.post('/patient/edit/'+route.params.id, {
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
    :title="$t('Edit Patient')"
  >
    <VCol cols="12">
      <VForm
        v-if="name"
        @submit.prevent="update"
      >
        
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
              :rules="[validate.requiredValidator,validate.emailValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="session_narrative"
              :label="$t('session_narrative')"
              :rules="[validate.requiredValidator,validate.lengthValidator(phone,11),validate.integerValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_response"
              :label="$t('treatment_response')"
              :rules="[validate.requiredValidator,validate.lengthValidator(phone,11),validate.integerValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="diagnosis"
              :label="$t('diagnosis')"
              :rules="[validate.requiredValidator,validate.lengthValidator(phone,11),validate.integerValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_and_follow_up_plan"
              :label="$t('treatment_and_follow_up_plan')"
              :rules="[validate.requiredValidator,validate.lengthValidator(phone,11),validate.integerValidator]"
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="chief_complaint"
              :label="$t('chief_complaint')"
              :rules="[validate.requiredValidator,validate.lengthValidator(phone,11),validate.integerValidator]"
            />
          </VCol>
         
        </VRow>
        <br>
        <hr>
        <br>
        <VSubheader>*Address Information</VSubheader>
        <br><br>

        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="address1"
              :label="$t('Address Line 1')"
              :rules="[validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="address2"
              :label="$t('Address Line 2')"
              :rules="[validate.engishValidator]"
            />
          </VCol>
          
           
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="city"
              :label="$t('City')"
              :rules="[validate.engishValidator]"
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="state"
              :label="$t('State')"
              :rules="[validate.engishValidator]"
            />
          </VCol>
            
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="zip_code"
              :label="$t('Zip Code')"
              :rules="[validate.engishValidator]"
            />
          </VCol>
        </VRow>
        <br>
        <hr>
        <br>
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="birth_date"
              label="Birth Date"
              type="date"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="gender"
              :label="$t('Gender')"
              :items="['Male', 'Female']"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="relationship_status"
              :label="$t('Relationship Status')"
              :items="['single','marrie','separated','engaged']"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="employment_status"
              :label="$t('Employment  Status')"
              :items="['Worker','Employee','Self Employed']"
            />
          </VCol>
        </VRow>
        <br>
        <hr>
        <br>
         
        <VSubheader>*Emergency Contact</VSubheader>
        <br><br>

        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="emergency_name"
              :label="$t('Emergency Name')"
              :rules="[validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="emergency_relation"
              :label="$t('Emergency Relation')"
              :rules="[validate.engishValidator]"
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="emergency_email"
              :label="$t('Emergency Email')"
              :rules="[validate.emailValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="emergency_phone_number"
              :label="$t('Emergency Phone')"
              :rules="[validate.lengthValidator(phone,11),validate.integerValidator]"
            />
          </VCol>
          
           
          <VCol
            cols="12"
            md="6"
          >
            <input
              id="emergency_checkbox"
              v-model="emergency_is_send_emails"
              type="checkbox"
            >
            <label for="emergency_checkbox"> Is Send Emails</label><br>
            <input
              id="emergency_checkbox"
              v-model="emergency_is_leave_voice"
              type="checkbox"
            >
            <label for="emergency_checkbox"> Is Leave Voice</label><br>
            <input
              id="emergency_checkbox"
              v-model="emergency_is_leave_text"
              type="checkbox"
            >
            <label for="emergency_checkbox"> Is Leave Text</label>
          </VCol>
        </VRow>
        <br>
        <hr>
        <br>
        <VSubheader>*Rules Of Billing</VSubheader>
        <br><br>

        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="billing"
              :label="$t('Rules Of Blling')"
              :items="['Insurance', 'Credit ']"
            />
          </VCol>
        </VRow><br>
        <VSubheader>*Insurance Information</VSubheader>
        <br><br>

        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="insurance_number"
              :label="$t('Insurance Number')"
              :rules="[validate.engishValidator]"
            />
          </VCol>
        </VRow>
        <br>
        <hr>
        <br>
        <VCol cols="2">
          <VBtn
            block
            type="submit"
          >
            {{ $t('Update') }}
          </VBtn>
        </VCol>
      </VForm>
      <VRow v-if="!name">
        <VCol
          cols="12"
          md="6"
        >
          <div class="loading">
            <div class="effect-1 effects" />
            <div class="effect-2 effects" />
            <div class="effect-3 effects" />
          </div>
        </VCol>  
      </VRow>
    </VCol>
  </VCard>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: patient-edit
</route>


