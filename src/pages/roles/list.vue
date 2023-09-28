<script setup>
import { useRoleListStore } from '@/views/apps/role/useRoleListStore';
import Swal from 'sweetalert2';
const { t } = useI18n()
const roleListStore = useRoleListStore()
const searchQuery = ref('')
const rowPerPage = ref(1)
const currentPage = ref(1)
const totalPage = ref(1)
const totalRoles = ref(0)
const status_code = ref(400)
const Roles = ref([])
const loading = ref(true)
// 👉 Fetching Roles
const fetchRoles = () => {
  roleListStore.fetchRoles({
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
    Roles.value = response.data.data.data
    rowPerPage.value = response.data.data.meta.per_page
    totalPage.value = response.data.data.meta.last_page
    totalRoles.value = response.data.data.meta.total
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
      roleListStore.deleteRole(id).then(response => {
          if(response.status == 200){
              const index = Roles.value.findIndex(item => item.id === id);
              if (index !== -1) {
                Roles.value.splice(index, 1);
              }
          }
      })
    }
  })
}


watchEffect(fetchRoles)

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
  const firstIndex = Roles.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex  = Roles.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalRoles.value } entries`
})




</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard :title="$t('Roles')">
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
                :to="{ name: 'roles-add',action: 'read',subject: 'roles-create'}"
              >
                {{$t('Add New Role')}}
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
                <th scope="col">{{ $t('Actions') }}</th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              
              <tr
                v-for="role in Roles"
                :key="role.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 role -->
                <td>{{ role.id}}</td>
                <td>
                  <div class="d-flex align-center">

                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'roles-show-id', params: { id: role.id }  ,action: 'read',subject: 'roles-show'}"
                          class="font-weight-medium user-list-name"
                        >
                        <!-- <RouterLink
                          :to="{ name: 'roles-edit-id', params: { id: role.id }  ,action: 'read',subject: 'roles-edit'}"
                          class="font-weight-medium user-list-name"
                        > -->
                          {{ role.name }}
                        </RouterLink>
                      </h6>
                    </div>
                  </div>
                </td>
                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    :to="{ name: 'roles-edit-id', params: { id: role.id } ,action: 'read',subject: 'roles-edit'}"
                    icon
                    size="x-small"
                    color="info"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                      :to="{ name: 'roles-edit-id', params: { id: role.id } ,action: 'read',subject: 'roles-edit'}"
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
                      @click="deleteRow(role.id)"
                    />
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!Roles.length">
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
    subject: roles-list
</route>

