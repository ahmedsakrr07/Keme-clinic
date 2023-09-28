<script setup>
import { useClinicListStore } from '@/views/apps/clinic/useClinicListStore';
import Swal from 'sweetalert2';
const { t } = useI18n()
const ClinicListStore = useClinicListStore()
const searchQuery = ref('')
const rowPerPage = ref(1)
const currentPage = ref(1)
const totalPage = ref(1)
const totalClinics = ref(0)
const status_code = ref(400)
const Clinics = ref([])
const loading = ref(true)
// 👉 Fetching Clinics
const fetchClinics = () => {
  ClinicListStore.fetchClinics({
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
    Clinics.value = response.data.data.data
    rowPerPage.value = response.data.data.meta.per_page
    totalPage.value = response.data.data.meta.last_page
    totalClinics.value = response.data.data.meta.total
  }).catch(error => {
    console.error(error)
  }).finally(() => {
      loading.value =  false
  });
}
const deleteRow = (id) => {
  Swal.fire({
    title:t('Confirm delete message'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText:  t('confirm delete'),
    cancelButtonText:  t('cancel')
  }).then((result) => {
    if (result.isConfirmed) {
      ClinicListStore.deleteClinic(id).then(response => {
          if(response.status == 200){
              const index = Clinics.value.findIndex(item => item.id === id);
              if (index !== -1) {
                Clinics.value.splice(index, 1);
              }
          }
      })
    }
  })

 
    
}
const ChangeStatus = (id) => {
   ClinicListStore.ChangeClinicStatus(id)
}


watchEffect(fetchClinics)

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
  const firstIndex = Clinics.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex  = Clinics.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalClinics.value } entries`
})




</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard :title="$t('Clinics')">
          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div
              class="me-3"
              style="width: 80px;"
            >

            </div>
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
                prepend-icon="tabler-plus"
                :to="{ name: 'clinic-add',action: 'read',subject: 'clinic-create'}"
              >
                {{$t('Add new clinic')}}
              </VBtn>
            </div>
          </VCardText>

          <VDivider />

          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col"> # </th>
                <th scope="col">{{ $t('Name') }} </th>
                <th scope="col">{{ $t('Email') }} </th>
                <th scope="col">{{ $t('Phone') }} </th>
                <th scope="col">{{ $t('Manager') }} </th>
                <th scope="col">{{ $t('Status') }} </th>
                <th scope="col">{{ $t('Actions') }}</th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              
              <tr
                v-for="Clinic in Clinics"
                :key="Clinic.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 Clinic -->
                <td>{{ Clinic.id}}</td>
                <td>
                  <div class="d-flex align-center">

                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'clinic-show-id', params: { id: Clinic.id }  ,action: 'read',subject: 'clinic-show'}"
                          class="font-weight-medium user-list-name"
                        >
                          {{ Clinic.name }}
                        </RouterLink>
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  {{ Clinic.email }}
                </td>
                <td>
                  {{ Clinic.phone }}
                </td>
                <td>
                  {{ Clinic.manager }}
                </td>
                <td>
                  <div class="demo-space-x">
                    <VSwitch
                      v-model="Clinic.active"
                      :value="Clinic.active"
                       color="success"
                      :key="Clinic.id"
                      :trueValue="1"
                      :falseValue="0"
                      @click="ChangeStatus(Clinic.id)"
                    />
                  </div>
                  
                </td>
                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    :to="{ name: 'clinic-edit-id', params: { id: Clinic.id } ,action: 'read',subject: 'clinic-edit'}"
                    icon
                    size="x-small"
                    color="info"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                      :to="{ name: 'clinic-edit-id', params: { id: Clinic.id } ,action: 'read',subject: 'clinic-edit'}"
                    />
                  </VBtn>

                  <VBtn
                    icon
                    size="x-small"
                    color="error"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-trash"
                      @click="deleteRow(Clinic.id)"
                    />
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->

            <tfoot v-show="!Clinics.length">
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
                    <div class="effect-1 effects"></div>
                    <div class="effect-2 effects"></div>
                    <div class="effect-3 effects"></div>
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
    subject: clinic-list
</route>

