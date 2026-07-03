<script setup>
import { computed } from "vue";
import TechBadge from "./ui/TechBadge.vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const bgColorClass = computed(() => {
  const colors = {
    lavender: "bg-[var(--color-lavender)]",
    rose: "bg-[var(--color-rose)]",
    mint: "bg-[var(--color-mint)]",
    peach: "bg-[var(--color-peach)]",
  };
  return colors[props.project.color] || colors.lavender;
});
</script>

<template>
  <a :href="`/projects/${project.slug}`" class="block sticky top-0">
    <article
      class="w-full transition-colors duration-500 cursor-pointer"
      :class="[bgColorClass]"
    >
      <div class="max-w-7xl mx-auto px-4 h-full">
        <div class="flex flex-col lg:flex-row gap-16 items-center py-16">
          <div class="flex-1 space-y-12">
            <h3
              class="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-black"
            >
              {{ project.title }}
            </h3>

            <div class="space-y-10">
              <p
                class="text-2xl leading-relaxed text-black/80 font-medium max-w-2xl"
              >
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-4">
                <TechBadge
                  v-for="tech in project.tech"
                  :key="tech.name"
                  :tech="tech"
                  class="bg-black"
                />
              </div>
            </div>
          </div>

          <div class="lg:w-1/3 h-full relative">
            <div class="aspect-[16/9] rounded-xl overflow-hidden">
              <video
                v-if="project.preview.type === 'video'"
                :src="project.preview.url"
                class="h-full w-full object-cover"
                autoplay
                loop
                muted
                playsinline
              />
              <img
                v-else
                :src="project.preview.url"
                :alt="project.title"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  </a>
</template>
