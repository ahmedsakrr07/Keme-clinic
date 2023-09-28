<script setup>
import RoleBioPanel from '@/views/apps/role/edit/RoleBioPanel.vue';
import { useRoleListStore } from '@/views/apps/role/useRoleListStore';

const roleListStore = useRoleListStore()
const route = useRoute()
const roleData = ref()
const permissions = ref([])



roleListStore.fetchRole(Number(route.params.id)).then(response => {
  roleData.value = response.data.data
})
roleListStore.fetchPermissions().then(response => {
  permissions.value = response.data.data
})


</script>

<template>
  <VCard
    :title="$t('Edit Role')"
    v-if="roleData"
   >
   <VCol cols="12">
    <RoleBioPanel :role-data="roleData" :permissions="permissions" :permissionsId="roleData.permissions" v-if="roleData"/>
    <VRow v-if="!roleData">
      <VCol
          cols="12"
          md="6"
        >
          <div class="loading">
            <div class="effect-1 effects"></div>
            <div class="effect-2 effects"></div>
            <div class="effect-3 effects"></div>
          </div>
      </VCol>  
    </VRow>
  </VCol> 
  </VCard>
</template>
<route lang="yaml">
  meta:
    action: read
    subject: roles-show
  </route>


