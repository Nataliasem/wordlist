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
    RiEyeOffLine,
    RiEyeLine,
    RiSortAsc,
    RiSortDesc,
    RiArrowLeftLine,
    RiArrowRightLine
} from 'oh-vue-icons/icons'

addIcons(
    RiCheckboxLine,
    RiDeleteBin2Line,
    RiPencilLine,
    RiDeleteBack2Line,
    RiPlayListAddFill,
    RiEyeOffLine,
    RiEyeLine,
    RiSortAsc,
    RiSortDesc,
    RiArrowLeftLine,
    RiArrowRightLine
)

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.component('VIcon', OhVueIcon)
app.mount('#app')
