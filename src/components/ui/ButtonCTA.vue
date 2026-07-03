<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "solid",
  },
  color: {
    type: String,
    default: "accent",
  },
});

const handleClick = (e) => {
  if (props.href.startsWith("#")) {
    e.preventDefault();
    const targetId = props.href.slice(1);
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
};
</script>

<template>
  <a
    :href="href"
    :download="href.endsWith('.pdf') ? 'CV_Maxime_Gouillardon.pdf' : undefined"
    :target="
      href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : '_self'
    "
    :rel="href.startsWith('http') ? 'noopener noreferrer' : undefined"
    @click="handleClick"
    class="group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 backdrop-blur-sm"
  >
    <div
      v-if="variant === 'solid'"
      class="absolute inset-0 transition-all duration-500"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-[var(--color-mint)] to-[var(--color-accent)] opacity-90"
      />
      <div
        class="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700"
        style="
          background: linear-gradient(
            45deg,
            transparent 25%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 75%
          );
          background-size: 250% 250%;
          animation: shine 3s linear infinite;
        "
      />
    </div>

    <template v-else>
      <div class="absolute inset-0 rounded-full">
        <div
          class="absolute inset-0 rounded-full border-2 transition-all duration-300"
          :class="[
            'border-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]',
            'group-hover:shadow-[0_0_15px_rgba(137,180,250,0.15)]',
          ]"
        />
      </div>
      <div
        class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-5 transition-all duration-500 bg-gradient-to-r from-[var(--color-mint)] to-[var(--color-accent)]"
      />
    </template>

    <span
      class="relative px-6 py-2.5 font-medium text-base sm:text-lg transition-all duration-300"
      :class="[
        variant === 'solid'
          ? 'text-[var(--color-background)]'
          : 'text-[var(--color-text)] group-hover:text-[var(--color-accent)]',
      ]"
    >
      {{ label }}
    </span>

    <div
      class="absolute -right-1 -top-1 w-2 h-2 rounded-full transition-all duration-300 transform group-hover:scale-[1.2] group-hover:rotate-90"
      :class="[
        variant === 'solid' ? 'bg-white/30' : 'bg-[var(--color-accent)]/30',
      ]"
    />
  </a>
</template>

<style scoped>
@keyframes shine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
