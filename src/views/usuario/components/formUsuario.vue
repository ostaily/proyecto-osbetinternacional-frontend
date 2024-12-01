<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Usuario" prop="username">
      <el-input v-model="formulario.username" />
    </el-form-item>
    <el-form-item label="Contraseña" prop="password">
      <el-input v-model="formulario.password" />
    </el-form-item>

  </el-form>
</template>

<script setup>

import { onMounted, reactive, ref, watch } from 'vue'

const propiedad = defineProps({
  dataValue: Object,
});

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  username: '',
  password: '',
})

const datosFormulario = () => {
  console.log('propiedad', propiedad);
  formulario.username = propiedad?.dataValue?.username;
  formulario.password = propiedad?.dataValue?.password;
}

const rulesForm = reactive({
  username: [
    { required: true, message: 'Por favor ingrese el usuario', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: 'Ingrese la contraseña',
      trigger: 'blur',
    },
  ]
})


const limpiarFormulario = () => {
  formRef.value.resetFields()
}

const validarFormulario = () => {

  return new Promise((resolve) => {
    formRef.value?.validate((valid) => {
      if (valid) {
        resolve(true)
      } else {
        resolve(false)
      }

    })
  })


}
watch(
    () => propiedad.dataValue,
    (newData) => {
        datosFormulario();
    }
);

defineExpose({ validarFormulario, formulario, limpiarFormulario })
</script>
<style scoped></style>