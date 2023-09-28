
<script setup>
import { useClinicListStore } from '@/views/apps/clinic/useClinicListStore'
import { useSpecializationListStore } from '@/views/apps/specialization/useSpecializationListStore'
import { useSubClinicListStore } from '@/views/apps/subclinic/useSubClinicListStore'

import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const router = useRouter()

const ClinicListStore = useClinicListStore()
const SubClinicListStore = useSubClinicListStore()
const SpecializationListStore = useSpecializationListStore()
const clinics = ref([])


const actives = [
  { value: 0, name:"Deactive" },
  { value: 1, name:"Active" },
]

const title               = ref()
const description               = ref()
const clinic_id          = ref()

const Create = () => {
  axios.post('/subClinic/create', {
    title: title.value,
    description: description.value,
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

SpecializationListStore.fetchSpecializationsSelect().then(response => {
  Specializations.value = response.data.data
})




ClinicListStore.fetchSelectClinic().then(response => {
  clinics.value = response.data.data
})
</script>



<template>
  <VCard
    :title="$t('Add Questioneer')"
  >
    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <VCol cols="12">
        <VForm @submit.prevent="Create">
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="title"
                :label="$t('Title')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="description"
                :label="$t('Description')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
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
          </VRow>
          <VCol cols="2">
            <VBtn
              block
              type="submit"
            >
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
    subject: questioneer-create
  </route>


