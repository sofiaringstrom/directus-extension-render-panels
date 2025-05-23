![Extension screenshot](https://raw.githubusercontent.com/sofiaringstrom/directus-extension-render-panels/refs/heads/main/docs/screenshot_1.png)

# directus-extension-render-panels

This bundle extension adds panels to Directus insights/dashboard to display the status of a Render service. Simple specify the environment variables in the .env file and you're good to go.

### Demo

**Building**

<img src="https://raw.githubusercontent.com/sofiaringstrom/directus-extension-render-panels/refs/heads/main/docs/building.png" width="600" height="auto">

<br />

**Build failed**

<img src="https://raw.githubusercontent.com/sofiaringstrom/directus-extension-render-panels/refs/heads/main/docs/build-fail.png" width="600" height="auto">

<br />

**CPU usage**

<img src="https://raw.githubusercontent.com/sofiaringstrom/directus-extension-render-panels/refs/heads/main/docs/cpu-orange.png" width="400" height="auto">
<img src="https://raw.githubusercontent.com/sofiaringstrom/directus-extension-render-panels/refs/heads/main/docs/cpu-red.png" width="400" height="auto">

<br />

| Render Deploy status types |
| -------------------------- |
| `live`                     |
| `created`                  |
| `build_in_progress`        |
| `update_in_progress`       |
| `pre_deploy_in_progress`   |
| `build_failed`             |
| `update_failed`            |
| `pre_deploy_failed`        |
| `canceled`                 |
| `deactivated`              |

<br />

## Features

TODO

## Installation

TODO

### env vars

`DIRECTUS_RENDER_API_TOKEN`: `rnd_XXXXXXXXXXXX`

https://render.com/docs/api#1-create-an-api-key

`DIRECTUS_RENDER_SERVICE_ID`: `srv_XXXXXXXXXXXX`

## Planned

- [ ] Add panel for memory usage
- [ ] Add panel for disk usage
- [ ] Add panel for bandwidth usage
- [ ] Panel customization (colors, etc)

## Considered

- [ ] Trigger build hook
- [ ] Webhooks
- [ ] Trigger job
- [ ] Logs
