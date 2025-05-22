import PanelComponent from "./panel.vue";

export default {
  id: "sr-render-status-panel",
  name: "Render Status",
  icon: "cloud_upload",
  description: "Show latest deploy status from Render.",
  component: PanelComponent,
  options: [
    {
      field: "text",
      name: "Text",
      type: "string",
      meta: {
        interface: "input",
        width: "full",
      },
    },
  ],
  minWidth: 12,
  minHeight: 8,
};
