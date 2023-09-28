
<script setup>
import onlineStore from "@layouts/components/online-store.vue";
import { useMeetingListStore } from "@/views/apps/meeting/useMeetingListStore";
import axios from "@axios";
import * as validate from "@validators";
import Swal from "sweetalert2";
import { useToast } from "vue-toast-notification";

const $toast = useToast();
const { t } = useI18n();
const MeetingListStore = useMeetingListStore();
const route = useRoute();
const router = useRouter();
const isDialogVisible = ref(true);

const start = ref();
const end = ref();
const status = ref();
const email_reminder = ref();
const text_reminde = ref();
const follow_up_message = ref();
const searchQuery = ref("");
const rowPerPage = ref(1);
const currentPage = ref(1);
const totalPage = ref(1);
const totalAppointments = ref(0);
const meettings = ref([]);
const loading = ref(false);
const patients = ref([]);
const doctors = ref([]);
const patient_id = ref();
const doctor_id = ref();
const time = ref();

const starts = [
  "12:00 am",
  "12:30 am",
  "1:00 am",
  "1:30 am",
  "2:00 am",
  "2:30 am",
  "3:00 am",
  "3:30 am",
  "4:00 am",
  "4:30 am",
  "5:00 am",
  "5:30 am",
  "6:00 am",
  "6:30 am",
  "7:00 am",
  "7:30 am",
  "8:00 am",
  "8:30 am",
  "9:00 am",
  "9:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
  "12:00 pm",
  "12:30 pm",
  "1:00 pm",
  "1:30 pm",
  "2:00 pm",
  "2:30 pm",
  "3:00 pm",
  "3:30 pm",
  "4:00 pm",
  "4:30 pm",
  "5:00 pm",
  "5:30 pm",
  "6:00 pm",
  "6:30 pm",
  "7:00 pm",
  "7:30 pm",
  "8:00 pm",
  "8:30 pm",
  "9:00 pm",
  "9:30 pm",
  "10:00 pm",
  "10:30 pm",
  "11:00 pm",
  "11:30 pm",
];

// 👉 Fetching appointments
MeetingListStore.fetchDoctors().then((response) => {
  doctors.value = response.data.data.data;
});
MeetingListStore.fetchPatients().then((response) => {
  patients.value = response.data.data.data;
});

