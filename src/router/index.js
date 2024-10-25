import { createRouter, createWebHistory } from 'vue-router'
import Cargos from '../views/cargos.vue'
import LayoutMain from '../components/LayoutMain.vue'
import Login from '../components/Login.vue'
import Paises  from '../components/Paises.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: LayoutMain,
    },
    {
        path: '/login.vue',
        name: 'login',
        component: Login,
    },
    {
        path: '/cargos',
        name: 'Cargos',
        component: Cargos,
    },

    {
        path: '/paises',
        name: 'Paises',
        component: Paises
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;