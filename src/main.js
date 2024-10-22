import { createApp } from 'vue'
import  ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router/index'

//createApp(App).use(router).mount('#app')
//App.use(ElemenPlus)

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
