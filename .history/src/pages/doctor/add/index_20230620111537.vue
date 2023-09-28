
<script setup>
<<<<<<< HEAD
import { useDoctorListStore } from '@/views/apps/doctor/useDoctorListStore'
import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'

=======
import { useDoctorListStore } from '@/views/apps/doctor/useDoctorListStore';
import axios from '@axios';
import * as validate from '@validators';
import { useToast } from 'vue-toast-notification';
>>>>>>> 65380c44b960efbb652de68a2ba73a4e019b8291
const $toast = useToast()
const router = useRouter()

const DoctorListStore = useDoctorListStore()

const isPasswordVisible = ref(false)
<<<<<<< HEAD
const specializations = ref([])
const clinics = ref([])

=======
const specializations = ref([]);
>>>>>>> 65380c44b960efbb652de68a2ba73a4e019b8291

DoctorListStore.fetchSpecializations().then(response => {
  specializations.value = response.data.data.data
})
<<<<<<< HEAD
DoctorListStore.fetchClinics().then(response => {
  clinics.value = response.data.data.data
})

const actives = [
  { value: 0, name:"Deactive" },
  { value: 1, name:"Active" },
]

=======
const actives = [
  { value: 0, name:"Deactive"},
  { value: 1, name:"Active"},
]
>>>>>>> 65380c44b960efbb652de68a2ba73a4e019b8291
const name     = ref()
const email    = ref()
const phone    = ref()
const password    = ref()
const role      = ref()
const specialization_id      = ref()
<<<<<<< HEAD
const clinic_id      = ref()

=======
>>>>>>> 65380c44b960efbb652de68a2ba73a4e019b8291
const active    = ref()

const Create = () => {
  axios.post('/doctor/create', {
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    active: active.value,
    role: role.value,
<<<<<<< HEAD
    specialization_id: specialization_id.value,
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
=======
    specialization_id:specialization_id.value
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

>>>>>>> 65380c44b960efbb652de68a2ba73a4e019b8291
</script>



<template>
<<<<<<< HEAD
  <VCard
    :title="$t('Add new doctor')"
  >
    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <VCol cols="12">
        <VForm @submit.prevent="Create">
          <VRow>
=======
   <VCard
    :title="$t('Add new doctor')"
   >
    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <VCol cols="12">
        <VForm  @submit.prevent="Create">
          <VRow >
>>>>>>> 65380c44b960efbb652de68a2ba73a4e019b8291
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="name"
                :label="$t('Name')"
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
                :rules="[validate.requiredValidator]"
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
<<<<<<< HEAD
                v-model="specialization_id"
                :label="$t('Specializations')"
                :items="specializations"
                item-title="name"
                item-value="id"
                :rules="[validate.requiredValidator]"
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
              <VSelect
                v-model="active"
                :label="$t('Status')"
                :items="actives"
                :item-title="$t('name')"
                item-value="value"
                :rules="[validate.requiredValidator]"
              />
            </VCol>
          </VRow>
          <VCol cols="2">
            <VBtn
              block
              type="submit"
            >
              {{ $t('Add') }}
            </VBtn>
          </VCol>
=======
                  v-model="specialization_id"
                  :label="$t('Specializations')"
                  :items="specializations"
                  itemTitle="name"
                  itemValue="id"
                  :rules="[validate.requiredValidator]"
                  
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
          <VCol cols="2">
              <VBtn block type="submit">
                {{ $t('Add') }}
              </VBtn>
            </VCol>
>>>>>>> 65380c44b960efbb652de68a2ba73a4e019b8291
        </VForm>
      </VCol>
    </VCardText>
  </VCard>
<<<<<<< HEAD
=======

>>>>>>> 65380c44b960efbb652de68a2ba73a4e019b8291
</template>



<route lang="yaml">
  meta:
    action: read
    subject: doctor-create
  </route>


