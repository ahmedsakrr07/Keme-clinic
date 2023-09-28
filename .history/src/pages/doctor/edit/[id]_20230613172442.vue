
<script setup>
import { useDoctorListStore } from '@/views/apps/doctor/useDoctorListStore'
import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const router = useRouter()
const route = useRoute()

const DoctorListStore = useDoctorListStore()
const roles = ref([])
const isPasswordVisible = ref(false)
const specializations = ref([])

DoctorListStore.fetchSpecializations().then(response => {
  specializations.value = response.data.data.data
})

DoctorListStore.fetchRoles().then(response => {
  roles.value = response.data.data.data
})

const actives = [
  { value: 0, name:"Deactive" },
  { value: 1, name:"Active" },
]

const name     = ref()
const email    = ref()
const phone    = ref()
const password    = ref()
const role      = ref()
const active    = ref()
const specialization_id      = ref()

DoctorListStore.fetchDoctor(Number(route.params.id)).then(response => {
  name.value   = response.data.data.name
  email.value  = response.data.data.email
  phone.value  = response.data.data.phone
  active.value = response.data.data.active
  active.value = response.data.data.active
  specialize.value = response.data.data.specialize
})

const update = () => {
  axios.post('/doctor/edit/'+route.params.id, {
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    active: active.value,
    role: role.value,
    specialization_id:specialize.value,
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
    :title="$t('Edit Doctor')"
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
    subject: doctor-edit
</route>


