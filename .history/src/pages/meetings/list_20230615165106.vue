<script setup>
import { useStaffListStore } from '@/views/apps/staff/useStaffListStore'
import Swal from 'sweetalert2'

const { t } = useI18n()
const StaffListStore = useStaffListStore()

const searchQuery = ref('')
const rowPerPage = ref(1)
const currentPage = ref(1)
const totalPage = ref(1)
const totalStaffs = ref(0)
const status_code = ref(400)
const Staffs = ref([])
const loading = ref(true)


// 👉 Fetching Staffs
const fetchStaffs = () => {
  StaffListStore.fetchStaffs({
    search: searchQuery.value,
    page: currentPage.value,
  }).then(response => {
    Staffs.value = response.data.data.data
    rowPerPage.value = response.data.data.meta.per_page
    totalPage.value = response.data.data.meta.last_page
    totalStaffs.value = response.data.data.meta.total
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
      StaffListStore.deleteStaff(id).then(response => {
        if(response.status == 200){
          const index = Staffs.value.findIndex(item => item.id === id)
          if (index !== -1) {
            Staffs.value.splice(index, 1)
          }
        }
      })
    }
  })
}

const ChangeStatus = id => {
  StaffListStore.ChangeStaffStatus(id)
}


watchEffect(fetchStaffs)

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
  const firstIndex = Staffs.value.length ? (currentPage.value - 1) * rowPerPage.value + 1 : 0
  const lastIndex  = Staffs.value.length + (currentPage.value - 1) * rowPerPage.value
  
  return `Showing ${ firstIndex } to ${ lastIndex } of ${ totalStaffs.value } entries`
})
</script>

<template>
  <!-- Parent container for the calendar month -->
  <div class="calendar-month">
     
    <!-- The calendar header -->
    <div class="calendar-month-header"

    <CalendarDateIndicator />
      <!-- Pagination -->
      <CalendarDateSelector />
    </div>

    <!-- Calendar grid header -->
    <CalendarWeekdays />

    <!-- Calendar grid -->
    <ol class="days-grid">
      <CalendarMonthDayItem />
    </ol>
  </div>
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

