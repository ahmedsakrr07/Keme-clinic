<script setup>
import { useStaffListStore } from '@/views/apps/team/useTeamListStore';
import Swal from 'sweetalert2';
const { t } = useI18n()
const TeamListStore = useTeamListStore()

const searchQuery = ref('')
const rowPerPage = ref(1)
const currentPage = ref(1)
const totalPage = ref(1)
const totalTeams = ref(0)
const status_code = ref(400)
const Teams = ref([])
const loading = ref(true)
// 👉 Fetching Teams
const fetchTeams = () => {
  TeamListStore.fetchTeams({
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
    Teams.value = response.data.data.data
    rowPerPage.value = response.data.data.meta.per_page
    totalPage.value = response.data.data.meta.last_page
    totalTeams.value = response.data.data.meta.total
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
      TeamListStore.deleteTeam(id).then(response => {
          if(response.status == 200){
              const index = Teams.value.findIndex(item => item.id === id);
              if (index !== -1) {
                Teams.value.splice(index, 1);
              }
          }
      })
    }
  })
}
const ChangeStatus = (id) => {
   TeamListStore.ChangeTeamStatus(id)
}


watchEffect(fetchTeams)

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
  const firstIndex = Teams.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex  = Teams.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalTeams.value } entries`
})




</script>

<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard :title="$t('Team')">
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
                 v-if="$can('read','team-create')"
                prepend-icon="tabler-plus"
                :to="{ name: 'team-add',action: 'read',subject: 'team-create'}"
              >
                {{$t('Add New Team')}}
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
                <th scope="col">{{ $t('Role') }} </th>
                <th scope="col">{{ $t('Status') }} </th>
                <th scope="col">{{ $t('Actions') }}</th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              
              <tr
                v-for="Team in Teams"
                :key="Team.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 Team -->
                <td>{{ Team.id}}</td>
                <td>
                  <div class="d-flex align-center">

                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'team-show-id', params: { id: Team.id }  ,action: 'read',subject: 'team-show'}"
                          class="font-weight-medium user-list-name"
                        >
                          {{ Team.name }}
                        </RouterLink>
                      </h6>
                    </div>
                  </div>
                </td>
                <td>
                  {{ Team.email }}
                </td>
                <td>
                  {{ Team.phone }}
                </td>
                <td>
                  {{ Team.role }}
                </td>
                <td>
                  <div class="demo-space-x">
                    <VSwitch
                      v-model = "Team.active"
                      :value="Team.active"
                       color="success"
                      :key="Team.id"
                      :trueValue="1"
                      :falseValue="0"
                      @click="ChangeStatus(Team.id)"
                    />
                  </div>
                  
                </td>
                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    :to="{ name: 'team-edit-id', params: { id: Team.id } ,action: 'read',subject: 'team-edit'}"
                    icon
                    size="x-small"
                    color="info"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-edit"
                      :to="{ name: 'team-edit-id', params: { id: Team.id } ,action: 'read',subject: 'team-edit'}"
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
                      @click="deleteRow(Team.id)"
                    />
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!Teams.length">
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
    subject: staff-list
</route>

