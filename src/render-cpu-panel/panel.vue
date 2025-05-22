<template>
  <div class="wrapper">
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <!-- Background circle -->
      <circle
        class="progress-background"
        cx="50"
        cy="50"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke="bgColor"
      />
      <!-- Progress circle -->
      <circle
        class="progress-bar"
        cx="50"
        cy="50"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke="progressColor"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
      <!-- Percentage text -->
      <text x="50" y="50" text-anchor="middle" dy="0.3em">{{ progress }}%</text>
    </svg>
  </div>
</template>

<script setup>
  import { useApi } from "@directus/extensions-sdk";
  import { ref, computed } from "vue";

  const props = defineProps({
    /** Color of the progress arc */
    color: {
      type: String,
      default: "var(--theme--primary)",
    },
    /** Color of the background arc */
    bgColor: {
      type: String,
      default: "var(--theme--background-subdued)",
    },
  });

  const api = useApi();
  const progress = ref(0);
  const strokeWidth = ref(8);

  async function fetchData() {
    const response = await api.get("/sr-render-cpu-endpoint");
    progress.value = parseFloat(response.data.percentage).toFixed(2);
  }

  fetchData();

  const progressColor = computed(() => {
    if (progress.value < 55) return "var(--green)";
    if (progress.value >= 55 && progress.value <= 80) return "var(--orange)";
    return "var(--red)";
  });

  // Radius adjusted so stroke stays inside the viewBox
  const radius = computed(() => 50 - strokeWidth.value / 2);

  // Full circumference of the circle
  const circumference = computed(() => 2 * Math.PI * radius.value);
  // Stroke offset for the current progress
  const dashOffset = computed(
    () => circumference.value * (1 - progress.value / 100)
  );
</script>

<style scoped>
  .wrapper {
    padding: 2.5rem;
  }

  .progress-background {
    fill: none;
  }
  .progress-bar {
    fill: none;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: stroke-dashoffset 0.5s ease;
  }
  text {
    font-weight: 800;
    font-size: var(--f2466a3e);
    line-height: 52px;
  }

  pre {
    margin-top: 5rem;
    background: var(--background-normal-alt);
    padding: 1.25rem;
    border-radius: 1%;
    overflow: auto;
  }
</style>
