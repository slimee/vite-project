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
    the two following component are sharing the same data. Click and drag to add rectangles.
  </p>
  <p>
    Surface as a normal component: <surface class="surface" @created="addElement" :elements="elements"/>
  </p>
  <p>
    Surface in a webComponent: <super-surface @created="addElement" .elements="elements"/>
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

.surface{
  background-color: whitesmoke;
  border-style: dashed;
  cursor: crosshair;
}
</style>
