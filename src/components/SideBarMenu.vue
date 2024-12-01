<template>

        <el-menu
        :default-active="$route.path"
        router
          class="el-menu-vertical-demo"
          background-color="#c2cecb"
          text-color="#000000"
          collapse-transition
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Administrador</span>
            </template>
  
            <!--<el-menu-item index="personas">Personas</el-menu-item>-->
            <!-- <el-menu-item index="cargos">Cargos</el-menu-item> -->
            <!-- <el-menu-item index="pais">Paises</el-menu-item> -->
            <el-menu-item index="tallas">Tallas</el-menu-item>
            <el-menu-item index="colores">Colores</el-menu-item>
            <el-menu-item index="telas">Telas</el-menu-item>
            <el-menu-item index="contactos">Contacto</el-menu-item>
            <!-- <el-menu-item index="usuarios">Usuarios</el-menu-item> -->
            <el-menu-item index="impuestos">Impuestos</el-menu-item>
          </el-sub-menu>

        </el-menu>
  </template>
  
  <script lang="ts" setup>
  import {Location} from '@element-plus/icons-vue';
  </script>
  
  <style scoped>
  html, body {
    margin: 0;
    padding: 0;
    /* height: 100%; */
  }
  

  
  .el-menu-vertical-demo {
    width: 250px;
    min-height: 100%;
  }
  </style>
  