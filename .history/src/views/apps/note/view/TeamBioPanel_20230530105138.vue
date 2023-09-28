<script setup>

const props = defineProps({
  teamData: {
    type: Object,
    required: true,
  },
})




</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.teamData">
        <VCardText class="text-center pt-15">
          <!-- 👉 User fullName -->
          <h6 class="text-h6 mt-4">
            {{ props.teamData.id }}
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
                    {{ props.teamData.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>




            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Country:
                  <span class="text-body-2">{{ props.teamData.id }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center">
          <VBtn
            variant="elevated"
            class="me-3"
            @click="isUserInfoEditDialogVisible = true"
          >
            Edit
          </VBtn>
          <VBtn
            variant="tonal"
            color="error"
          >
            Suspend
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->


  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.teamData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.7rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
