<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useTextScramble } from "../composables/useTextScramble";

const scrolled = ref(false);
const activeSection = ref("home");
const isMobileMenuOpen = ref(false);
const observers = ref({});

const isProjectPage = computed(() => {
  return window.location.pathname.startsWith("/projects/");
});

const navItems = [
  { id: "home", label: "Accueil", color: "lavender" },
  { id: "projects", label: "Projets", color: "rose" },
  { id: "skills", label: "Compétences", color: "mint" },
  { id: "contact", label: "Contact", color: "peach" },
];

const scrambles = navItems.reduce((acc, item) => {
  const { displayText, scramble } = useTextScramble(item.label);
  acc[item.id] = { displayText, scramble };
  return acc;
}, {});

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

const updateActiveSection = (entries) => {
  if (isProjectPage.value) return;

  const visibleSections = entries.filter((entry) => entry.isIntersecting);
  if (visibleSections.length > 0) {
    const closestSection = visibleSections.reduce((closest, current) => {
      const closestDistance = Math.abs(closest.boundingClientRect.top);
      const currentDistance = Math.abs(current.boundingClientRect.top);
      return currentDistance < closestDistance ? current : closest;
    });
    activeSection.value = closestSection.target.id;
  }
};

const handleNavigation = (id) => {
  if (isProjectPage.value) {
    window.location.href = `/#${id}`;
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    Object.values(observers.value).forEach((observer) => observer.disconnect());
    element.scrollIntoView({ behavior: "smooth" });
    activeSection.value = id;
    isMobileMenuOpen.value = false;
    setTimeout(() => {
      setupObservers();
    }, 1000);
  }
};

const setupObservers = () => {
  if (isProjectPage.value) return;

  Object.values(observers.value).forEach((observer) => observer.disconnect());
  observers.value = {};

  navItems.forEach((item) => {
    const element = document.getElementById(item.id);
    if (element) {
      const observer = new IntersectionObserver(updateActiveSection, {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-20% 0px -20% 0px",
      });
      observer.observe(element);
      observers.value[item.id] = observer;
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  if (!isProjectPage.value) {
    setupObservers();
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  Object.values(observers.value).forEach((observer) => observer.disconnect());
});
</script>

<template>
  <nav
    class="fixed top-4 sm:top-6 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6"
    :class="{ 'top-2 sm:top-4': scrolled }"
  >
    <div class="max-w-3xl mx-auto">
      <div
        class="relative rounded-full transition-all duration-300 backdrop-blur-sm border border-[var(--color-text)]/5"
        :class="[
          scrolled
            ? 'bg-[var(--color-background)]/80 shadow-lg'
            : 'bg-[var(--color-background)]/50',
        ]"
      >
        <ul class="hidden sm:flex items-center justify-center gap-6 p-1">
          <li v-for="item in navItems" :key="item.id" class="relative">
            <button
              @click="handleNavigation(item.id)"
              @mouseenter="scrambles[item.id].scramble"
              class="px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 hover:scale-105 cursor-pointer"
              :class="[
                activeSection === item.id
                  ? `text-[var(--color-${item.color})]`
                  : 'text-[var(--color-text)]/70 hover:text-[var(--color-text)]',
              ]"
            >
              {{ scrambles[item.id].displayText }}
            </button>
            <span
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-0.5 transform scale-x-0 transition-transform duration-300"
              :class="[
                activeSection === item.id
                  ? 'scale-x-75'
                  : 'group-hover:scale-x-75',
              ]"
              :style="{
                backgroundColor: `var(--color-${item.color})`,
              }"
            ></span>
          </li>
        </ul>

        <div class="sm:hidden">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="w-full px-4 py-2 flex items-center justify-between"
          >
            <span class="text-sm font-mono text-[var(--color-text)]">
              {{
                navItems.find((item) => item.id === activeSection)?.label ||
                "Menu"
              }}
            </span>
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': isMobileMenuOpen }"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            v-show="isMobileMenuOpen"
            class="absolute top-full left-0 right-0 mt-2 bg-[var(--color-background)]/95 backdrop-blur-sm rounded-xl border border-[var(--color-text)]/5 shadow-lg overflow-hidden"
          >
            <ul class="py-2">
              <li v-for="item in navItems" :key="item.id">
                <button
                  @click="handleNavigation(item.id)"
                  class="w-full px-4 py-2 text-left text-sm font-mono transition-all duration-300"
                  :class="[
                    activeSection === item.id
                      ? `text-[var(--color-${item.color})] bg-[var(--color-${item.color})]/10`
                      : 'text-[var(--color-text)]/70 hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/5',
                  ]"
                >
                  {{ item.label }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
