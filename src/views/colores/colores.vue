<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Colores'" :tituloBoton="'Crear Color'" :abrir="abrirFormulario" />


            <Formulario :titulo="'Gestion de Colores'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                @save="guardarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormColores v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" />
                        </el-col>
                    </el-row>
                </template>

            </Formulario>

            <el-table :data="cargos" stripe style="width: 100%">
                <el-table-column prop="nombre" label="Nombre" />
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
import formColores from './components/formColores.vue';
import { ElMessage } from 'element-plus'
import axios from 'axios';
import FormColores from './components/formColores.vue';


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
        await crearColor()
    }

}

const crearColor = async () => {

    const url = 'http://127.0.0.1:8000/api/cargos/save'

    const dataFormulario = {
        nombre: formRef.value.formulario.nombre,
    }
    try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El color se creo con exito    .',
                    type: 'success',
                })
                datosColor()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear cargo ', error)
    }

}
const actualizarColor = async () => {

    console.log('se actualizo el color');

}
const eliminarColor = async () => {

    console.log('se elimino el color');

}
const datosColor = async () => {

    const url = 'https://mocki.io/v1/fc98e0be-08cb-4606-84d8-59fca8534e39'

    try {
        axios.get(url)
            .then(function (response) {
                cargos.value = response.data
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear color ', error)
    }


}


onMounted(() => {
    datosColor()
})

</script>