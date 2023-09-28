
<script setup>
import { useNoteListStore } from '@/views/apps/note/useNoteListStore'
import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const router = useRouter()
const NoteListStore = useNoteListStore()
const route = useRoute()

// const clinics = ref([]);
const doctors = ref([])

NoteListStore.fetchDoctors().then(response => {
  doctors.value = response.data.data.data
})

const questioneer_id = ref(route.params.id)
const question = ref()

// const clinic_id = ref()
const Create = () => {
  axios.post('/note/create', {
    questioneer_id: questioneer_id.value,
    question : question.value,
    
  
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

// ClinicListStore.fetchSelectClinic().then(response => {
//   clinics.value = response.data.data
// })
</script>



<template>
  <VCard
    :title="$t('Add new Question')"
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
                v-model="question"
                :label="$t('question')"
                :rules="[validate.requiredValidator,validate.engishValidator]"
              />
            </VCol>

           
          </VRow>
          <br>
        
          <VRow />
          <br> 
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
    subject: note-create
  </route>


