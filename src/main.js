import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts"
import './assets/main.css'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)
app.use(VueApexCharts)

app.mount('#app')
