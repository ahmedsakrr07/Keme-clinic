<script setup>
import { useRoleListStore } from '@/views/apps/role/useRoleListStore';
import RoleBioPanel from '@/views/apps/role/view/RoleBioPanel.vue';

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


roleListStore.fetchRole(Number(route.params.id)).then(response => {
  roleData.value = response.data.data
  name.value   = response.data.data.name
 clinic.value   = response.data.data.clinic
  email.value  = response.data.data.email
  phone.value  = response.data.data.phone
  clinic_id.value = response.data.data.clinic_id
})
roleListStore.fetchPermissions().then(response => {
  permissions.value = response.data.data
})
</script>

<template>
  <VRow v-if="roleData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <RoleBioPanel :role-data="roleData" />
    </VCol>


  </VRow>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: roles-show
  </route>


