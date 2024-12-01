<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Impuestos'" :tituloBoton="'Crear Impuesto'" :abrir="abrirFormulario" />

            
            <Formulario :titulo="'Gestion de Impuestos'" v-model:is-open="mostrarFormulario"
                :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormImpuestos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" :dataValue="dataImpuestosById" />
                        </el-col>
                    </el-row>
                </template>

            </Formulario>

            <el-table :data="impuestos" stripe style="width: 100%">
                <el-table-column prop="nombre" label="Nombre" />
                <el-table-column prop="valor" label="Valor" />

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
import FormTallas from './components/formImpuestos.vue';
import FormImpuestos from './components/formImpuestos.vue';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const areas = ref([])
const impuestos = ref([])
const dataImpuestosById = ref()

const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
}

/**
 * Carga la informacion en el formulario de editar
 * @param id 
 */
const editarFormulario = async (id) => {
    dataImpuestosById.value = await datosById(id)
    console.log('editarFormulario',dataImpuestosById.value);
    
    mostrarFormulario.value = true
    editandoFormulario.value = true
}

/**
 * Valida el formulario al crear una impuesto
 */
const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearImpuestos();
    }
}

/**
 * Valida el formulario del front, si es correcto
 * ejecuta el metodo actualizarImpuesto() para enviar la informacion
 * al back y actualizar la informacion
 */
const actualizarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    console.log("validar form",validacion);
    
    if (validacion) {
        await actualizarImpuesto();
    }
}

/**
 * Consume la api de impuestos para crear una talla en Base de datos
 */
const crearImpuestos = async () => {
    const url = 'http://localhost:8000/api/impuestos'

    const dataFormulario = {
        nombre: formRef.value.formulario.nombre,
        valor: formRef.value.formulario.valor
    }
    try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El impuesto se creo con exito    .',
                    type: 'success',
                })
                datosTela()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear impuesto ', error)
    }
}

/**
 * Consume la api de impuestos del back que retorna la informacion de la 
 * talla por ID
 * @param id 
 */
const datosById = async (id:any) => {
    const url = `http://localhost:8000/api/impuesto/${id}`
    try {
        const response = await axios.get(url)
        return response.data.message

    } catch (error) {
        console.error('error crear impuesto ', error)
    }
}

const actualizarImpuesto = async () => {
    try {
        
        const dataFormulario = {
            id: dataImpuestosById.value.id,
            nombre: formRef.value.formulario.nombre,
            valor: formRef.value.formulario.valor,
        }
        const url = `http://localhost:8000/api/impuestos`

        axios.patch(url, dataFormulario)
            .then((response) => {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El impuesto se modificó con exito.',
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
 * Elimina una impuesto
 */
const eliminarTela = async (id) => {
    const url = `http://localhost:8000/api/impuestos/${id}`
    try {
        axios.delete(url)
            .then((response) => {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El impuesto se eliminó con exito    .',
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

    const url = 'http://localhost:8000/api/impuestos'

    try {
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                impuestos.value = response.data.message

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear impuesto ', error)
    }


}


onMounted(() => {
    datosTela()
})

</script>