
<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
      :size="formSize" status-icon>
      <el-card style="max-width: 100%">
          <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <h1>Impuestos</h1>
              </el-col>
          </el-row>

          <el-form-item label="Nombre" prop="nombre">
              <el-input v-model="formulario.nombre" />
          </el-form-item>
          <el-form-item label="Valor" prop="valor">
              <el-input v-model="formulario.valor" />
          </el-form-item>
      </el-card>
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
  nombre: ''
})

const datosFormulario = () => {
  console.log('propiedad', propiedad);
  formulario.nombre = propiedad?.dataValue?.nombre;
  formulario.valor = propiedad?.dataValue?.valor;
}

const rulesForm = reactive({
  nombre: [
      { required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }
  ],
  valor: [
      { required: true, message: 'Por favor ingrese el valor', trigger: 'blur' }
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