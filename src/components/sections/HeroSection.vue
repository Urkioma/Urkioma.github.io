<script setup>
import TechBadge from "../ui/TechBadge.vue";
import Cube3D from "../ui/Cube3D.vue";
import ButtonCTA from "../ui/ButtonCTA.vue";
import { techStack } from "../../data/techStack";
import { computed } from "vue";

// On remplace frontend/backend par tes vraies catégories d'admin sys
const categories = ["infrastructure", "automation"];

const techByCategory = computed(() => {
  return categories.reduce((acc, category) => {
    acc[category] = techStack.filter((tech) => tech.category === category);
    return acc;
  }, {});
});
</script>

<template>
  <section id="home" class="min-h-screen w-full overflow-hidden pt-16 sm:pt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div
        class="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-16 py-12 lg:py-20"
      >
        <div class="w-full lg:w-3/5 space-y-8 lg:space-y-12">
          <div class="space-y-4">
            <h1
              class="animate-fade-in-up text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight"
            >
              Jeremy Stephan
            </h1>
            <p
              class="animate-fade-in-up text-[var(--color-accent)] font-mono text-lg sm:text-xl delay-100"
            >
              Administrateur Systèmes et Réseaux
            </p>
          </div>

          <div class="space-y-6">
            <h2
              class="animate-fade-in-up delay-200 text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight"
            >
              Architecturer avec
              <span class="text-[var(--color-mint)]">résilience</span>
              <span class="text-[var(--color-text)]/70">&</span>
              <span class="text-[var(--color-peach)]">sécurité</span>
            </h2>
            <p
              class="animate-fade-in-up delay-300 text-base sm:text-lg lg:text-xl text-[var(--color-text)]/70 max-w-2xl leading-relaxed"
            >
              Spécialisé dans la gestion d'infrastructures critiques, la virtualisation haute disponibilité, l'industrialisation et la sécurité. Je conçois des architectures système et réseau résilientes, automatisées et prêtes pour la production.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <div
              v-for="category in categories"
              :key="category"
              class="space-y-4"
            >
              <h3
                class="text-sm uppercase tracking-wider text-[var(--color-text)]/50 font-mono"
              >
                {{ category === 'infrastructure' ? 'Infrastructure & Systèmes' : 'Automatisation & Scripting' }}
              </h3>
              <div class="flex flex-wrap gap-2 sm:gap-3">
                <TechBadge
                  v-for="tech in techByCategory[category]"
                  :key="tech.name"
                  :tech="tech"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 sm:gap-6 pt-6 sm:pt-8">
            <ButtonCTA
              href="#projects"
              label="Explorer mes projets"
              color="mint"
              variant="solid"
            />
            <ButtonCTA
              href="#contact"
              label="Me contacter"
              color="accent"
              variant="outline"
            />
          </div>
        </div>

        <div class="w-full lg:w-2/5">
          <Cube3D />
        </div>
      </div>
    </div>
  </section>
</template>