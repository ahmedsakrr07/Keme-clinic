/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import ability from '@/plugins/casl/ability'
import i18n from '@/plugins/i18n'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import { abilitiesPlugin } from '@casl/vue'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import 'sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'vue-toast-notification/dist/theme-sugar.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Popper from "vue3-popper"
import VTooltip from 'v-tooltip'
import DisableAutocomplete from 'vue-disable-autocomplete';

import {ColorPicker, ColorPanel} from 'one-colorpicker'



// router/index.js




loadFonts()

// Create vue app
const app = createApp(App)

app.component("Popper", Popper)


// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)
app.use(VueSweetalert2)
app.use(VTooltip)
app.use(ColorPicker)
app.use(ColorPanel)
app.use(DisableAutocomplete);
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

// Mount vue app
app.mount('#app')
