<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Telas'" :tituloBoton="'Crear Tela'" :abrir="abrirFormulario" />


            <Formulario :titulo="'Gestion de Telas'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
                @save="guardarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormTelas v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" />
                        </el-col>
                    </el-row>
                </template>

            </Formulario>

            <el-table :data="telas" stripe style="width: 100%" >
                <el-table-column prop="Nombre" label="Nombre"  />   
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
import { ElMessage } from 'element-plus'
import axios from 'axios';
import FormTelas from './components/formTelas.vue';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const areas = ref([])
const telas = ref([])


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
        await crearCargo()
    }

}

const crearCargo = async () => {

    const url = 'http://127.0.0.1:8000/api/telas/save'

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
                    message: 'La tela se creo con exito    .',
                    type: 'success',
                })
                datosCargo()
                mostrarFormulario.value = false
                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear tela ', error)
    }





}
const actualizarCargo = async () => {

    console.log('se actualizo la tela');

}
const eliminarCargo = async () => {

    console.log('se elimino la tela');

}
const datosCargo = async () => {

    const url = 'http://127.0.0.1:8000/api/telas/datos'

try {
    axios.get(url)
        .then(function (response) {
            telas.value = response.data.result
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        });

} catch (error) {
    console.error('error crear tela ', error)
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
        console.error('error crear tela ', error)
    }
}

onMounted(() => {
    getAreas()
    datosCargo()
})

</script>