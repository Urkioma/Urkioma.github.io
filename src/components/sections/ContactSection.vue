<script setup>
import { computed } from "vue";
import ButtonCTA from "../ui/ButtonCTA.vue";

const currentYear = computed(() => new Date().getFullYear());

const contactLinks = [
  {
    name: "GitHub",
    url: "https://github.com/urkioma",
    label: "Voir mon GitHub",
  },
  {
    name: "Email",
    url: "mailto:jeremy_stephan@orange.fr",
    label: "Me contacter",
  },
];
</script>

<template>
  <footer id="contact" class="relative min-h-screen flex flex-col">
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-background)] opacity-50"
    />

    <div class="flex-grow flex items-center justify-center px-6 py-24">
      <div class="relative max-w-4xl w-full mx-auto space-y-16">
        <div class="text-center space-y-6">
          <h2 class="text-5xl md:text-6xl font-bold">
            Intéressé par mon profil ?
          </h2>
          <p class="text-xl text-[var(--color-text)]/70 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour échanger sur vos opportunités de
            développeur fullstack.
          </p>
        </div>

        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <ButtonCTA
            v-for="link in contactLinks"
            :key="link.name"
            :href="link.url"
            :label="link.label"
            variant="outline"
          />

          <ButtonCTA
            href="/CV.pdf"
            label="Télécharger mon CV"
            variant="solid"
          />
        </div>
      </div>
    </div>

    <div class="relative py-8 text-center text-sm text-[var(--color-text)]/50">
      <p>© {{ currentYear }} Jeremy Stephan. Tous droits réservés.</p>
    </div>
  </footer>
</template>
