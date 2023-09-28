<script setup>
import { useSpecializationListStore } from '@/views/apps/specialization/useSpecializationListStore'
import Swal from 'sweetalert2'

const SpecializationListStore = useSpecializationListStore()

const { t } = useI18n()

const searchQuery = ref('')
const rowPerPage = ref(1)
const currentPage = ref(1)
const totalPage = ref(1)
const totalSpecializations = ref(0)
const status_code = ref(400)
const Specializations = ref([])
const loading = ref(true)


// 👉 Fetching Specializations
const fetchSpecializations = () => {
  SpecializationListStore.fetchSpecializations({
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
 
    Specializations.value = response.data.data.data
    rowPerPage.value = response.data.data.meta.per_page
    totalPage.value = response.data.data.meta.last_page
    totalSpecializations.value = response.data.data.meta.total
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
      SpecializationListStore.deleteSpecialization(id).then(response => {
        if(response.status == 200){
          const index = Specializations.value.findIndex(item => item.id === id)
          if (index !== -1) {
            Specializations.value.splice(index, 1)
          }
        }
      })
    }
  })
  
 
    
}

const ChangeStatus = id => {
  SpecializationListStore.ChangeSpecializationStatus(id)
}


watchEffect(fetchSpecializations)

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
  const firstIndex = Specializations.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex  = Specializations.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalSpecializations.value } entries`
})
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard :title="$t('Specializations')">
          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <div
              class="me-3"
              style="width: 50px;"
            />
            <VSpacer />

            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
              <!-- 👉 Search  -->
              <div style="width: 20rem;">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Search"
                  density="compact"
                />
              </div>


              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                :to="{ name: 'specialization-add',action: 'read',subject: 'specialization-create'}"
              >
                {{ $t('Add') }}
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
                v-for="Specialization in Specializations"
                :key="Specialization.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 Specialization -->
                <td>{{ Specialization.id }}</td>
                <td>
                  <div class="d-flex align-center">
                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'specialization-show-id', params: { id: Specialization.id } ,action: 'read',subject: 'Specialization-show'}"
                          class="font-weight-medium user-list-name"
                        >
                          {{ Specialization.name }}
                        </RouterLink>
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="demo-space-x">
                    <VSwitch
                      :key="Specialization.id"
                      v-model="Specialization.active"
                      :value="Specialization.active"
                      color="success"
                      :true-value="1"
                      :false-value="0"
                      @click="ChangeStatus(Specialization.id)"
                    />
                  </div>
                </td>
                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    :to="{ name: 'specialization-edit-id', params: { id: Specialization.id } ,action: 'read',subject: 'specialization-edit'}"
                    icon
                    size="x-small"
                    color="info"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                      :to="{ name: 'specialization-edit-id', params: { id: Specialization.id } ,action: 'read',subject: 'specialization-edit'}"
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
                      @click="deleteRow(Specialization.id)"
                    />
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!Specializations.length">
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
    subject: specialization-list
</route>

