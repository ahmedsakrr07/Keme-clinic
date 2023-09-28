
<script setup>
import { useQuestionListStore } from '@/views/apps/question/useQuestionListStore'
import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const router = useRouter()
const route = useRoute()

const QuestionListStore = useQuestionListStore()
const roles = ref([])

QuestionListStore.fetchRoles().then(response => {
  roles.value = response.data.data.data
})


const questioneer_id = ref(route.params.id)
const question = ref()

NoteListStore.fetchNote(Number(route.params.id)).then(response => {
  questioneer_id.value = response.data.data.questioneer_id
  question.value = response.data.data.question
  
})

const update = () => {
  axios.post('/question/edit/'+route.params.id, {
    questioneer_id: questioneer_id.value,
    question: question.value,
    
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
    :title="$t('Edit Question')"
  >
    <VCol cols="12">
      <VForm
        @submit.prevent="update"
      >
        
        <VRow>
         
            <VTextField
              v-model="question"
              :label="$t('question')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="chief_complaint"
              :label="$t('chief_complaint')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
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
     
    </VCol>
  </VCard>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: note-edit
</route>


