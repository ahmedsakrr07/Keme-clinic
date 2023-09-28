
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

const actives = [
  { value: 0, name:"Deactive" },
  { value: 1, name:"Active" },
]

const name = ref()
const middle_name = ref()
const last_name = ref()
const is_send_emails = ref()
const is_leave_voice = ref()
const is_leave_text = ref()
const address1 = ref()
const address2 = ref()
const city = ref()
const state = ref()
const zip_code = ref()
const birth_date = ref()
const gender = ref()
const relationship_status = ref()
const employment_status = ref()
const insurance_number = ref()
const billing = ref()

const emergency_name = ref()
const emergency_relation = ref()
const emergency_email = ref()
const emergency_phone_number = ref()
const emergency_is_send_emails = ref()
const emergency_is_leave_voice = ref()
const emergency_is_leave_text = ref()
const email    = ref()
const phone    = ref()
const password    = ref()
const role      = ref()
const active    = ref()

PatientListStore.fetchPatient(Number(route.params.id)).then(response => {
  name.value   = response.data.data.name
  email.value  = response.data.data.email
  phone.value  = response.data.data.phone
  active.value = response.data.data.active

  middle_name.value = response.data.data.middle_name
  last_name .value = response.data.data.last_name
  is_send_emails.value = response.data.data.is_send_emails
  is_leave_voice.value = response.data.data.is_leave_voice
  is_leave_text.value = response.data.data.is_leave_text
  address1.value = response.data.data.address1
  address2.value = response.data.data.address2
  city.value = response.data.data.city
  state.value = response.data.data.state
  zip_code.value = response.data.data.zip_code
  birth_date.value = response.data.data.birth_date
  gender.value = response.data.data.gender
  relationship_status.value = response.data.data.relationship_status
  employment_status.value = response.data.data.employment_status
  insurance_number.value = response.data.data.insurance_number
  billing.value = response.data.data.billing

  emergency_name.value = response.data.data.emergency_name
  emergency_relation.value = response.data.data.emergency_relation
  emergency_email.value = response.data.data.emergency_email
  emergency_phone_number.value = response.data.data.emergency_phone_number
  emergency_is_send_emails.value = response.data.data.emergency_is_send_emails
  emergency_is_leave_voice.value = response.data.data.emergency_is_leave_voice
  emergency_is_leave_text.value = response.data.data.emergency_is_leave_text
})

const update = () => {
  axios.post('/patient/edit/'+route.params.id, {
    name: name.value,
    email: email.value,
    phone: phone.value,

    middle_name: middle_name.value,
    last_name: last_name.value,
    is_send_emails: is_send_emails.value,
    is_leave_voice: is_leave_voice.value,
    is_leave_text: is_leave_text.value,
    address1: address1.value,
    address2: address2.value,
    city: city.value,
    state: state.value,
    zip_code: zip_code.value,
    birth_date: birth_date.value,
    gender: gender.value,
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
  <VCard
    :title="$t('Edit Patient')"
  >
    <VCol cols="12">
      <VForm
        v-if="name"
        @submit.prevent="update"
      >
        <VSubheader>*Basic Information</VSubheader>
        <br><br>

        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="name"
              :label="$t('First Name')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="middle_name"
              :label="$t('Middle Name')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          
           
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="last_name"
              :label="$t('Last Name')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="email"
              :label="$t('Email')"
              :rules="[validate.requiredValidator,validate.emailValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="phone"
              :label="$t('Phone')"
              :rules="[validate.requiredValidator,validate.lengthValidator(phone,11),validate.integerValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="password"
              :label="$t('Password')"
              :rules="[validate.requiredValidator,validate.passwordValidator]"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="active"
              :label="$t('Status')"
              :items="actives"
              :item-title="$t('name')"
              item-value="value"
              :rules="[validate.requiredValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <input
              id="checkbox"
              v-model="is_send_emails"
              type="checkbox"
              rules="[validate.requiredValidator]"
            >
            <label for="checkbox"> Is Send Emails</label><br>
            <input
              id="checkbox"
              v-model="is_leave_voice"
              type="checkbox"
              rules="[validate.requiredValidator]"
            >
            <label for="checkbox"> Is Leave Voice</label><br>
            <input
              id="checkbox"
              v-model="is_leave_text"
              type="checkbox"
              rules="[validate.requiredValidator]"
            >
            <label for="checkbox"> Is Leave Text</label>
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


