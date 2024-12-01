<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Usuarios'" :tituloBoton="'Crear Usuario'" :abrir="abrirFormulario" />


            <Formulario :titulo="'Gestion de Usuarios'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
            @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormUsuario v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" :dataValue="dataUsuariosById" />
                        </el-col>
                    </el-row>
                </template>

            </Formulario>

            <el-table :data="usuarios" stripe style="width: 100%" >
                <el-table-column prop="username" label="Usuario"  />
                <el-table-column prop="password" label="Contraseña"  />      
                <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default="registro">
                        <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)">
                        </el-button>
                        <el-button link type="danger" :icon="Delete"
                        @click="eliminarUsuario(registro.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

        </template>


    </LayoutMain>
</template>


<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue"
import { ElMessage } from 'element-plus'
import axios from 'axios';
import FormUsuario from './components/formUsuario.vue';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const areas = ref([])
const usuarios = ref([])
const dataUsuariosById = ref()

const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
}

const editarFormulario = async (id) => {
    dataUsuariosById.value = await datosById(id)
    mostrarFormulario.value = true
    editandoFormulario.value = true
}

const tableData = [
    {
        username: 'bastian2024',
        password: '*********',
    },
    {
        username: 'Master-Andres',
        password: '*********',
    }
]


const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearUsuario()
    }

}

/**
 * Valida el formulario del front, si es correcto
 * ejecuta el metodo actualizarTalla() para enviar la informacion
 * al back y actualizar la informacion
 */
 const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    console.log("validar form",validacion);
    
    if (validacion) {
        await actualizarUsuario();
    }
}


const crearUsuario = async () => {

    const url = 'http://localhost:8000/api/usuarios'

    const dataFormulario = {
        username: formRef.value.formulario.username,
        password: formRef.value.formulario.password,
    }
    try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El usuario se creo con exito    .',
                    type: 'success',
                })
                datosUsuario()
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear usuario ', error)
    }
}

/**
 * Consume la api de tallas del back que retorna la informacion de la 
 * usuario por ID
 * @param id 
 */
 const datosById = async (id:any) => {
    const url = `http://localhost:8000/api/usuario/${id}`
    try {
        const response = await axios.get(url)
        return response.data.message

    } catch (error) {
        console.error('error crear talla ', error)
    }
}

const actualizarUsuario = async () => {

    try {
        
        const dataFormulario = {
            id: dataUsuariosById.value.id,
            username: formRef.value.formulario.username,
            password: formRef.value.formulario.password
        }
        const url = `http://localhost:8000/api/usuarios`

        axios.patch(url, dataFormulario)
            .then((response) => {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'La talla se modificó con exito.',
                    type: 'success',
                })
                datosUsuario()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log('Error',error);
        
    }

}
const eliminarUsuario = async (id:any) => {

    const url = `http://localhost:8000/api/usuarios/${id}`
    try {
        axios.delete(url)
            .then((response) => {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El usuario se eliminó con exito    .',
                    type: 'success',
                })
                datosUsuario()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {

    }

}
const datosUsuario = async () => {

    const url = 'http://localhost:8000/api/usuarios'

try {
    axios.get(url)
        .then(function (response) {
            usuarios.value = response.data.message
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error obtener usuario ', error)
}


}


onMounted(() => {
    datosUsuario()
})

</script>