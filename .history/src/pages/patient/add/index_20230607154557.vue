
<script setup>
import { usePatientListStore } from '@/views/apps/patient/usePatientListStore';
import axios from '@axios';
import * as validate from '@validators';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()
const router = useRouter()

const PatientListStore = usePatientListStore()

const isPasswordVisible = ref(false)

const actives = [
  { value: 0, name:"Deactive"},
  { value: 1, name:"Active"},
]
const name     = ref()
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

const Create = () => {
  axios.post('/patient/create', {
    name: name.value,
    email: email.value,
    phone: phone.value,

    middle_name: middle_name.value,
    last_name : last_name.value,
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
    relationship_status : relationship_status.value,
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

</script>



<template>
   <VCard
    :title="$t('Add new patient')"
   >
    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <VCol cols="12">
        <VForm  @submit.prevent="Create">
          <v-subheader>*Basic Information</v-subheader>
          <br><br>

          <VRow >
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
            <VCol cols="12" md="6" >
              <VSelect
                  v-model="active"
                  :label="$t('Status')"
                  :items="actives"
                  :itemTitle="$t('name')"
                  itemValue="value"
                  :rules="[validate.requiredValidator]"
                />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
            <input type="checkbox" id="checkbox" v-model="is_send_emails" />
            <label for="checkbox"> Is Send Emails</label><br>
            <input type="checkbox" id="checkbox" v-model="is_leave_voice" />
            <label for="checkbox"> Is Leave Voice</label><br>
            <input type="checkbox" id="checkbox" v-model="is_leave_text" />
            <label for="checkbox"> Is Leave Text</label>
            </VCol>
           
          </VRow>
          <br>
          <hr>
          <br>
          <v-subheader>*Address Information</v-subheader>
          <br><br>

          <VRow >
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="address1"
                :label="$t('Address Line 1')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="address2"
                :label="$t('Address Line 2')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
              />
            </VCol>
          
           
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="city"
                :label="$t('City')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="state"
                :label="$t('State')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="phone"
                :label="$t('Phone')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                  v-model="zip_code"
                  :label="$t('Zip Code')"
                  :rules="[validate.requiredValidator,validate.engishValidator]"
                
                />

            </VCol>
            <VCol
              cols="12"
              md="6"
            >
            <date-pick
                :startPeriod="{month: 0, year: 2020}}"
            ></date-pick>

            </VCol>
            <VCol cols="12" md="6" >
              <VSelect
                  v-model="active"
                  :label="$t('Status')"
                  :items="actives"
                  :itemTitle="$t('name')"
                  itemValue="value"
                  :rules="[validate.requiredValidator]"
                />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
            <input type="checkbox" id="checkbox" v-model="is_send_emails" />
            <label for="checkbox"> Is Send Emails</label><br>
            <input type="checkbox" id="checkbox" v-model="is_leave_voice" />
            <label for="checkbox"> Is Leave Voice</label><br>
            <input type="checkbox" id="checkbox" v-model="is_leave_text" />
            <label for="checkbox"> Is Leave Text</label>
            </VCol>
           
          </VRow>
          <br>
          <hr>
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


  <script>
import DatePick from 'vue-date-pick';
export default {
    components: {DatePick}
};
</script>
