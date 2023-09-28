
<script setup>
import { useSpecializationListStore } from '@/views/apps/specialization/useSpecializationListStore';
import axios from '@axios';
import * as validate from '@validators';
import { useToast } from 'vue-toast-notification';
const $toast = useToast()
const router = useRouter()
const route = useRoute()

const SpecializationListStore = useSpecializationListStore()
const actives = [
  { value: 0, name:"Deactive"},
  { value: 1, name:"Active"},
]
const name     = ref()
const active    = ref()

SpecializationListStore.fetchSpecialization(Number(route.params.id)).then(response => {

  name.value   = response.data.data.name
  active.value = response.data.data.active
})

const update = () => {
  axios.post('/specialization/edit/'+route.params.id, {
    name: name.value,
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


</script>

<template>
   <VCard
    :title="$t('Edit specialization')"
   >
    <VCol cols="12" v-if="name">
      <VForm  @submit.prevent="update">
        <VRow >
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
    </VCol>
    <VRow v-if="!name">
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
  </VCard>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: specialization-edit
</route>


