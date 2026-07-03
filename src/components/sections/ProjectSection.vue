<script setup>
import ProjectCard from "../ProjectCard.vue";

const props = defineProps({
  projects: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <section id="projects" class="relative">
    <div class="max-w-7xl mx-auto px-6 py-24">
      <div class="space-y-4">
        <h2 class="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
          Projets
        </h2>
        <p class="text-xl text-[var(--color-text)]/70 max-w-2xl">
          Une sélection de mes projets récents, mettant en avant différentes
          approches et technologies.
        </p>
      </div>
    </div>
    <div class="relative">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.slug"
        :project="project"
        :index="index"
      />
    </div>
  </section>
</template>
