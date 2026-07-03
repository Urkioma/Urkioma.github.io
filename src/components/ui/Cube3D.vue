<script setup>
import { ref, onMounted } from "vue";

const cubeItems = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  isEven: i % 2 === 0,
  translateZ: 0,
  delay: i * 0.1,
}));

const itemTransforms = ref(cubeItems.map(() => 0));

onMounted(() => {
  itemTransforms.value = cubeItems.map(() => Math.random() * 30);
});
</script>

<template>
  <div class="hidden lg:flex items-center justify-center">
    <div
      class="relative w-96 h-96 perspective-1000 transform-gpu animate-float"
    >
      <div class="absolute inset-0 rotate-12">
        <div class="grid grid-cols-3 grid-rows-3 gap-4 h-full w-full">
          <div
            v-for="(item, index) in cubeItems"
            :key="item.id"
            class="rounded-xl backdrop-blur-md transition-all duration-500 hover:scale-105"
            :class="[
              item.isEven
                ? 'bg-gradient-to-br from-[var(--color-lavender)]/10 to-[var(--color-mint)]/10'
                : 'bg-gradient-to-br from-[var(--color-peach)]/10 to-[var(--color-rose)]/10',
            ]"
            :style="{
              transform: `translateZ(${itemTransforms[index]}px)`,
              animationDelay: `${item.delay}s`,
            }"
          >
            <div
              class="absolute inset-0 border border-[var(--color-text)]/5 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotateX(10deg);
  }
  50% {
    transform: translateY(-20px) rotateX(10deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
