<script setup>
  import { ref } from 'vue'
  import Surface from "./surface/Surface.ce.vue";
  const elements = ref([])
  function addElement(element){
    elements.value.push((element.detail && element.detail[0]) || element);
  }
</script>

<template>
  <p>
    Normal: <surface @created="addElement" :elements="elements"/>
  </p>
  <p>
    WebComponent: <super-surface ref="supersurface" @created="addElement" :elements.prop="elements"/>
  </p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
