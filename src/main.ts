import { createApp } from 'vue'
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

const app = createApp(App)
app.component('VIcon', OhVueIcon)
app.mount('#app')
