
<script setup>
import { useNoteListStore } from '@/views/apps/note/useNoteListStore';
import axios from '@axios';
import * as validate from '@validators';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()
const router = useRouter()

const NoteListStore = useNoteListStore()

const isPasswordVisible = ref(false)

const actives = [
  { value: 0, name:"Deactive"},
  { value: 1, name:"Active"},
]
const date_of_service = ref()
const treatment_type = ref()
const services = ref()
const treatment_modality = ref()
const city = ref()
const state = ref()
const zip_code = ref()
const birth_date = ref()
const gender = ref()
const relationship_status = ref()
const employment_status = ref()
const insurance_number = ref()
const billing = ref()


const email    = ref()
const phone    = ref()
const password    = ref()
const role      = ref()
const active    = ref()

const Create = () => {
  axios.post('/patient/create', {
    email: email.value,
    phone: phone.value,

    date_of_service: date_of_service.value,
    treatment_type : treatment_type.value,
    services: services.value,
    treatment_modality: address2.value,
    city: city.value,
    state: state.value,
    zip_code: zip_code.value,
    birth_date: birth_date.value,
    gender: gender.value,
    relationship_status : relationship_status.value,
    employment_status: employment_status.value,
    insurance_number: insurance_number.value,
    billing: billing.value,


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
             
                <v-text-field
                  label="Birth Date"
                  v-model="birth_date"
                  type="date"
              ></v-text-field>


            </VCol>
            <VCol cols="12" md="6" >
              <VSelect
                  v-model="gender"
                  :label="$t('Gender')"
                  :items="['Male', 'Female']"

                />
            </VCol>
            <VCol cols="12" md="6" >
              <VSelect
                  v-model="relationship_status"
                  :label="$t('Relationship Status')"
                  :items="['single','marrie','separated','engaged']"

                />
            </VCol>
            <VCol cols="12" md="6" >
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
         
         
          <br>
          <hr>
          <br>
          <v-subheader>*Rules Of Billing</v-subheader>
          <br><br>

          <VRow >
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
          <v-subheader>*Insurance Information</v-subheader>
          <br><br>

          <VRow >
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


