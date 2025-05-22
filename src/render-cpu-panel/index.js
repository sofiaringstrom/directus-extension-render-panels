import PanelComponent from "./panel.vue";

export default {
  id: "sr-render-cpu-panel",
  name: "Render CPU",
  icon: "data_usage",
  description: "Display the current CPU metrics from Render.",
  component: PanelComponent,
  options: [],
  minWidth: 12,
  minHeight: 8,
};
