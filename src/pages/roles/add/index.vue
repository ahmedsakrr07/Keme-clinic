
<script setup>
import { useRoleListStore } from '@/views/apps/role/useRoleListStore';
import axios from '@axios';
import { requiredValidator } from '@validators';
import { useToast } from 'vue-toast-notification';

const $toast = useToast()
const route = useRoute()
const router = useRouter()


const roleListStore = useRoleListStore()
const roleData = ref()
const name = ref()
const permissions = ref([])
const permissionsId = ref([])
const refForm = ref()

roleListStore.fetchPermissions().then(response => {
  permissions.value = response.data.data
})



const Create = () => {
  axios.post('/roles/create', {
    name: name.value,
    permissions: permissionsId.value,
  }).then(r => {
    const {message,data,status_code} = r.data
    if(status_code == 200)
       $toast.success(message, { position: 'top-right'})
       router.go(-1)
  }).catch(error => {
      const {message,data,status_code} = error.response.data
      if(status_code != 200)
        $toast.error(message, { position: 'top-right'})
   })
}
</script>



<template>
   <VCard
    :title="$t('Add New Role')"
   >
    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row">
      <VRow>
        <VCol cols="12">
            <VForm
                ref="refForm"
                @submit.prevent="Create"
            >
            <VRow >
              <VCol
                cols="12"
                md="12"
              >
                <VTextField
                  v-model="name"
                  :label="$t('Name')"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol cols="12">
                  <VCard class="user-tab-notification">
                  <VCardItem>
                    <VCardmessage>{{$t('Permissions')}}</VCardmessage>
                  </VCardItem>
                    <VCardText>
                      <VRow>
                        <VCol
                            cols="6"
                            md="2"
                            v-for="option in permissions"
                            :key="option"
                          >
                          <!-- :checked="value.includes(option.id)" -->

                          <VCheckbox
                            v-model="permissionsId"
                            :fieldId="option.id"
                            :value="option.id"
                            :label="option.name"
                            :key="option"
                            :multiple="true"
                            :rules="[requiredValidator]"
                          />
                          </VCol >
                      </VRow>
                    </VCardText>
              </VCard>

            </VCol>
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                >
                  {{$t('Create')}}
                </VBtn>
              </VCol>
            </VRow>
           </VForm>

        </VCol>
      </VRow>
    </VCardText>
  </VCard>

</template>



<route lang="yaml">
  meta:
    action: read
    subject: roles-create
  </route>


