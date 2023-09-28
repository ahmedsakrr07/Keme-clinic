<script setup>
import axios from '@axios';
import { requiredValidator } from '@validators';
import { useToast } from 'vue-toast-notification';

const $toast = useToast()
const router = useRouter()
const props  = defineProps({
  roleData: {
    type: Object,
    required: true,
  },
  permissions: {
    type: Object,
    required: true,
  },
  permissionsId: {
    type: Object,
    required: true,
  },
})
const name          = ref(props.roleData.name)
const permissionsId = ref(props.roleData.permissionsId)
const refForm = ref()

const update = () => {
  axios.post('/roles/edit/'+props.roleData.id, {
    name: name.value,
    permissions: permissionsId.value,
  }).then(r => {
    const {message,data,status_code} = r.data
    if(status_code == 200)
       $toast.success(message, { position: 'top-right'})
       router.go(-1)
  }).catch(error => {
      if(error){
        const {message,data,status_code} = error.response.data
        if(status_code != 200)
          $toast.error(message, { position: 'top-right'})
      }
   })
}

</script>

<template>
   <VForm ref="refForm" @submit.prevent="update">
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
                v-for="option in props.permissions"
                :key="option"
              >
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
        <VBtn block type="submit">
          {{ $t('Update') }}
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>