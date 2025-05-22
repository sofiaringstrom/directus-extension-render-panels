export default {
  id: "sr-render-cpu-endpoint",
  handler: (router) => {
    router.get("/", async (req, res) => {
      try {
        const responseLimit = await fetch(
          `https://api.render.com/v1/metrics/cpu-limit?resolutionSeconds=60&resource=${process.env.RENDER_SERVICE_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.RENDER_API_TOKEN}`,
            },
          }
        );

        const responseUsage = await fetch(
          `https://api.render.com/v1/metrics/cpu?resolutionSeconds=60&resource=${process.env.RENDER_SERVICE_ID}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.RENDER_API_TOKEN}`,
            },
          }
        );

        if (responseLimit.ok && responseUsage.ok) {
          const l = await responseLimit.json();
          const u = await responseUsage.json();

          const limitLength = l[0].values.length - 1;
          const usageLength = u[0].values.length - 1;

          const total = l[0].values[limitLength].value;
          const usage = u[0].values[usageLength].value;

          let percentage = (usage / total) * 100;
          percentage = percentage.toFixed(2);

          res.status(200).send({ percentage });
        } else if (responseLimit.ok) {
          res.status(responseUsage.status).send(responseUsage.statusText);
        } else if (responseUsage.ok) {
          res.status(responseLimit.status).send(responseLimit.statusText);
        } else {
          res.status(responseLimit.status).send(responseLimit.statusText);
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  },
};
