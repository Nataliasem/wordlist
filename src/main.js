import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  RiPencilLine,
  RiDeleteBack2Line,
  RiPlayListAddFill,
  RiDeleteBin2Line,
  RiCheckboxLine,
  RiFileSearchLine
} from 'oh-vue-icons/icons'

addIcons(RiCheckboxLine, RiDeleteBin2Line, RiPencilLine, RiDeleteBack2Line, RiPlayListAddFill, RiFileSearchLine)

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.component('v-icon', OhVueIcon)
app.mount('#app')
