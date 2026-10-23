# CodeNest

CodeNest is a lightweight, browser-based HTML, CSS, and JavaScript playground built with **React, TypeScript, Vite, and Monaco Editor**. Write code in separate files, run it in a sandboxed preview, and inspect basic console output without creating a local project.

## Features

- **Monaco Editor:** Syntax highlighting and dedicated HTML, CSS, and JavaScript files
- **Run Code:** Execute the current project in a sandboxed iframe; repeated runs restart the preview
- **JavaScript Console:** Display messages from `console.log()` and clear the console
- **Autosave:** Persist editor contents in browser local storage
- **Download:** Export a self-contained HTML file with the project's HTML, CSS, and JavaScript
- **Reset:** Clear the active file after confirmation
- **Shortcut:** Ctrl+R / Cmd+R while working within the app to rerun the project

## Getting started

```bash
git clone https://github.com/Christianvdev/CodeNest.git
cd CodeNest
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

For Netlify, use `npm run build` as the build command and `dist` as the publish directory.

## How it works

CodeNest keeps the three editor files in React state and saves them to `localStorage`. When you press **Run Code**, the app assembles the HTML, CSS, and JavaScript into an iframe `srcDoc` document. The iframe uses `sandbox="allow-scripts"`. Console messages are sent to the parent application with `postMessage`.

## Current limitations

- The custom console captures `console.log()` messages, not all warnings, errors, or thrown exceptions.
- Code execution is browser-based and supports HTML, CSS, and JavaScript, not server-side languages.
- Projects are stored in the current browser rather than synced across devices.
- Download exports a single HTML file, not a multi-file ZIP.

## Stack

React · TypeScript · Vite · Monaco Editor · HTML · CSS · JavaScript

## Status

Functional MVP. Improvements to console error handling, editor experience, and layout are planned.
