<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Usuario'" :tituloBoton="'Crear Usuario'" :abrir="abrirFormulario" />


            <Formulario :titulo="'Gestion de Usuarios'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                @save="guardarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormCargos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" />
                        </el-col>
                    </el-row>
                </template>

            </Formulario>

            <el-table :data="tableData" stripe style="width: 100%" >
                <el-table-column prop="username" label="Usuario"  />
                <el-table-column prop="password" label="Contraseña"  />      
                <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default>
                        <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario">
                        </el-button>
                        <el-button link type="danger" :icon="Delete"></el-button>
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
import FormCargos from './components/formUsuario.vue';
import { ElMessage } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const areas = ref([])
const cargos = ref([])


const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
}

const editarFormulario = async () => {
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

const crearUsuario = async () => {

    const url = 'http://127.0.0.1:8000/api/cargos/save'

    const dataFormulario = {
        nombre: formRef.value.formulario.nombre,
        salario: formRef.value.formulario.salario,
        id_area: formRef.value.formulario.area
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
const actualizarUsuario = async () => {

    console.log('se actualizo el usuario');

}
const eliminarUsuario = async () => {

    console.log('se elimino el usuario');

}
const datosUsuario = async () => {

    const url = 'http://127.0.0.1:8000/api/cargos/datos'

try {
    axios.get(url)
        .then(function (response) {
            cargos.value = response.data.result
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error crear usuario ', error)
}


}
const getAreas = async () => {

    const url = 'http://127.0.0.1:8000/api/areas/datos'

    try {
        axios.get(url)
            .then(function (response) {
                areas.value = response.data.result
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear usuario ', error)
    }




}

onMounted(() => {
    getAreas()
    datosUsuario()
})

</script>