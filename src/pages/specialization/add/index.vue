
<script setup>
import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const router = useRouter()

const name     = ref()

const Create = () => {
  axios.post('/specialization/create', {
    name: name.value,
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
    :title="$t('Add new specialization')"
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
                v-model="name"
                :label="$t('Name')"
                :rules="[validate.requiredValidator,validate.alphaDashValidator]"
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
    subject: specialization-create
  </route>


