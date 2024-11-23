import {createRouter, createWebHistory} from 'vue-router'
import Paises from '../views/paises/paises.vue'
import Cargos from '../views/cargos/cargos.vue'
import LayoutMain from '../components/LayoutMain.vue'
import Login from '../components/Login.vue'
import Tallas from '../views/tallas/tallas.vue'
import Colores from '../views/colores/colores.vue'
import Telas from '../views/telas/telas.vue'
import Contacto from '../views/contacto/contacto.vue'
import Usuario from '../views/usuario/usuario.vue'

const routes =[

{
    path:'/',
    name:'home',
    component:LayoutMain,
},
{
    path:'/login',
    name:'login',
    component:Login,
},

{
    path:'/pais',
    name:'Paises',
    component: Paises,
},
{
    path:'/cargos',
    name:'Cargos',
    component: Cargos,
},
{
    path:'/tallas',
    name:'Tallas',
    component: Tallas,
},
{
    path:'/colores',
    name:'Colores',
    component: Colores,
},
{
    path:'/telas',
    name:'Telas',
    component: Telas,
},
{
    path:'/contactos',
    name:'Contacto',
    component: Contacto,
},
{
    path:'/usuarios',
    name:'Usuario',
    component: Usuario,
},
]

const router= createRouter({
    history:createWebHistory(),
    routes,
})

export default router;