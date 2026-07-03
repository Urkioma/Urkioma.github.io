<script setup>
import { useTextScramble } from "../composables/useTextScramble";
import ButtonCTA from "./ui/ButtonCTA.vue";
import TechBadge from "./ui/TechBadge.vue";

const props = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
});

const { displayText: titleText } = useTextScramble(props.frontmatter.title);
</script>

<template>
  <article class="min-h-screen">
    <header class="relative py-24 lg:min-h-[60vh] flex items-center">
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute inset-0"
          :class="`bg-gradient-to-br from-[var(--color-${frontmatter.color})] to-transparent`"
        />
      </div>

      <div class="relative max-w-7xl mx-auto px-6 space-y-8">
        <div class="space-y-6 max-w-4xl">
          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
            {{ titleText }}
          </h1>
          <p
            class="text-xl sm:text-2xl leading-relaxed text-[var(--color-text)]/70"
          >
            {{ frontmatter.description }}
          </p>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-start gap-8"
        >
          <div class="flex flex-wrap gap-3">
            <TechBadge
              v-for="tech in frontmatter.tech"
              :key="tech.name"
              :tech="tech"
            />
          </div>

          <div class="flex flex-wrap gap-4">
            <ButtonCTA
              :href="frontmatter.githubUrl"
              label="Voir sur GitHub"
              :color="frontmatter.color"
              variant="solid"
            />
            <ButtonCTA
              v-if="frontmatter.demoUrl"
              :href="frontmatter.demoUrl"
              label="Voir la démo"
              :color="frontmatter.color"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </header>

    <div
      class="w-full py-12 relative overflow-hidden backdrop-blur-sm bg-[var(--color-background)]/30"
    >
      <div class="max-w-7xl mx-auto px-6">
        <div
          class="rounded-xl overflow-hidden border border-[var(--color-text)]/5"
        >
          <video
            v-if="frontmatter.preview?.type === 'video'"
            :src="frontmatter.preview.url"
            class="w-full object-cover"
            autoplay
            loop
            muted
            playsinline
          />
          <img
            v-else
            :src="frontmatter.preview?.url || frontmatter.image"
            :alt="frontmatter.title"
            class="w-full object-cover"
          />
        </div>
      </div>
    </div>

    <div class="relative max-w-4xl mx-auto px-6 py-24">
      <div
        class="absolute inset-0 opacity-[0.02]"
        style="
          background-image:
            linear-gradient(rgba(205, 214, 244, 0.5) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(205, 214, 244, 0.5) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        "
      />

      <div class="relative prose prose-invert prose-lg max-w-none">
        <slot name="content"></slot>
      </div>
    </div>
  </article>
</template>

<style>
.prose {
  --tw-prose-invert-body: var(--color-text);
  --tw-prose-invert-headings: var(--color-text);
  --tw-prose-invert-links: var(--color-accent);
  --tw-prose-invert-bold: var(--color-accent);
  --tw-prose-invert-counters: var(--color-text);
  --tw-prose-invert-bullets: var(--color-accent);
  --tw-prose-invert-hr: var(--color-text);
  --tw-prose-invert-quotes: var(--color-text);
  --tw-prose-invert-quote-borders: var(--color-accent);
  --tw-prose-invert-captions: var(--color-text);
  --tw-prose-invert-code: var(--color-text);
  --tw-prose-invert-pre-code: var(--color-text);
  --tw-prose-invert-pre-bg: rgba(0, 0, 0, 0.2);
}

.prose :where(h2):not(:where([class~="not-prose"] *)) {
  font-size: 2.25rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  line-height: 2.5rem;
  position: relative;
  display: inline-block;
}

.prose :where(h2):not(:where([class~="not-prose"] *))::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 2em;
  height: 3px;
  background: var(--color-accent);
  border-radius: 2px;
}

.prose :where(h3):not(:where([class~="not-prose"] *)) {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prose :where(pre):not(:where([class~="not-prose"] *)) {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(205, 214, 244, 0.1);
  border-radius: 0.5rem;
}

.prose :where(code):not(:where([class~="not-prose"] *)) {
  font-family: "JetBrains Mono", monospace;
}

.prose :where(a):not(:where([class~="not-prose"] *)) {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.prose :where(a):not(:where([class~="not-prose"] *)):hover {
  border-bottom-color: var(--color-accent);
}
</style>
