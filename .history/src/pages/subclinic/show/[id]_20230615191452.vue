<script setup>
import { useSubClinicListStore } from '@/views/apps/subclinic/useSubClinicListStore'
import { useQuestionListStore } from '@/views/apps/question/useQuestionListStore'
import axios from '@axios'
import * as validate from '@validators'
import { useToast } from 'vue-toast-notification'
import Swal from 'sweetalert2'

const SubClinicListStore = useSubClinicListStore()
const { t } = useI18n()
const QuestionListStore = useQuestionListStore()

const $toast = useToast()
const router = useRouter()
const route = useRoute()
const SubClinicData         = ref()
const questions = ref([])

const deleteRow = id => {
  Swal.fire({
    title:t('Confirm delete message'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText:  t('confirm delete'),
    cancelButtonText:  t('cancel'),
  }).then(result => {
    if (result.isConfirmed) {
      QuestionListStore.deleteQuestion(id).then(response => {
        if(response.status == 200){
          const index = questions.value.findIndex(item => item.id === id)
          if (index !== -1) {
            questions.value.splice(index, 1)
          }
        }
      })
    }
  })
}

const actives = [
  { value: 0, name:"Deactive" },
  { value: 1, name:"Active" },
]

const title               = ref()
const description               = ref()
const clinic_id          = ref()
const active             = ref()

SubClinicListStore.fetchsubClinic(Number(route.params.id)).then(response => {
  title.value                  = response.data.data.title
  description.value                  = response.data.data.description
  clinic_id.value             = response.data.data.clinic
  active.value                = response.data.data.active
  questions.value  = response.data.data.questions

})
</script>

<template>
  <VRow>
    <VCol
      cols="6"
      md="6"
    >
      <VCard
        :title="$t('Questioneer Details')"
      >
        <VCol cols="12">
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                title :
              </VSubheader>{{ title }}
            </VCol>
            
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                clinic :
              </VSubheader>{{ clinic_id }}
            </VCol>
              
                  
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                Status :
              </VSubheader>{{ (active == 0)?'InActive':'Active' }}
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VSubheader style="font-weight: bold;">
                description :
              </VSubheader>{{ description }}
            </VCol>
          </VRow>
        </VCol>
      </VCard>
    </VCol>

    <VCol
      cols="6"
      md="6"
    >
      <VBtn
        prepend-icon="tabler-plus"
        :to="{ name: 'question-add-id', params: { id: route.params.id },action: 'read',subject: 'question-create'}"
      >
        {{ $t('Add new question') }}
      </VBtn><br><br>
      <VTable class="text-no-wrap">
        <!-- 👉 table head -->
        <thead>
          <tr>
            <th scope="col">
              #
            </th>
            <th scope="col">
              {{ $t('question') }}
            </th>
           
            <th scope="col">
              {{ $t('Actions') }}
            </th>
          </tr>
        </thead>
        <!-- 👉 table body -->
        <tbody>
          <tr
            v-for="question in questions"
            :key="question.id"
            style="height: 3.75rem;"
          >
            <!-- 👉 Patient -->
            <td>{{ question.id }}</td>
           
            <td>{{ question.questioneer_id= }}</td>

            <!-- 👉 Actions -->
            <td
              class="text-center"
              style="width: 5rem;"
            >
              <VBtn
                v-if="$can('read', 'question-edit')"
                :to="{ name: 'question-edit-id', params: { id: question.id } ,action: 'read',subject: 'question-edit'}"
                icon
                size="x-small"
                color="info"
                variant="text"
              >
                <VIcon
                  size="22"
                  icon="tabler-edit"
                  :to="{ name: 'question-edit-id', params: { id: question.id } ,action: 'read',subject: 'question-edit'}"
                />
              </VBtn>
                  
             

              <VBtn
                v-if="$can('read', 'question-delete')"
                icon
                size="x-small"
                color="error"
                variant="text"
              >
                <VIcon
                  size="22"
                  icon="tabler-trash"
                  @click="deleteRow(question.id)"
                />
              </VBtn>
            </td>
          </tr>
        </tbody>

        <!-- 👉 table footer  -->
      </VTable>
    </VCol>
  </VRow>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: questioneer-show
  </route>


