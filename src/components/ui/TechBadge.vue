<script setup>
import { useTextScramble } from "../../composables/useTextScramble";

const props = defineProps({
  tech: {
    type: Object,
    required: true,
  },
});

const { displayText, scramble } = useTextScramble(props.tech.name);
</script>

<template>
  <div
    class="relative px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 group animate-fade-in-up backdrop-blur-sm"
    :class="[tech.delay]"
    @mouseenter="scramble"
  >
    <span
      class="relative z-10 transition-colors duration-300 tracking-wide"
      :style="{ color: `var(--color-${tech.color})` }"
    >
      {{ displayText }}
    </span>
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-lg"
      :style="{
        backgroundColor: `var(--color-${tech.color})`,
        boxShadow: `0 0 30px var(--color-${tech.color})`,
      }"
    ></div>
    <div
      class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 border"
      :style="{
        borderColor: `var(--color-${tech.color})40`,
      }"
    ></div>
  </div>
</template>
