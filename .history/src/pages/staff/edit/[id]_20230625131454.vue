
<script setup>
import { useStaffListStore } from '@/views/apps/staff/useStaffListStore'
import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const router = useRouter()
const route = useRoute()
const doctors = ref([])

const StaffListStore = useStaffListStore()
const roles = ref([])
const isPasswordVisible = ref(false)

StaffListStore.fetchRoles().then(response => {
  roles.value = response.data.data.data
})

StaffListStore.fetchDoctors().then(response => {
  doctors.value = response.data.data.data
})

const actives = [
  { value: 0, name:"Deactive" },
  { value: 1, name:"Active" },
]

const name     = ref()
const email    = ref()
const phone    = ref()
const password    = ref()
const active    = ref()
const doctor_id      = ref()
const clinics = ref([])
const clinic_id      = ref()

StaffListStore.fetchClinics().then(response => {
  clinics.value = response.data.data.data
})

StaffListStore.fetchStaff(Number(route.params.id)).then(response => {
  name.value   = response.data.data.name
  email.value  = response.data.data.email
  phone.value  = response.data.data.phone
  active.value = response.data.data.active
  doctor_id.value = response.data.data.doctor_id
  clinic_id.value = response.data.data.clinic_id


})

const update = () => {
  axios.post('/staff/edit/'+route.params.id, {
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    active: active.value,
    doctor_id: doctor_id.value,
    clinic_id: clinic_id.value,


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
    :title="$t('Edit Transcriber')"
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
              v-model="name"
              :label="$t('Name')"
              :rules="[validate.requiredValidator,validate.alphaDashValidator]"
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
            <VSelect
              v-model="clinic_id"
              :label="$t('Clinics')"
              :items="clinics"
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
              v-model="password"
              :label="$t('Password')"
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
            <VSelect
              v-model="doctor_id"
              :label="$t('Doctors')"
              :items="doctors"
              item-title="name"
              item-value="id"
            />
          </vcol>
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
    subject: staff-edit
</route>


