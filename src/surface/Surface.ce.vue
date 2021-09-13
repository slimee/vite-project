<template>
  <svg ref="surface" class="surface"
       width="400" height="300" style="pointer-events: all"
        @mousedown.stop="mouseDown"
  >
    <rect v-for="element in elements" v-bind="element" fill="blue" stroke="black" stroke-width="1"/>
    <rect v-bind="creatingElement" fill="red" stroke="grey" stroke-width="1" opacity="0.5"/>
  </svg>
</template>

<script setup>
import {ref, toRefs} from 'vue'
  const props = defineProps({
    elements: { type: Array, required: true }
  });
  const { elements } = toRefs(props);

  const emit = defineEmits(['created']);
  const creatingElement = ref(null);
  const initialPoint = ref(null);
  const surface = ref(null);

  const globalToLocal = (evt) => {
    const offset = surface.value.getBoundingClientRect();
    return {
      x: evt.clientX - offset.left,
      y: evt.clientY - offset.top
    }
  };

  function startElement({x, y}){
    creatingElement.value = { x, y, width: 0, height: 0};
    initialPoint.value = { x, y };
  }
  function continueElement({ x, y }){
    if(x < initialPoint.value.x) creatingElement.value.x = x;
    else creatingElement.value.x = initialPoint.value.x;
    if(y < initialPoint.value.y) creatingElement.value.y = y;
    else creatingElement.value.y = initialPoint.value.y;
    creatingElement.value.width = Math.abs(x - initialPoint.value.x);
    creatingElement.value.height = Math.abs(y - initialPoint.value.y);
  }
  const endElement = () => {
    emit('created', creatingElement.value);
    creatingElement.value = null;
  }
  function mouseDown(evt){
    startElement(globalToLocal(evt));
    window.addEventListener('mousemove', mouseMove);
    const mouseUp = (evt) => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
      continueElement(globalToLocal(evt));
      endElement();
    };
    window.addEventListener('mouseup', mouseUp);
  }
  function mouseMove(evt){
    continueElement(globalToLocal(evt));
  }

</script>

<style scoped>
  .surface{
    background-color: whitesmoke;
    border-style: dashed;
    cursor: crosshair;
  }
</style>