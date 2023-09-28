<script setup>
import { useMeetingListStore } from '@/views/apps/meeting/useMeetingListStore'
import axios from '@axios'
import * as validate from '@validators'
import Swal from 'sweetalert2'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const { t } = useI18n()
const MeetingListStore = useMeetingListStore()
const route = useRoute()
const router = useRouter()
const isDialogVisible = ref(false)

const time    = ref()

const searchQuery = ref('')
const rowPerPage = ref(1)
const currentPage = ref(1)
const totalPage = ref(1)
const totalAppointments = ref(0)
const status_code = ref(400)
const meettings = ref([])
const loading = ref(true)
const patients = ref([])
const doctors = ref([])
const patient_id      = ref()
const doctor_id      = ref()


// 👉 Fetching appointments
MeetingListStore.fetchDoctors().then(response => {
  doctors.value = response.data.data.data
})
MeetingListStore.fetchPatients().then(response => {
  patients.value = response.data.data.data
})

const fetchMeetings = () => {
  MeetingListStore.fetchMeetings({
    id:Number(route.params.id),
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
    meettings.value = response.data.data.data
    rowPerPage.value = response.data.data.meta.per_page
    totalPage.value = response.data.data.meta.last_page
    totalAppointments.value = response.data.data.meta.total
  }).catch(error => {
    console.error(error)
  }).finally(() => {
    loading.value =  false
  })
}

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
      MeetingListStore.deleteMeetings(id).then(response => {
        if(response.status == 200){
          const index = meettings.value.findIndex(item => item.id === id)
          if (index !== -1) {
            meettings.value.splice(index, 1)
          }
        }
      })
    }
  })
}


watchEffect(fetchMeetings)

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})


// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = meettings.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex  = meettings.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalAppointments.value } entries`
})


const Create = () => {
  axios.post('/meeting/create', {
    patient_id: patient_id.value,
    doctor_id: doctor_id.id,
    time: time.value,
  }).then(r => {
    const { message,data,status_code } = r.data
    if(status_code == 200)
      $toast.success(message, { position: 'top-right' })
    fetchMeetings()

    //router.go(0)
  }).catch(error => {
    const { message,data,status_code } = error.response.data
    if(status_code != 200)
      $toast.error(message, { position: 'top-right' })
  })
}
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="800"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        {{ $t('Add Meetings') }}
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard :title="$t('Add Time')">
      <VCardText>
        <VForm @submit.prevent="Create">
          <VRow>
           
            <VCol
              cols="12"
              sm="4"
            >
             
                <v-text-field
                  label="Time"
                  v-model="time"
                  type="date"
              </v-text-field>


            </VCol>
          </VRow>
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VSelect
                v-model="patient_id"
                :label="$t('patients')"
                :items="patients"
                item-title="name"
                item-value="id"
                :rules="[validate.requiredValidator]"
              />
            </VCol>
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
            </VRow>
          <VCardText class="d-flex justify-end flex-wrap gap-3">
            <VBtn
              variant="tonal"
              color="secondary"
              @click="isDialogVisible = false"
            >
              Close
            </VBtn>
            <!--
              <VBtn @click="isDialogVisible = false">
              Save
              </VBtn> 
            -->
            <VBtn
              type="submit"
              @click="isDialogVisible = false"
            >
              {{ $t('Add') }}
            </VBtn>
          </VCardText>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard :title="$t('Meetings')">
          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">
                  #
                </th>
                <th scope="col">
                  {{ $t('Doctor') }}
                </th>
                <th scope="col">
                  {{ $t('Patient') }}
                </th>
                <th scope="col">
                  {{ $t('Time') }}
                </th>
                <th scope="col">
                  {{ $t('Actions') }}
                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="(meetting,index) in meettings"
                :key="index"
                style="height: 3.75rem;"
              >
                <!-- 👉 Doctor -->
                <td>{{ index+1 }}</td>
                <td>{{ meetting.doctor }} </td>
                <td>{{ meetting.patient }} </td>
                <td>{{ meetting.time }}</td>
                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    v-if="$can('read', 'home')"
                    icon
                    size="x-small"
                    color="error"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-trash"
                      @click="deleteRow(meetting.id)"
                    />
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
        
            <tfoot v-show="!meettings.length">
              <tr v-if="!loading">
                <td
                  colspan="7"
                  class="text-center"
                >
                  {{ $t('No data available') }}
                </td>
              </tr>
              <tr v-if="loading">
                <td
                  colspan="7"
                  class="text-center"
                >
                  <div class="loading">
                    <div class="effect-1 effects" />
                    <div class="effect-2 effects" />
                    <div class="effect-3 effects" />
                  </div>
                </td>
              </tr>
            </tfoot>
          </VTable>

          <VDivider />

          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
            <span class="text-sm text-disabled">
              {{ paginationData }}
            </span>

            <VPagination
              v-model="currentPage"
              size="small"
              :total-visible="5"
              :length="totalPage"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: home
  </route>


