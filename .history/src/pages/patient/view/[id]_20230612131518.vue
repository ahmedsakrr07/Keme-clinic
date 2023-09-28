
<script setup>
import { usePatientListStore } from '@/views/apps/patient/usePatientListStore'
import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const router = useRouter()
const route = useRoute()

const PatientListStore = usePatientListStore()
const roles = ref([])
const isPasswordVisible = ref(false)

PatientListStore.fetchRoles().then(response => {
  roles.value = response.data.data.data
})

const actives = [
  { value: 0, name:"Deactive" },
  { value: 1, name:"Active" },
]

const name = ref()
const id = ref()

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
  <VRow>
    <VCol
      cols="6"
      md="6"
    >
      <VCard
        :title="$t('Patient Profile')"
        style="background-color: rgb(115 103 240);"
      />

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
      </VCard><br>
      <VCard :title="$t('* Address Information')">
        <VCol cols="12">
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Address Line 1 :
              </VSubheader>{{ address1 }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Address Line 2 :
              </VSubheader>{{ address2 }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                City :
              </VSubheader>{{ city }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                State :
              </VSubheader>{{ state }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Zip Code :
              </VSubheader>{{ zip_code }}
            </VCol>
          </VRow>
            
          <VCol cols="12">
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
      </VCard><br>
      
      <VCard>
        <VCol cols="12">
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Birth Date :
              </VSubheader>{{ birth_date }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Gender :
              </VSubheader>{{ gender }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Relationship Status :
              </VSubheader>{{ relationship_status }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Employment Status :
              </VSubheader>{{ employment_status }}
            </VCol>
          </VRow>
            
          <VCol cols="12">
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
      </VCard><br>
      <VCard :title="$t('* Emergency Contact')">
        <VCol cols="12">
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Name :
              </VSubheader>{{ emergency_name }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Relation :
              </VSubheader>{{ emergency_relation }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Email :
              </VSubheader>{{ emergency_email }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Phone Number :
              </VSubheader>{{ emergency_phone_number }}
            </VCol>
          </VRow>
            
              
          <VCol cols="12">
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
      </VCard><br>
      <VCard :title="$t('* Rules Of Billing / Credit')">
        <VCol cols="12">
          <VRow>
            <VCol
              cols="6"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                * Rules Of Billing
              </VSubheader><br><br>
            </VCol>
            <VCol
              cols="6"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                * Insurance Information
              </VSubheader><br><br>
            </VCol>
          </VRow>
              
          <VRow>
            <VCol
              cols="6"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Rules Of Billing :
              </VSubheader>{{ billing }}
            </VCol>
            <VCol
              cols="6"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Insurance Number :
              </VSubheader>{{ insurance_number }}
            </VCol>
          </VRow>
            
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
      </VCard><br>
   
    </VCol>

   <VCol
   cols="6"
      md="6">
      <VBtn
                prepend-icon="tabler-plus"
                :to="{ name: 'note-add', params: { id: id },action: 'read',subject: 'note-create'}"
              >
                {{$t('Add new note')}}
              </VBtn><br><br>
      <VTable class="text-no-wrap">
        <!-- 👉 table head -->
        <thead>
          <tr>
            <th scope="col">
              #
            </th>
            <th scope="col">
              {{ $t('Name') }}
            </th>
            <th scope="col">
              {{ $t('Email') }}
            </th>
            <th scope="col">
              {{ $t('Phone') }}
            </th>
          </tr>
        </thead>
        <!-- 👉 table body -->
        <tbody>
          <tr>
            <!-- 👉 Patient -->
            <td>1</td>
            <td>
              samira
            </td>
            <td>
              samira@gmail.com
            </td>
            <td>
              768965645
            </td>
          </tr>
        </tbody>

        <!-- 👉 table footer  -->
      </VTable>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: patient-edit
</route>


