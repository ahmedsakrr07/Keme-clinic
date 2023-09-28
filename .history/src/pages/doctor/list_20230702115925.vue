<script setup>
import { useDoctorListStore } from '@/views/apps/doctor/useDoctorListStore'
import Swal from 'sweetalert2'

const { t } = useI18n()
const DoctorListStore = useDoctorListStore()
const searchQuery = ref('')
const rowPerPage = ref(1)
const currentPage = ref(1)
const totalPage = ref(1)
const totalDoctors = ref(0)
const status_code = ref(400)
const Doctors = ref([])
const loading = ref(true)



// 👉 Fetching Doctors
const fetchDoctors = () => {
  DoctorListStore.fetchDoctors({
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
    Doctors.value = response.data.data.data
    rowPerPage.value = response.data.data.meta.per_page
    totalPage.value = response.data.data.meta.last_page
    totalDoctors.value = response.data.data.meta.total
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
      DoctorListStore.deleteDoctor(id).then(response => {
        if(response.status == 200){
          const index = Doctors.value.findIndex(item => item.id === id)
          if (index !== -1) {
            Doctors.value.splice(index, 1)
          }
        }
      })
    }
  })
}

const ChangeStatus = id => {
  DoctorListStore.ChangeDoctorStatus(id)
}


watchEffect(fetchDoctors)

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
  const firstIndex = Doctors.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex  = Doctors.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalDoctors.value } entries`
})
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard :title="$t('Doctor')">
          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div
              class="me-3"
              style="width: 80px;"
            />
            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="width: 15rem;">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Search"
                  density="compact"
                />
              </div>


              <!-- 👉 Add user button -->
              <VBtn
                v-if="$can('read', 'doctor-create')"
              >
                {{ $t('Add new Doctor') }}
              </VBtn>
            </div>
          </VCardText>

          <VDivider />

          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">
                  #
                </th>
                <th scope="col">
                  {{ $t('Name') }}
                </th>
                <th scope="col">
                  {{ $t('Email') }}
                </th>
                <th scope="col">
                  {{ $t('Phone') }}
                </th>
                <th scope="col">
                  {{ $t('Specialiation') }}
                </th>
                <th scope="col">
                  {{ $t('Status') }}
                </th>
                <th scope="col">
                  {{ $t('Actions') }}
                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="Doctor in Doctors"
                :key="Doctor.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 Doctor -->
                <td>{{ Doctor.id }}</td>
                <td>
                  <div class="d-flex align-center">
                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'doctor-view-id', params: { id: Doctor.id } ,action: 'read',subject: 'doctor-show'}"
                          class="font-weight-medium user-list-name"
                        >
                          {{ Doctor.name }}
                        </RouterLink>
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  {{ Doctor.email }}
                </td>
                <td>
                  {{ Doctor.phone }}
                </td>
                <td>
                  {{ Doctor.Specialization }}
                </td>
                <td>
                  <div class="demo-space-x">
                    <VSwitch
                      :key="Doctor.id"
                      v-model="Doctor.active"
                      :value="Doctor.active"
                      color="success"
                      :true-value="1"
                      :false-value="0"
                      @click="ChangeStatus(Doctor.id)"
                    />
                  </div>
                </td>
                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    v-if="$can('read', 'doctor-edit')"
                    :to="{ name: 'doctor-edit-id', params: { id: Doctor.id } ,action: 'read',subject: 'doctor-edit'}"
                    icon
                    size="x-small"
                    color="info"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                      :to="{ name: 'doctor-edit-id', params: { id: Doctor.id } ,action: 'read',subject: 'doctor-edit'}"
                    />
                  </VBtn>
                 

                  <VBtn
                    v-if="$can('read', 'doctor-delete')"
                    icon
                    size="x-small"
                    color="error"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-trash"
                      @click="deleteRow(Doctor.id)"
                    />
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
        
            <tfoot v-show="!Doctors.length">
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

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>

<route lang="yaml">
  meta:
    action: read
    subject: doctor-list
</route>

