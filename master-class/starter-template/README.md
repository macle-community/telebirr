# Taro + Macle starter

A minimal React/Taro app for the course. Use this folder for the hands-on lessons; the repository root contains a separate, larger Telebirr sample app.

## Requirements

- Node.js 18 or later
- npm
- The current Macle web simulator or a supported device

## Setup

```sh
npm install
npm run typecheck
npm run build:macle
npm run sim:macle
```

Open `http://localhost:30005`. The simulator script builds the app before serving it.

To run only the build:

```sh
npm run build:macle
```

## Project map

- `config/index.ts` selects React, the Taro Webpack 5 compiler, and the published Macle platform plugin.
- `src/app.config.ts` registers the app's pages and navigation-bar settings.
- `src/pages/index/` contains the first React page.
- `project.config.json` contains the simulator/project metadata.

## Troubleshooting

- If the build reports a platform/plugin error, confirm `@macle-community/taro-plugin-macle` is installed and use the exact setup documented for its current release.
- If the simulator opens but the page is blank, check the browser console, compiler output, page registration, and runtime compatibility.
- Device APIs and custom UI libraries may require permissions, account access, or version-specific setup. Do not assume simulator support.

## API and payment safety

Use the platform documentation that matches your target runtime. Never put merchant signing credentials or payment secrets in this client. The course capstone checkout is a mock flow and does not process a real payment.
