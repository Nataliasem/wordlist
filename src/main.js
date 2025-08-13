import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  RiPencilLine,
  RiDeleteBack2Line,
  RiPlayListAddFill,
  RiDeleteBin2Line,
  RiCheckboxFill
} from 'oh-vue-icons/icons'

addIcons(RiCheckboxFill, RiDeleteBin2Line, RiPencilLine, RiDeleteBack2Line, RiPlayListAddFill)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.mount('#app')
