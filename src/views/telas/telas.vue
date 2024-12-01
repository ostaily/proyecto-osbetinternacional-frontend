<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Telas'" :tituloBoton="'Crear Talla'" :abrir="abrirFormulario" />

            
            <Formulario :titulo="'Gestion de Telas'" v-model:is-open="mostrarFormulario"
                :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormTallas v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" :dataValue="dataTelasById" />
                        </el-col>
                    </el-row>
                </template>

            </Formulario>

            <el-table :data="telas" stripe style="width: 100%">
                <el-table-column prop="nombre" label="Nombre" />

                <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default="registro">
                        <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)"></el-button>
                        <el-button link type="danger" :icon="Delete"
                            @click="eliminarTela(registro.row.id)"></el-button>
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
import FormTallas from './components/formTelas.vue';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const areas = ref([])
const telas = ref([])
const dataTelasById = ref()

const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
}

/**
 * Carga la informacion en el formulario de editar
 * @param id 
 */
const editarFormulario = async (id) => {
    dataTelasById.value = await datosById(id)
    console.log('editarFormulario',dataTelasById.value);
    
    mostrarFormulario.value = true
    editandoFormulario.value = true
}

/**
 * Valida el formulario al crear una tela
 */
const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearTelas();
    }
}

/**
 * Valida el formulario del front, si es correcto
 * ejecuta el metodo actualizarTela() para enviar la informacion
 * al back y actualizar la informacion
 */
const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    console.log("validar form",validacion);
    
    if (validacion) {
        await actualizarTela();
    }
}

/**
 * Consume la api de telas para crear una talla en Base de datos
 */
const crearTelas = async () => {
    const url = 'http://localhost:8000/api/telas'

    const dataFormulario = {
        nombre: formRef.value.formulario.nombre
    }
    try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'La Tela se creo con exito    .',
                    type: 'success',
                })
                datosTela()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear Tela ', error)
    }
}

/**
 * Consume la api de telas del back que retorna la informacion de la 
 * talla por ID
 * @param id 
 */
const datosById = async (id:any) => {
    const url = `http://localhost:8000/api/tela/${id}`
    try {
        const response = await axios.get(url, {
            params: {
                id: id
            }
        })
        return response.data.message

    } catch (error) {
        console.error('error crear tela ', error)
    }
}

const actualizarTela = async () => {
    try {
        console.log("acrtualiza talklk");
        
        const dataFormulario = {
            id: dataTelasById.value.id,
            nombre: formRef.value.formulario.nombre
        }
        const url = `http://localhost:8000/api/telas`

        axios.patch(url, dataFormulario)
            .then((response) => {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'La tela se modificó con exito.',
                    type: 'success',
                })
                datosTela()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log('Error',error);
        
    }
}

/**
 * Elimina una tela
 */
const eliminarTela = async (id) => {
    const url = `http://localhost:8000/api/telas/${id}`
    try {
        axios.delete(url)
            .then((response) => {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'La Tela se eliminó con exito    .',
                    type: 'success',
                })
                datosTela()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {

    }

}
const datosTela = async () => {

    const url = 'http://localhost:8000/api/telas'

    try {
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                telas.value = response.data.message

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear Tela ', error)
    }


}


onMounted(() => {
    datosTela()
})

</script>