
<script setup>
import { useClinicListStore } from '@/views/apps/clinic/useClinicListStore';
import { useSpecializationListStore } from '@/views/apps/specialization/useSpecializationListStore';
import { useSubClinicListStore } from '@/views/apps/subclinic/useSubClinicListStore';
import axios from '@axios';
import * as validate from '@validators';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()
const router = useRouter()
const route = useRoute()

const ClinicListStore = useClinicListStore()
const SubClinicListStore = useSubClinicListStore()
const SpecializationListStore = useSpecializationListStore()
const clinics = ref([]);
const doctors = ref([]);
const Specializations = ref([]);

const actives = [
  { value: 0, name:"Deactive"},
  { value: 1, name:"Active"},
]
const title               = ref()
const description               = ref()
const clinic_id          = ref()
const active             = ref()

SubClinicListStore.fetchsubClinic(Number(route.params.id)).then(response => {
  title.value                  = response.data.data.title
  description.value                  = response.data.data.description
  clinic_id.value             = response.data.data.clinic_id
  active.value                = response.data.data.active
})

const update = () => {
  axios.post('/subClinic/edit/'+route.params.id, {
    title: title.value,
    description: description.value,
    clinic_id: clinic_id.value,
    active: active.value,
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

SpecializationListStore.fetchSpecializationsSelect().then(response => {
  Specializations.value = response.data.data
})



ClinicListStore.fetchSelectClinic().then(response => {
  clinics.value = response.data.data
})


</script>

<template>
   <VCard
    :title="$t('Edit Questioneer')"
   >
    <VCol cols="12">
      <VForm  @submit.prevent="update" v-if="title">
        <VRow >
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="title1"
              :label="$t('Title1')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
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
          <VCol cols="12" md="6">
            <VSelect
                v-model="clinic_id"
                :label="$t('Clinics')"
                :items="clinics"
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
              {{ $t('Update') }}
            </VBtn>
          </VCol>
      </VForm>
      <VRow v-if="!title">
        <VCol
            cols="12"
            md="6"
          >
            <div class="loading">
              <div class="effect-1 effects"></div>
              <div class="effect-2 effects"></div>
              <div class="effect-3 effects"></div>
            </div>
        </VCol>  
      </VRow>
    </VCol>
  </VCard>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: questioneer-edit
</route>


