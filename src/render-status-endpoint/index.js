export default {
  id: "sr-render-status-endpoint",
  handler: (router) => {
    router.get("/", async (req, res) => {
      try {
        // const { service_id, token } = req.query;

        // if (!service_id) {
        //   res.status(400).send("Missing service_id");
        //   return;
        // }

        // if (!token) {
        //   res.status(400).send("Missing token");
        //   return;
        // }

        const response = await fetch(
          `https://api.render.com/v1/services/${process.env.RENDER_SERVICE_ID}/deploys?limit=1`,
          {
            headers: {
              Authorization: `Bearer ${process.env.RENDER_API_TOKEN}`,
            },
          }
        );

        if (response.ok) {
          res.json(await response.json());
        } else {
          res.status(response.status).send(response.statusText);
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  },
};
