<script setup>
import NavBarI18n from '@core/components/I18n.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { ref } from 'vue'

const { isAppRtl } = useThemeConfig()

const i18nCompLanguages = [
  {
    label: 'English',
    i18nLang: 'en',
  },
  {
    label: 'Arabic',
    i18nLang: 'ar',
  },
]

const handleLangChange = lang => {
  isAppRtl.value = lang === 'ar'
}
const doctors = ref(["ahmed", "dooa", "sara", "mohamed", "mahmoud"])
</script>

<template>
  <!-- <v-container>
    <v-row>
      <v-btn class="mt-3"> + Create Meeting</v-btn>
        <VCol
              cols="4"
            >
            <v-select
      v-model="selectedDoctor"
      label="Choose Doctor"
      :items ="doctors"
    >
      <v-list-item
      >
        {{ doctor}}
      </v-list-item>
    </v-select>
            </VCol>
    </v-row>
  </v-container> -->
  <NavBarI18n
    :languages="i18nCompLanguages"
    @change="handleLangChange"
  />
</template>