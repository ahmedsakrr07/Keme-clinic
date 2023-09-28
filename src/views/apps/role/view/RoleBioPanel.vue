<script setup>

const props = defineProps({
  roleData: {
    type: Object,
    required: true,
  },
})




</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.roleData">
        <VCardText class="text-center pt-15">
          <!-- 👉 User fullName -->
          <h6 class="text-h6 mt-4">
            {{ props.roleData.id }}
          </h6>
        </VCardText>
        <!-- 👉 Details -->
        <VCardText>
          <p class="text-sm text-uppercase text-disabled">
            Details
          </p>

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Name:
                  <span class="text-body-2">
                    {{ props.roleData.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>




            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Country:
                  <span class="text-body-2">{{ props.roleData.id }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>


      </VCard>
    </VCol>
    <!-- !SECTION -->


  </VRow>



</template>


