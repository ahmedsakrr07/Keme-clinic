<script setup>
import { useUserListStore } from '@/views/apps/user/useUserListStore';
import axios from '@axios';
import * as validate from '@validators';
import { useToast } from 'vue-toast-notification';
let formData = new FormData();

const $toast = useToast()
const router = useRouter()
const userListStore = useUserListStore()
const route = useRoute()
const userData = ref()
const userTab = ref(null)

const profiles = ref()
const name     = ref()
const email    = ref()
const photo    = ref()
const Signature    = ref()
const phone    = ref()
const clinic_id    = ref()
const password    = ref()
const role      = ref()
const active    = ref()
const specialization_id      = ref()
const clinics = ref([])
const specializations = ref([])

const userDatax = JSON.parse(localStorage.getItem('userData') || 'null')

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        photo.value = fileReader.result
    }
  }
}

const changeSignature = fiSignaturele => {
  const fileReader = new FileReader()
  const { files } = Signature.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        Signature.value = fileReader.result
    }
  }
}

userListStore.fetchUser(Number(userDatax.id)).then(response => {
  name.value   = response.data.data.name 
 // photo.value   = response.data.data.photo 
  clinic_id.value   = response.data.data.clinic_id
  specialization_id.value = response.data.data.specialization_id
  email.value  = response.data.data.email
  phone.value  = response.data.data.phone
  role.value   = response.data.data.role
  active.value = response.data.data.active
})
userListStore.fetchClinics().then(response => {
  clinics.value = response.data.data.data
})
userListStore.fetchSpecializations().then(response => {
  specializations.value = response.data.data.data
})


const update = () => {
  axios.post('/team/edit/'+userDatax.id,{
    
    name : name.value,
    specialization_id : specialization_id.value,
    photo: photo.value,
    clinic_id: clinic_id.value,    
    email: email.value,
    phone: phone.value,
    password: password.value,
    active: active.value,
    role: role.value,
  }).then(r => {
    const { message,data,status_code } = r.data
    if(status_code == 200)
      $toast.success(message, { position: 'top-right' })

    //router.go(-1)
  }).catch(error => {
    const { message,data,status_code } = error.response.data
    if(status_code != 200)
      $toast.error(message, { position: 'top-right' })
  })
}
</script>

<template>
  <VCard
    :title="$t('Edit Profile')"
  >
    <VCol cols="12">
      <VBtn
        v-if="userDatax.role =='Doctor'"
        prepend-icon="tabler-plus"
        :to="{ name: 'doctor-add-appointments-id', params: { id: route.params.id },action: 'read',subject: 'home'}"
      >
        {{ $t('Add Appointments') }}
      </VBtn><br><br>
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
              v-if="$can('read', 'doctor-edit')"
              v-model="clinic_id"
              :label="$t('Clinics')"
              :items="clinics"
              item-title="name"
              item-value="id"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-if="$can('read', 'doctor-edit')"
              v-model="specialization_id"
              :label="$t('Specializations')"
              :items="specializations"
              item-title="name"
              item-value="id"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
          <input
            ref="profiles"
            type="file"
            name="file"
            @input="changeAvatar"
            accept=".jpeg,.png,.jpg,GIF"
          >
         </VCol>
          <!--
            <VCol
            cols="12"
            md="6"
            >
            <VSelect
            v-model="role"
            :label="$t('Role')"
            :items="roles"
            itemTitle="name"
            itemValue="id"
            :rules="[validate.requiredValidator]"
               
            />
            </VCol> 
          -->
          <!--
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
          -->
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
    subject: home
</route>

