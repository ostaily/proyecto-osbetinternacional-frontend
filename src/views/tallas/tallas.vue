<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Tallas'" :tituloBoton="'Crear Talla'" :abrir="abrirFormulario" />


            <Formulario :titulo="'Gestion de Tallas'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                @save="guardarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormTallas v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" />
                        </el-col>
                    </el-row>
                </template>

            </Formulario>

            <el-table :data="cargos" stripe style="width: 100%">
                <el-table-column prop="nombre" label="Nombre" />

                <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default>
                        <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario"></el-button>
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
import { ElMessage } from 'element-plus'
import axios from 'axios';
import FormTallas from './components/formTallas.vue';


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
        name: '2Oscar',
        address: 'No. 189, Grove St, Los Angeles',
        phone: '311555',
    }
]


const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearTalla()
    }

}

const crearTalla = async () => {

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
                    message: 'La Talla se creo con exito    .',
                    type: 'success',
                })
                datosTalla()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear Talla ', error)
    }





}
const actualizarTalla = async () => {

    console.log('se actualizo la Talla');

}
const eliminarTalla = async () => {

    console.log('se elimino la Talla');

}
const datosTalla = async () => {

    const url = 'https://mocki.io/v1/243ff2fd-2304-45f0-b6b7-ab5a803adb08'

    try {
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                cargos.value = response.data

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear Talla ', error)
    }


}


onMounted(() => {
    datosTalla()
})

</script>