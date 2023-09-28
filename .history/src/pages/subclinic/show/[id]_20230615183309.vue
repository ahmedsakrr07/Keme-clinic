<script setup>
import { useSubClinicListStore } from '@/views/apps/subclinic/useSubClinicListStore'

const SubClinicListStore = useSubClinicListStore()
const route = useRoute()
const SubClinicData         = ref()

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
        {{ $t('Add new note') }}
      </VBtn><br><br>
      <VTable class="text-no-wrap">
        <!-- 👉 table head -->
        <thead>
          <tr>
            <th scope="col">
              #
            </th>
            <th scope="col">
              {{ $t('Date Of Service') }}
            </th>
           <th>
            {{ $t('Doctor') }}
            </th>
            <th scope="col">
              {{ $t('Actions') }}
            </th>
          </tr>
        </thead>
        <!-- 👉 table body -->
        <tbody>
          <tr
            v-for="Note in notes"
            :key="Note.id"
            style="height: 3.75rem;"
          >
            <!-- 👉 Patient -->
            <td>{{ Note.id }}</td>
            <td>{{ Note.date_of_service }}</td>
            

            <td>{{Note.doctor}}</td>

            <!-- 👉 Actions -->
            <td
              class="text-center"
              style="width: 5rem;"
            >
              <VBtn
                v-if="$can('read', 'note-edit')"
                :to="{ name: 'note-edit-id', params: { id: Note.id } ,action: 'read',subject: 'note-edit'}"
                icon
                size="x-small"
                color="info"
                variant="text"
              >
                <VIcon
                  size="22"
                  icon="tabler-edit"
                  :to="{ name: 'note-edit-id', params: { id: Note.id } ,action: 'read',subject: 'note-edit'}"
                />
              </VBtn>
                  
              <VBtn
                v-if="$can('read', 'note-edit')"
                :to="{ name: 'note-view-id', params: { id: Note.id } ,action: 'read',subject: 'note-edit'}"
                icon
                size="x-small"
                color="info"
                variant="text"
              >
                <VIcon
                  size="22"
                  icon="tabler-eye"
                  :to="{ name: 'note-view-id', params: { id: Note.id } ,action: 'read',subject: 'note-edit'}"
                />
              </VBtn>

              <VBtn
                v-if="$can('read', 'note-delete')"
                icon
                size="x-small"
                color="error"
                variant="text"
              >
                <VIcon
                  size="22"
                  icon="tabler-trash"
                  @click="deleteRow(Note.id)"
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


