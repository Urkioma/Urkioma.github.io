<script setup>
import GridBackground from "./effects/GridBackground.vue";
import MouseEffect from "./effects/MouseEffect.vue";
import Navbar from "./Navbar.vue";
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    <GridBackground />
    <MouseEffect />
    <slot />
  </div>
</template>