const fetchMeetings = () => {
  MeetingListStore.fetchMeetings({
    id: Number(route.params.id),
    search: searchQuery.value,
    page: currentPage.value,
  })
    .then((response) => {
      meettings.value = response.data.data.data;
      rowPerPage.value = response.data.data.meta.per_page;
      totalPage.value = response.data.data.meta.last_page;
      totalAppointments.value = response.data.data.meta.total;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const deleteRow = (id) => {
  Swal.fire({
    title: t("Confirm delete message"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: t("confirm delete"),
    cancelButtonText: t("cancel"),
  }).then((result) => {
    if (result.isConfirmed) {
      MeetingListStore.deleteMeeting(id).then((response) => {
        if (response.status == 200) {
          const index = meettings.value.findIndex((item) => item.id === id);
          if (index !== -1) {
            meettings.value.splice(index, 1);
          }
        }
      });
    }
  });
};

const cancelRow = (id) => {
  Swal.fire({
    title: t("Are you sure to cancel this meeting?"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: t("cancel meeting"),
    cancelButtonText: t("cancel"),
  }).then((result) => {
    if (result.isConfirmed) {
      MeetingListStore.cancelMeeting(id).then((response) => {});
    }
  });
};

const confirmRow = (id) => {
  Swal.fire({
    title: t("Are you sure to confirm this meeting?"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: t("confirm meeting"),
    cancelButtonText: t("cancel"),
  }).then((result) => {
    if (result.isConfirmed) {
      MeetingListStore.confirmMeeting(id).then((response) => {});
    }
  });
};

watchEffect(fetchMeetings);

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = meettings.value.length
    ? (currentPage.value - 1) * rowPerPage.value + 1
    : 0;
  const lastIndex =
    meettings.value.length + (currentPage.value - 1) * rowPerPage.value;

  return `Showing ${firstIndex} to ${lastIndex} of ${totalAppointments.value} entries`;
});

const Create = () => {
  axios
    .post("/meeting/create", {
      patient_id: patient_id.value,
      doctor_id: doctor_id.value,
      start: start.value,
      end: end.value,
      time: time.value,
      status: status.value,
      email_reminder: email_reminder.value,
      text_reminde: text_reminde.value,
      follow_up_message: follow_up_message.value,
    })
    .then((r) => {
      const { message, data, status_code } = r.data;
      if (status_code == 200)
        $toast.success(message, { position: "top-right" });
      fetchMeetings();
      window.location.reload();

      //router.go(0)
    })
    .catch((error) => {
      const { message, data, status_code } = error.response.data;
      if (status_code != 200) $toast.error(message, { position: "top-right" });
    });
};

</script>
<template>
  <VDialog v-model="isDialogVisible" max-width="571" >

    <VCard :title="$t('View appointment')">
      <VCardText>
        <VForm @submit.prevent="Create">
          <VRow>
            <VCol cols="12" sm="12">
              <label class="name">Start time</label>
              <VSelect
              style="background-color: #F5F5F5;"
                v-model="start"
                placeholder="Start hour"
                :items="starts"
                :rules="[validate.requiredValidator]"
              />
            </VCol>
            <VCol cols="12" sm="12" style="margin-top: -24px;">
              <label class="name">End time</label>
              <VSelect
              style="background-color: #F5F5F5;"
                v-model="end"
                :items="starts"
                placeholder="end time"
                :rules="[validate.requiredValidator]"
              />
            </VCol>
            <label class="name-2">Doctor Name</label>
            <VCol cols="12" md="12" style="margin-top: -13px;">
              <v-autocomplete
              style="background-color: #F5F5F5;"
                v-model="doctor_id"
                placeholder="choose doctor"
                :items="doctors"
                item-title="name"
                item-value="id"
                :rules="[validate.requiredValidator]"
              ></v-autocomplete>
            </VCol>
            <label class="name-2">patient Name</label>
            <VCol cols="12" md="12" style="margin-top: -13px;">
              <v-autocomplete
              style="background-color: #F5F5F5;"
                v-model="patient_id"
                placeholder="choose patient"
                :items="patients"
                item-title="name"
                item-value="id"
                :rules="[validate.requiredValidator]"
              ></v-autocomplete>
            </VCol>
            <label class="name-2">Clinc</label>
            <VCol cols="12" md="12" style="margin-top: -13px;">
              <v-autocomplete
              style="background-color: #F5F5F5;"
                v-model="clinic"
                placeholder="choose clinic"
                :items="['clinc clinic']"
                :rules="[validate.requiredValidator]"
              ></v-autocomplete>
            </VCol>
            <label class="name-3">Day</label>
            <VCol cols="12" sm="12" style="    margin-top: -10px;">
              <VTextField v-model="time" placeholder="Choose meeting day" type="date" style="background-color: #F5F5F5;" />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="12" >
              <label class="name">Email Reminder</label>
              <VSelect
              style="background-color: #F5F5F5;"
                v-model="email_reminder"
                placeholder="Choose Days"
                :items="[
                  '4 days before',
                  '3 days before',
                  '2 days before',
                  '1 days before',
                  '12 days hours',
                  '6 days hours',
                  '3 days hours',
                  'No reminder',
                ]"
                item-title="name"
                item-value="id"
                :rules="[validate.requiredValidator]"
              />
            </VCol>
            <VCol cols="12" md="12" style="    margin-top: -20px;">
              <label class="name">Text Reminder</label>
              <VSelect
              style="background-color: #F5F5F5;"
                v-model="text_reminde"
                placeholder="Choose Days"
                :items="[
                  '4 days before',
                  '3 days before',
                  '2 days before',
                  '1 days before',
                  '12 days hours',
                  '6 days hours',
                  '3 days hours',
                  'No reminder',
                ]"
                item-title="name"
                item-value="id"
                :rules="[validate.requiredValidator]"
              />
            </VCol>
            <VCol cols="12" md="12" style="    margin-top: -20px;">
              <label class="name">Follow Up Message</label>
              <VSelect
              style="background-color: #F5F5F5;"
                v-model="follow_up_message"
                placeholder="Choose Days"
                :items="[
                  '1 hour after',
                  '6 hour after',
                  '1 days after',
                  'no follow up',
                ]"
                item-title="name"
                item-value="id"
                :rules="[validate.requiredValidator]"
              />
            </VCol>
            <VCol cols="12" md="12" style="margin-left: 8px; margin-top: -15px;">
              <v-checkbox
              label="Confirmed"
                v-model="status"
              />
            </VCol>
            <!-- <VCol cols="12" md="12" style=" margin-top: -15px;">
              <label class="name">status</label>
              <VSelect
              style="background-color: #F5F5F5;"
                v-model="status"
                placeholder="choose statue"
                :items="['Confirmed', 'Unconfirmed']"
              />
            </VCol> -->
          </VRow>
          <VCol cols="12" md="12" style="margin-left: -6px; margin-top: -15px;">
              <v-checkbox
              label="Allow direct access"
              />
            </VCol>
          <VCardText class="d-flex justify-start flex-wrap gap-5">
            <!-- <VBtn
              variant="tonal"
              color="secondary"
              @click="isDialogVisible = false"
            >
              Close
            </VBtn> -->
            <!--
              <VBtn @click="isDialogVisible = false">
              Save
              </VBtn> 
            -->
            <VBtn style="margin-left: -21px;margin-top: -15px " type="submit" @click="isDialogVisible = false">
              {{ $t("Create Appointment") }}
            </VBtn>
          </VCardText>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
    </template>
<style >
.v-card .v-card-title {
    line-height: 1.65rem;
    margin-left: 33%;
    padding-top: 22px;
    font-size: 19px !important;
    color: black;
}
.name {
  color: black;
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
    margin-bottom: 3px;
}
.name-2 {
  color: black;
    font-size: 14px;
    font-weight: 600;
    margin-left: 18px;
    margin-top: -9px;
    margin-bottom: 3px;
}
.name-3{
  color: black;
    font-size: 14px;
    font-weight: 600;
    margin-left: 20px;
    margin-top: -10px;
    margin-bottom: 3px;
}
</style>