<script setup>
import { useRoleListStore } from '@/views/apps/role/useRoleListStore';
import RoleBioPanel from '@/views/apps/role/view/RoleBioPanel.vue';
import { useStaffListStore } from '@/views/apps/doctor/useStaffListStore';

const roleListStore = useRoleListStore()
const route = useRoute()
const roleData = ref()
const roleTab = ref(null)
const permissions = ref([])
const email    = ref()
const phone    = ref()
const name     = ref()
const clinic     = ref()
const clinic_id      = ref()
const StaffListStore = useStaffListStore()

StaffListStore.fetchDoctor(Number(route.params.id)).then(response => {
  name.value   = response.data.data.name
  clinic.value   = response.data.data.clinic
  email.value  = response.data.data.email
  phone.value  = response.data.data.phone
  active.value = response.data.data.active
  clinic_id.value = response.data.data.clinic_id

})

roleListStore.fetchRole(Number(route.params.id)).then(response => {
  roleData.value = response.data.data
 
})
roleListStore.fetchPermissions().then(response => {
  permissions.value = response.data.data
})
</script>

<template>
  <VCard
    :title="$t('View Staff')"
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
    </VCard>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: roles-show
  </route>


