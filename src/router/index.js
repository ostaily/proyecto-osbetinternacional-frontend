import { createRouter, createWebHistory } from 'vue-router'
import Ejemplo from '../views/cargos.vue'
import Paises from '../views/paises.vue'
import LayoutMain from '../components/LayoutMain.vue'
import Login from '../components/Login.vue'

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
        component: Ejemplo,
    },

    {
        path: '/paises',
        name: 'Paises',
        component: Paises,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;