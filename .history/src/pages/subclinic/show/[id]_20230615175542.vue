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

    <!-- Dialog Content -->
    <VCard :title="$t('Questioneer Details')">
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
      
        </VForm>
      </VCardText>

      
    </VCard>
 
  </VCard>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: questioneer-show
  </route>


