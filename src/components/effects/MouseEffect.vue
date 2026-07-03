<script setup>
import { onMounted, onUnmounted } from "vue";
import { useMouseParallax } from "../../composables/useMouseParallax";

const { mousePos, handleMouseMove } = useMouseParallax();

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
});
</script>

<template>
  <div
    class="fixed inset-0 pointer-events-none transition-transform duration-300 ease-out"
    :style="{
      backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, var(--color-accent) 0%, transparent 50%)`,
      opacity: 0.1,
    }"
  />
</template>
