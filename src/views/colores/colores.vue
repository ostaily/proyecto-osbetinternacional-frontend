<template>
    <LayoutMain>
        <template #slotLayout>
            <Header :titulo="'Colores'" :tituloBoton="'Crear Color'" :abrir="abrirFormulario" />

            
            <Formulario :titulo="'Gestion de Colores'" v-model:is-open="mostrarFormulario"
                :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
                <template #slotForm>
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <FormColores v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                                :areas="areas" :dataValue="dataColoresById" />
                        </el-col>
                    </el-row>
                </template>

            </Formulario>

            <el-table :data="colores" stripe style="width: 100%">
                <el-table-column prop="nombre" label="Nombre" />

                <el-table-column fixed="right" label="Acciones" min-width="120">
                    <template #default="registro">
                        <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)"></el-button>
                        <el-button link type="danger" :icon="Delete"
                            @click="eliminarColor(registro.row.id)"></el-button>
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
import FormTallas from './components/formColores.vue';
import FormColores from './components/formColores.vue';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const areas = ref([])
const colores = ref([])
const dataColoresById = ref()

const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
}

/**
 * Carga la informacion en el formulario de editar
 * @param id 
 */
const editarFormulario = async (id) => {
    dataColoresById.value = await datosById(id)
    console.log('editarFormulario',dataColoresById.value);
    
    mostrarFormulario.value = true
    editandoFormulario.value = true
}

/**
 * Valida el formulario al crear un color
 */
const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
        await crearColor();
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
        await actualizarColor();
    }
}

/**
 * Consume la api de colores para crear un color en Base de datos
 */
const crearColor = async () => {
    const url = 'http://localhost:8000/api/colores'

    const dataFormulario = {
        nombre: formRef.value.formulario.nombre
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
        console.error('error crear Color ', error)
    }
}

/**
 * Consume la api de colores del back que retorna la informacion del
 * color por ID
 * @param id 
 */
const datosById = async (id:any) => {
    const url = `http://localhost:8000/api/color/${id}`
    try {
        const response = await axios.get(url)
        return response.data.message

    } catch (error) {
        console.error('error crear color ', error)
    }
}

const actualizarColor = async () => {
    try {
        console.log("acrtualiza talklk");
        
        const dataFormulario = {
            id: dataColoresById.value.id,
            nombre: formRef.value.formulario.nombre
        }
        const url = `http://localhost:8000/api/colores`

        axios.patch(url, dataFormulario)
            .then((response) => {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El color se modificó con exito.',
                    type: 'success',
                })
                datosColor()
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
 * Elimina un color
 */
const eliminarColor = async (id) => {
    const url = `http://localhost:8000/api/colores/${id}`
    try {
        axios.delete(url)
            .then((response) => {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El color se eliminó con exito    .',
                    type: 'success',
                })
                datosColor()
                mostrarFormulario.value = false

            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {

    }

}
const datosColor = async () => {

    const url = 'http://localhost:8000/api/colores'

    try {
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                colores.value = response.data.message

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {
        console.error('error crear Color ', error)
    }


}


onMounted(() => {
    datosColor()
})

</script>