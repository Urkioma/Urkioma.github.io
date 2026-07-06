<script setup>
import { useTextScramble } from "../../composables/useTextScramble";
import TechBadge from "../ui/TechBadge.vue";

const { scramble: scrambleTitle } = useTextScramble("Compétences");

const skillCategories = {
  system: {
    title: "Virtualisation & Système",
    description: "Conception, migration et maintien en condition opérationnelle d'infrastructures",
    color: "lavender",
    items: [
      {
        title: "Hyperviseurs & Stockage",
        tech: [
          { name: "Proxmox VE", color: "lavender", delay: "delay-100" },
          { name: "VMware ESXi", color: "mint", delay: "delay-200" },
          { name: "Ceph", color: "rose", delay: "delay-300" },
        ],
      },
      {
        title: "Systèmes d'exploitation",
        tech: [
          { name: "Debian Linux", color: "peach", delay: "delay-100" },
          { name: "Windows Server", color: "mint", delay: "delay-200" },
        ],
      },
    ],
  },
  devops: {
    title: "Automatisation & DevOps",
    description: "Industrialisation des déploiements et gestion du cycle de vie du parc",
    color: "mint",
    items: [
      {
        title: "Configuration & Orchestration",
        tech: [
          { name: "Ansible", color: "lavender", delay: "delay-100" },
          { name: "Ansible Semaphore", color: "mint", delay: "delay-200" },
          { name: "Cloud-Init", color: "rose", delay: "delay-300" },
        ],
      },
      {
        title: "Scripts & Outils",
        tech: [
          { name: "PowerShell", color: "peach", delay: "delay-100" },
          { name: "Bash", color: "mint", delay: "delay-200" },
          { name: "Git", color: "rose", delay: "delay-300" },
        ],
      },
    ],
  },
  security: {
    title: "Observabilité & Sécurité",
    description: "Supervision proactive, centralisation des données et durcissement",
    color: "peach",
    items: [
      {
        title: "Supervision & Logs",
        tech: [
          { name: "Centreon", color: "lavender", delay: "delay-100" },
          { name: "Graylog", color: "mint", delay: "delay-200" },
          { name: "NXLog", color: "rose", delay: "delay-300" },
        ],
      },
      {
        title: "Sécurité & Identités",
        tech: [
          { name: "Wazuh (SIEM)", color: "peach", delay: "delay-100" },
          { name: "Active Directory", color: "mint", delay: "delay-200" },
          { name: "ACL NTFS (AGDLP)", color: "rose", delay: "delay-300" },
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
        Administrateur Systèmes et Réseaux spécialisé dans l'automatisation, 
        la virtualisation haute disponibilité et la sécurisation des infrastructures.
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