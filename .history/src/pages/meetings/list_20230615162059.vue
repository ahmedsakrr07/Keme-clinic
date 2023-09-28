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
  <div class="calendar-date-indicator">
    {{ selectedMonth }}
  </div>
</template>

<script>
export default {
  props: {
    selectedDate: {
      type: Object,
      required: true,
    },
  },

  computed: {
    selectedMonth() {
      return this.selectedDate.format("MMMM YYYY")
    },
  },
}
</script>
<!-- CalendarDateSelector.vue -->
<template>
  <div class="calendar-date-selector">
    <span @click="selectPrevious">﹤</span>
    <span @click="selectCurrent">Today</span>
    <span @click="selectNext">﹥</span>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  name: "CalendarDateSelector",

  props: {
    currentDate: {
      type: String,
      required: true
    },

    selectedDate: {
      type: Object,
      required: true
    }
  },

  methods: {
    selectPrevious() {
      let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    },

    selectCurrent() {
      let newSelectedDate = dayjs(this.currentDate);
      this.$emit("dateSelected", newSelectedDate);
    },

    selectNext() {
      let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
      this.$emit("dateSelected", newSelectedDate);
    }
  }
};
</script>
<script>
import dayjs from "dayjs";
import CalendarDateIndicator from "./CalendarDateIndicator";
import CalendarDateSelector from "./CalendarDateSelector";

export default {
  components: {
    CalendarDateIndicator,
    CalendarDateSelector
  },

  data() {
    return {
      selectedDate: dayjs(),
      today: dayjs().format("YYYY-MM-DD")
    };
  },

  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    }
  }
};
</script>
<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <CalendarDateIndicator
        :selected-date="selectedDate"
        class="calendar-month-header-selected-month"
      />
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>
  </div>
</template>
<template>
  <ol class="day-of-week">
    <li
      v-for="weekday in weekdays"
      :key="weekday"
    >
      {{ weekday }}
    </li>
  </ol>
</template>
 
<script>
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default {
  name: 'CalendarWeekdays',

  computed: {
    weekdays() {
      return WEEKDAYS
    }
  }
}
</script>
<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !isCurrentMonth,
      'calendar-day--today': isToday
    }"
  >
    <span>{{ label }}</span>
  </li>
</template>
 
<script>
import dayjs from "dayjs";

export default {
  name: "CalendarMonthDayItem",

  props: {
    day: {
      type: Object,
      required: true
    },

    isCurrentMonth: {
      type: Boolean,
      default: false
    },

    isToday: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    label() {
      return dayjs(this.day.date).format("D");
    }
  }
};
</script>
<script>
import dayjs from "dayjs";
import CalendarMonthDayItem from "./CalendarMonthDayItem";
import CalendarWeekdays from "./CalendarWeekdays";
 
export default {
  name: "CalendarMonth",

  components: {
    // ...
    CalendarMonthDayItem,
    CalendarWeekdays
  },

  computed: {
    days() {
      return [
        { date: "2020-06-29", isCurrentMonth: false },
        { date: "2020-06-30", isCurrentMonth: false },
        { date: "2020-07-01", isCurrentMonth: true },
        { date: "2020-07-02", isCurrentMonth: true },
        // ...
        { date: "2020-07-31", isCurrentMonth: true },
        { date: "2020-08-01", isCurrentMonth: false },
        { date: "2020-08-02", isCurrentMonth: false }
      ];
    }
  }
};
</script>
<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      // ...
    </div>

    <CalendarWeekdays/>

    <ol class="days-grid">
      <CalendarMonthDayItem
        v-for="day in days"
        :key="day.date"
        :day="day"
        :is-today="day.date === today"
      />
    </ol>
  </div>
</template>
<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
// ...
 
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
computed: {
  // ...
  numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
  }
}
</script>
<!-- CalendarMonth.vue -->
<template>
  <!-- Parent container for the calendar month -->
  <div class="calendar-month">
    <!-- The calendar header -->
    <div
      class="calendar-month-header"
>
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

