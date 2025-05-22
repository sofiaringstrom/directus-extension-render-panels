<template>
  <div class="wrapper">
    <!-- {{ text }} -->

    <template v-if="latestDeploy.length">
      <div class="status-wrapper">
        <div class="icon" :class="statusData.iconColor">
          <VIcon :name="statusData.icon" :large="true" />
        </div>

        <div class="text-wrapper">
          <p><strong>Latest Deploy Status</strong></p>
          <h2 class="title">{{ statusData.title }}</h2>
          <p class="content">{{ statusData.content }}</p>
        </div>
      </div>
    </template>

    <template v-else>
      <p>Loading...</p>
    </template>

    <pre>{{ latestDeploy }}</pre>
  </div>
</template>

<script setup>
  import { useApi } from "@directus/extensions-sdk";
  import { ref, computed } from "vue";

  defineProps({
    showHeader: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
  });

  const api = useApi();
  const latestDeploy = ref({});
  const status = ref("");

  async function fetchData() {
    const response = await api.get("/sr-render-status-endpoint");
    latestDeploy.value = response.data;
    status.value = response.data[0].deploy.status;
  }

  fetchData();

  const statusData = computed(() => {
    const config = {
      icon: "",
      iconColor: "",
      title: "",
      content: "",
    };

    switch (status.value) {
      case "live":
        config.icon = "check";
        config.iconColor = "green";
        config.title = "Live";
        config.content = "The latest deploy is live!";
        break;
      case "created":
        config.icon = "check";
        config.iconColor = "blue";
        config.title = "Created";
        config.content = "A deploy has been created.";
        break;
      case "build_in_progress":
        config.icon = "construction";
        config.iconColor = "blue";
        config.title = "Building...";
        config.content = "A build is in progress.";
        break;
      case "update_in_progress":
        config.icon = "downloading";
        config.iconColor = "blue";
        config.title = "Updating...";
        config.content = "Update in progress.";
        break;
      case "pre_deploy_in_progress":
        config.icon = "design_services";
        config.iconColor = "blue";
        config.title = "Pre Deploy...";
        config.content = "Pre deploy tasks are in progress.";
        break;
      case "build_failed":
        config.icon = "construction";
        config.iconColor = "orange";
        config.title = "Build failed";
        config.content = "";
        break;
      case "update_failed":
        config.icon = "downloading";
        config.iconColor = "orange";
        config.title = "Update failed";
        config.content = "";
        break;
      case "pre_deploy_failed":
        config.icon = "design_services";
        config.iconColor = "orange";
        config.title = "Pre Deploy failed";
        config.content = "";
        break;
      case "canceled":
        config.icon = "cancel";
        config.iconColor = "orange";
        config.title = "Canceled";
        config.content = "";
        break;
      case "deactivated":
        config.icon = "block";
        config.iconColor = "red";
        config.title = "Deactivated";
        config.content = "";
        break;
      default:
        break;
    }

    return config;
  });

  console.log("statusData", statusData);
</script>

<style scoped>
  .wrapper {
    padding: 1.25rem;
  }

  .status-wrapper {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    gap: 2rem;
    margin: 1.25rem 0;
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    margin-bottom: 16px;
    border-radius: 50%;
    margin-bottom: 0;

    &.green {
      color: var(--theme--success);
      background-color: var(--success-alt);
    }

    &.blue {
      color: var(--blue);
      background-color: var(--blue-alt);
    }

    &.orange {
      color: var(--theme--warning);
      background-color: var(--warning-alt);
    }

    &.red {
      color: var(--theme--danger);
      background-color: var(--danger-alt);
    }
  }

  .title {
    color: var(--theme--foreground-accent);
    font-size: 24px;
    font-weight: var(--theme--fonts--display--font-weight);
    font-family: var(--theme--fonts--display--font-family);
    font-style: normal;
    line-height: 34px;
  }

  .content {
    max-width: 300px;
    color: var(--theme--foreground-subdued);
    line-height: 22px;
  }

  .live {
    display: inline-block;
    background: var(--green);
    border-radius: 50%;
    padding: 0.5rem;
  }

  pre {
    margin-top: 5rem;
    background: var(--background-normal-alt);
    padding: 1.25rem;
    border-radius: 1%;
    overflow: auto;
  }
</style>
