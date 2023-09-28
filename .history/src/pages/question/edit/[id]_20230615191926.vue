
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
    :title="$t('Edit Note')"
  >
    <VCol cols="12">
      <VForm
        @submit.prevent="update"
      >
        
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              v-model="doctor_id"
              :label="$t('doctors')"
              :items="doctors"
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
                v-model="date_of_service"
                label="Date Of Service"

                type="date"
              />
            </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_type"
              :label="$t('treatment_type')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
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
          
           
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_modality"
              :label="$t('treatment_modality')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>

          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_goals"
              :label="$t('treatment_goals')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="session_narrative"
              :label="$t('session_narrative')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_response"
              :label="$t('treatment_response')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="diagnosis"
              :label="$t('diagnosis')"
              :rules="[validate.requiredValidator,validate.engishValidator]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="treatment_and_follow_up_plan"
              :label="$t('treatment_and_follow_up_plan')"
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


