<script setup>
import { useQuestioneerListStore } from '@/views/apps/questioneer/useQuestioneerListStore'
import Swal from 'sweetalert2'

const { t } = useI18n()
const questioneerListStore = useQuestioneerListStore()
const searchQuery = ref('')
const rowPerPage = ref(1)
const currentPage = ref(1)
const totalPage = ref(1)
const totalQuestioneer = ref(0)
const status_code = ref(400)
const Questioneer = ref([])
const loading = ref(true)


// 👉 Fetching Questioneer
const fetchQuestioneer = () => {
  questioneerListStore.fetchquestioneer({
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
    Questioneer.value = response.data.data.data
    rowPerPage.value = response.data.data.meta.per_page
    totalPage.value = response.data.data.meta.last_page
    totalQuestioneer.value = response.data.data.meta.total
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
      questioneerListStore.deletesubClinic(id).then(response => {
        if(response.status == 200){
          const index = Questioneer.value.findIndex(item => item.id === id)
          if (index !== -1) {
            Questioneer.value.splice(index, 1)
          }
        }
      })
    }
  })
}

const ChangeStatus = id => {
  questioneerListStore.ChangeSubClinictatus(id)
}


watchEffect(fetchQuestioneer)

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
  const firstIndex = Questioneer.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex  = Questioneer.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalQuestioneer.value } entries`
})
</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard :title="$t('Sub clinic')">
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
                prepend-icon="tabler-plus"
                :to="{ name: 'subclinic-add',action: 'read',subject: 'subClinic-create'}"
              >
                {{ $t('Add new subClinic') }}
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
                  {{ $t('Clinic') }}
                </th>
                <th scope="col">
                  {{ $t('Specialization') }}
                </th>
                <th scope="col">
                  {{ $t('Doctor') }}
                </th>
                <th scope="col">
                  {{ $t('Assestant') }}
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
                v-for="subClinic in Questioneer"
                :key="subClinic.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 subClinic -->
                <td>{{ subClinic.id }}</td>
                <td>
                  <div
                    v-if="$can('read', 'subClinic-show')"
                    class="d-flex align-center"
                  >
                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'subclinic-show-id', params: { id: subClinic.id } ,action: 'read',subject: 'subClinic-show'}"
                          class="font-weight-medium user-list-name"
                        >
                          {{ subClinic.name }}
                        </RouterLink>
                      </h6>
                    </div>
                  </div>

                  <span v-if="!$can('read', 'subClinic-show')">{{ subClinic.name }}</span>
                </td>
                <td>
                  {{ subClinic.clinic }}
                </td>
                <td>
                  {{ subClinic.specialization }}
                </td>
                <td>
                  {{ subClinic.doctor }}
                </td>
                <td>
                  {{ subClinic.assestant }}
                </td>
                <td>
                  <div class="demo-space-x">
                    <VSwitch
                      :key="subClinic.id"
                      v-model="subClinic.active"
                      :value="subClinic.active"
                      color="success"
                      :true-value="1"
                      :false-value="0"
                      @click="ChangeStatus(subClinic.id)"
                    />
                  </div>
                </td>
                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    v-if="$can('read', 'subClinic-edit')"
                    :to="{ name: 'subclinic-edit-id', params: { id: subClinic.id } ,action: 'read',subject: 'subClinic-edit'}"
                    icon
                    size="x-small"
                    color="info"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                      :to="{ name: 'subclinic-edit-id', params: { id: subClinic.id } ,action: 'read',subject: 'subClinic-edit'}"
                    />
                  </VBtn>

                  <VBtn
                    v-if="$can('read', 'subClinic-edit')"
                    :to="{ name: 'subclinic-add', params: { id: subClinic.id } ,action: 'read',subject: 'subClinic-edit'}"
                    icon
                    size="x-small"
                    color="info"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                      :to="{ name: 'subclinic-edit-id', params: { id: subClinic.id } ,action: 'read',subject: 'subClinic-edit'}"
                    />
                  </VBtn>

                  <VBtn
                    v-if="$can('read', 'subClinic-delete')"
                    icon
                    size="x-small"
                    color="error"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-trash"
                      @click="deleteRow(subClinic.id)"
                    />
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->

            <tfoot v-show="!Questioneer.length">
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
    subject: subClinic-list
</route>

