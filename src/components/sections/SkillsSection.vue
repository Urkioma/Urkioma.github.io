<script setup>
import { useTextScramble } from "../../composables/useTextScramble";
import TechBadge from "../ui/TechBadge.vue";

const { scramble: scrambleTitle } = useTextScramble("Compétences");

const skillCategories = {
  frontend: {
    title: "Frontend",
    description: "Développement d'interfaces modernes et réactives",
    color: "lavender",
    items: [
      {
        title: "Framework & Librairies",
        tech: [
          { name: "Vue.js", color: "lavender", delay: "delay-100" },
          { name: "TailwindCSS", color: "mint", delay: "delay-200" },
          { name: "Inertia", color: "rose", delay: "delay-300" },
        ],
      },
      {
        title: "Testing Frontend",
        tech: [
          { name: "Vitest", color: "peach", delay: "delay-100" },
          { name: "Playwright", color: "mint", delay: "delay-200" },
        ],
      },
    ],
  },
  backend: {
    title: "Backend",
    description: "Création d'APIs et gestion de données",
    color: "mint",
    items: [
      {
        title: "Framework & Runtime",
        tech: [
          { name: "AdonisJS", color: "lavender", delay: "delay-100" },
          { name: "Node.js", color: "mint", delay: "delay-200" },
          { name: "Laravel", color: "rose", delay: "delay-300" },
        ],
      },
      {
        title: "Base de données",
        tech: [
          { name: "MySQL", color: "peach", delay: "delay-100" },
          { name: "SQLite", color: "mint", delay: "delay-200" },
        ],
      },
    ],
  },
  tools: {
    title: "Environnement",
    description: "Outils de développement quotidiens",
    color: "peach",
    items: [
      {
        title: "Éditeur & Terminal",
        tech: [
          { name: "Neovim", color: "lavender", delay: "delay-100" },
          { name: "Tmux", color: "mint", delay: "delay-200" },
        ],
      },
      {
        title: "Versionning & OS",
        tech: [
          { name: "Git", color: "rose", delay: "delay-100" },
          { name: "Linux", color: "peach", delay: "delay-200" },
        ],
      },
    ],
  },
};
</script>

<template>
  <section id="skills" class="relative min-h-screen py-24">
    <div class="max-w-7xl mx-auto px-6 space-y-4 mb-24">
      <h2
        class="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight"
        @mouseenter="scrambleTitle"
      >
        Compétences
      </h2>
      <p class="text-xl text-[var(--color-text)]/70 max-w-2xl">
        Développeur fullstack passionné par les bonnes pratiques et
        l'apprentissage continu.
      </p>
    </div>

    <div class="max-w-7xl mx-auto px-6">
      <div class="grid gap-16">
        <div
          v-for="(category, key) in skillCategories"
          :key="key"
          class="space-y-8"
        >
          <div class="space-y-4">
            <h3
              class="text-2xl sm:text-3xl font-bold"
              :class="`text-[var(--color-${category.color})]`"
            >
              {{ category.title }}
            </h3>
            <p class="text-[var(--color-text)]/70 text-lg">
              {{ category.description }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div
              v-for="(item, index) in category.items"
              :key="index"
              class="relative p-6 rounded-xl backdrop-blur-sm bg-[var(--color-background)]/30 border border-[var(--color-text)]/5"
            >
              <div class="space-y-4">
                <h4 class="text-xl font-semibold">{{ item.title }}</h4>

                <div class="flex flex-wrap gap-2">
                  <TechBadge
                    v-for="tech in item.tech"
                    :key="tech.name"
                    :tech="tech"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
