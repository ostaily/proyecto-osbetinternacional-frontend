
<template>
  <el-form
    ref="formRef"
    style="max-width: 100%"
    :model="formulario"
    :rules="rulesForm"
    label-width="auto"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Usuario" prop="username">
      <el-input v-model="formulario.username" />
    </el-form-item>
    <el-form-item label="Contraseña" prop="password">
      <el-input v-model="formulario.password" />
    </el-form-item>

  </el-form>
</template>

<script setup>

import { reactive, ref } from 'vue'



const propiedad = defineProps({
  areas: {
    type:Array,
    required:true
  }
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  nombre: '',
  salario: '',
  area: '',

})


const rulesForm = reactive({
  nombre: [
    { required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }
  ],
  salario: [
    {
      required: true,
      message: 'Ingrese el salario',
      trigger: 'blur',
    },
  ],
  area: [
    {
      required: true,
      message: 'Seleccione un valor',
      trigger: 'blur',
    },
  ],
})





const limpiarFormulario =()=>{
    formRef.value.resetFields()    
}

const validarFormulario =  () => {

    return new Promise ((resolve)=>{
        formRef.value?.validate((valid)=>{
            if (valid) {
              resolve(true)            
            } else {
                resolve(false)             
            }
            
        })
        })        

    
}

defineExpose({validarFormulario,formulario,limpiarFormulario})




</script>




<style scoped>
</style>