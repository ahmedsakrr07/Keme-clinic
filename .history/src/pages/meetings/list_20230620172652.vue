<script setup>
import { useMeetingListStore } from '@/views/apps/meeting/useMeetingListStore'
import axios from '@axios'
import * as validate from '@validators'
import Swal from 'sweetalert2'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const { t } = useI18n()
const MeetingListStore = useDoctorListStore()
const route = useRoute()
const router = useRouter()
const isDialogVisible = ref(false)

const days = [
  { value: 1, name:"Saturday" },
  { value: 2, name:"Sunday" },
  { value: 3, name:"Monday" },
  { value: 4, name:"Tuesday" },
  { value: 5, name:"Wednesday" },
  { value: 6, name:"Thursday" },
  { value: 7, name:"Friday" },
]

const starts = [
  '12:00 am',
  '12:30 am',
  '1:00 am',
  '1:30 am',
  '2:00 am',
  '2:30 am',
  '3:00 am',
  '3:30 am',
  '4:00 am',
  '4:30 am',
  '5:00 am',
  '5:30 am',
  '6:00 am',
  '6:30 am',
  '7:00 am',
  '7:30 am',
  '8:00 am',
  '8:30 am',
  '9:00 am',
  '9:30 am',
  '10:00 am',
  '10:30 am',
  '11:00 am',
  '11:30 am',
  '12:00 pm',
  '12:30 pm',
  '1:00 pm',
  '1:30 pm',
  '2:00 pm',
  '2:30 pm',
  '3:00 pm',
  '3:30 pm',
  '4:00 pm',
  '4:30 pm',
  '5:00 pm',
  '5:30 pm',
  '6:00 pm',
  '6:30 pm',
  '7:00 pm',
  '7:30 pm',
  '8:00 pm',
  '8:30 pm',
  '9:00 pm',
  '9:30 pm',
  '10:00 pm',
  '10:30 pm',
  '11:00 pm',
  '11:30 pm',
]

const day    = ref()
const start = ref('')
const end = ref('')

const searchQuery = ref('')
const rowPerPage = ref(1)
const currentPage = ref(1)
const totalPage = ref(1)
const totalAppointments = ref(0)
const status_code = ref(400)
const Appointments = ref([])
const loading = ref(true)


// 👉 Fetching appointments
const fetchAppointments = () => {
  DoctorListStore.fetchAppointments({
    id:Number(route.params.id),
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
    Appointments.value = response.data.data.data
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
      DoctorListStore.deleteAppointments(id).then(response => {
        if(response.status == 200){
          const index = Appointments.value.findIndex(item => item.id === id)
          if (index !== -1) {
            Appointments.value.splice(index, 1)
          }
        }
      })
    }
  })
}

const ChangeStatus = id => {
  DoctorListStore.ChangeDoctorStatus(id)
}


watchEffect(fetchAppointments)

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
  const firstIndex = Appointments.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex  = Appointments.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalAppointments.value } entries`
})


const Create = () => {
  axios.post('/doctor/add/appointments', {
    doctor_id: route.params.id,
    day: day.value,
    start: start.value,
    end: end.value,
  }).then(r => {
    const { message,data,status_code } = r.data
    if(status_code == 200)
      $toast.success(message, { position: 'top-right' })
    fetchAppointments()

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
              <VSelect
                v-model="day"
                :items="days"
                :item-title="$t('name')"
                item-value="value"
                :label="$t('Day')"
                :rules="[validate.requiredValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VSelect
                v-model="start"
                :items="starts"
                label="Start"
                :rules="[validate.requiredValidator]"
              />
            </VCol>
            <VCol
              cols="12"
              sm="4"
            >
              <VSelect
                v-model="end"
                :items="starts"
                label="End"
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
                  {{ $t('Day') }}
                </th>
                <th scope="col">
                  {{ $t('Start Time') }}
                </th>
                <th scope="col">
                  {{ $t('End Time') }}
                </th>
                <th scope="col">
                  {{ $t('Actions') }}
                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="(Appointment,index) in Appointments"
                :key="index"
                style="height: 3.75rem;"
              >
                <!-- 👉 Doctor -->
                <td>{{ index+1 }}</td>
                <td>{{ Appointment.day }} </td>
                <td>{{ Appointment.start }} </td>
                <td>{{ Appointment.end }} </td>
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
                      @click="deleteRow(Appointment.id)"
                    />
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
        
            <tfoot v-show="!Appointments.length">
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


