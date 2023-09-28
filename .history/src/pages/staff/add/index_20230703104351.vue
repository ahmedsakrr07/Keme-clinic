
<script setup>
import { useStaffListStore } from '@/views/apps/staff/useStaffListStore';
import axios from '@axios';
import * as validate from '@validators';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()
const router = useRouter()

const StaffListStore = useStaffListStore()
const roles = ref([]);
const isPasswordVisible = ref(false)


const actives = [
  { value: 0, name:"Deactive"},
  { value: 1, name:"Active"},
]

const name     = ref()
const email    = ref()
const phone    = ref()
const password  = ref()
const active    = ref()
const clinics = ref([])
const clinic_id      = ref()

StaffListStore.fetchClinics().then(response => {
  clinics.value = response.data.data.data
})

const Create = () => {
  axios.post('/staff/create', {
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    active: active.value,
    clinic_id: clinic_id.value,

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
    :title="$t('Add New Transcriber')"
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
                  :rules="[validate.requiredValidator]"
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
    subject: staff-create
  </route>
