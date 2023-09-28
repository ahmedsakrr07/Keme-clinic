<script setup>
import { useSubClinicListStore } from '@/views/apps/subclinic/useSubClinicListStore';
const SubClinicListStore = useSubClinicListStore()
const route = useRoute()
const SubClinicData         = ref()
const actives = [
  { value: 0, name:"Deactive"},
  { value: 1, name:"Active"},
]
const title               = ref()
const description               = ref()
const clinic_id          = ref()
const active             = ref()

SubClinicListStore.fetchsubClinic(Number(route.params.id)).then(response => {
  title.value                  = response.data.data.title
  description.value                  = response.data.data.description
  clinic_id.value             = response.data.data.clinic_id
  active.value                = response.data.data.active
})


</script>

<template>
  <VCard
    :title="$t('View Doctor')"
  >
    <VCard :title="$t('* Basic Information')">
      <VCol cols="12">
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Name :
            </VSubheader>{{ name }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Clinic :
            </VSubheader>{{ clinic }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Specialization :
            </VSubheader>{{ Specialization }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Email :
            </VSubheader>{{ email }}
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Phone :
            </VSubheader>{{ phone }}
          </VCol>
              
          <VCol
            cols="12"
            md="6"
          >
            <VSubheader style="font-weight: bold;">
              Status :
            </VSubheader>{{ (status == 0)?'InActive':'Active' }}
          </VCol>
        </VRow>
              
        <VRow v-if="!name">
          <VCol
            cols="12"
            md="6"
          >
            <div class="loading">
              <div class="effect-1 effects" />
              <div class="effect-2 effects" />
              <div class="effect-3 effects" />
            </div>
          </VCol>  
        </VRow>
      </VCol>
    </VCard><br>
    <VDialog
    v-model="isDialogVisible"
    max-width="800"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        {{ $t('Add Appointments') }}
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard :title="$t('Add Time')">
      <VCardText>
        <VForm  @submit.prevent="Create">
          <VRow>
            <VCol
              cols="12"
              sm="4"
            >
              <VSelect
                v-model="day"
                :items="days"
                :itemTitle="$t('name')"
                itemValue="value"
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
            <!-- <VBtn @click="isDialogVisible = false">
              Save
            </VBtn> -->
            <VBtn @click="isDialogVisible = false" type="submit">
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
        <VCard :title="$t('Appointments')">

          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col"># </th>
                <th scope="col">{{ $t('Day') }} </th>
                <th scope="col">{{ $t('Start Time') }} </th>
                <th scope="col">{{ $t('End Time') }} </th>
                <th scope="col">{{ $t('Actions') }}</th>
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
                <td>{{index+1}}</td>
                <td>{{Appointment.day}} </td>
                <td>{{Appointment.start}} </td>
                <td>{{Appointment.end}} </td>
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
  </VCard>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: questioneer-show
  </route>


