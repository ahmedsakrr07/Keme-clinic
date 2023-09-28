<script setup>
import { useNoteListStore } from '@/views/apps/note/useNoteListStore'

const NoteListStore = useNoteListStore()
const route = useRoute()
const NoteData = ref()

NoteListStore.fetchNote(Number(route.params.id)).then(response => {
  NoteData.value = response.data.data
})
</script>

<template>
  <VRow v-if="NoteData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      {{ NoteData.name }}
    </VCol>
  </VRow>
</template>

<route lang="yaml">
  meta:
    action: read
    subject: Note-show
  </route>


