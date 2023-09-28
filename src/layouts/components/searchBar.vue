<template>
  <VTextField 
    v-model="search"
    clearable
    label="search"
    prepend-inner-icon="mdi-magnify"
    :placeholder="$t('Search in patients')"
    @click:prepend-inner="search = ''"
  />
</template>

<script>
export default {
  name:`Search`,
}
</script>

<style>
.v-field {
    display: grid;
    grid-template-areas: "prepend-inner field clear append-inner";
    grid-template-columns: min-content minmax(0, 1fr) min-content min-content;
    font-size: 16px;
    letter-spacing: 0.009375em;
    max-width: 83%;
    border-radius: 6px;
    contain: layout;
    flex: 1 0;
    grid-area: control;
    position: relative;
    --v-field-padding-start: 16px;
    --v-field-padding-end: 16px;
    --v-field-padding-top: 10px;
    --v-field-padding-bottom: 6px;
}
</style>
