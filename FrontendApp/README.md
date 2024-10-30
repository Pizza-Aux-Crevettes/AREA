# Frontend App Project

## Description

This project is the Frontend part of the AREA project. It provides a user interface to define and manage automation rules (actions and reactions), while ensuring a smooth user experience for viewing and tracking ongoing automations.

---

## Table of Contents

-   [Installation](#installation)
-   [Starting the Project](#starting-the-project)
-   [Project Structure](#project-structure)
-   [Dependencies](#dependencies)
-   [Useful Commands](#useful-commands)

---

## Installation

To install and run the frontend app locally:

1. Prerequisites

    Before getting started, make sure you have the following installed on your machine:

    -   Node.js (version 14.18+ or 16+ recommended)
    -   npm (comes with Node.js) or yarn.

2. Clone the repository:

    ```bash
    git clone git@github.com:EpitechPromo2027/B-DEV-500-TLS-5-1-area-anastasia.bouby.git
    cd B-DEV-500-TLS-5-1-area-anastasia.bouby/FrontendApp
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

    or:
    ```bash
    npm yarn
    ```

---

## Starting the project

1. To start the project and open it in android studio, use the following command:
    ```bash
    ionic capacitor build android
    ```

2. To start the project and open it in web browser, use the following command:
    ```bash
    npm run start
    ```

**The server will run by default on port 8100.**


3. If you want build the project .apk with docker and start it on your phone:
    ```bash
    cd ..
    ./launch_docker.sh
    ```

---

## Project structure

Here is the structure of the project:

    src
    ├── app
    │   ├── app.canActivate.ts
    │   ├── app.component.html
    │   ├── app.component.scss
    │   ├── app.component.spec.ts
    │   ├── app.component.ts
    │   ├── app.module.ts
    │   ├── app.redirectGard.ts
    │   ├── app-routing.module.ts
    │   ├── dashboard
    │   │   ├── dashboard.module.ts
    │   │   ├── dashboard.page.html
    │   │   ├── dashboard.page.scss
    │   │   ├── dashboard.page.spec.ts
    │   │   ├── dashboard.page.ts
    │   │   └── dashboard-routing.modules.ts
    │   ├── empty.component.ts
    │   ├── login
    │   │   ├── login.module.ts
    │   │   ├── login.page.html
    │   │   ├── login.page.scss
    │   │   ├── login.page.spec.ts
    │   │   ├── login.page.ts
    │   │   └── login-routing.module.ts
    │   ├── register
    │   │   ├── register.module.ts
    │   │   ├── register.page.html
    │   │   ├── register.page.scss
    │   │   ├── register.page.spec.ts
    │   │   ├── register.page.ts
    │   │   └── register-routing.module.ts
    │   ├── service
    │   │   ├── service.module.ts
    │   │   ├── service.page.html
    │   │   ├── service.page.scss
    │   │   ├── service.page.spec.ts
    │   │   ├── service.page.ts
    │   │   └── service-routing.module.ts
    │   └── services
    │       ├── area
    │       │   └── area.service.ts
    │       ├── localStorage
    │       │   └── localStorage.service.ts
    │       ├── login
    │       │   └── login.service.ts
    │       ├── register
    │       │   └── register.service.ts
    │       ├── token
    │       │   └── token.service.ts
    │       └── utils
    │           └── utils.service.ts
    ├── assets
    │   ├── discord.png
    │   ├── fonts
    │   │   ├── OpenDyslexic-Bold.eot
    │   │   ├── OpenDyslexic-Bold-Italic.eot
    │   │   ├── OpenDyslexic-Bold-Italic.otf
    │   │   ├── OpenDyslexic-Bold-Italic.woff
    │   │   ├── OpenDyslexic-Bold-Italic.woff2
    │   │   ├── OpenDyslexic-Bold.otf
    │   │   ├── OpenDyslexic-Bold.woff
    │   │   ├── OpenDyslexic-Bold.woff2
    │   │   ├── opendyslexic-characters.pdf
    │   │   ├── OpenDyslexic-Italic.eot
    │   │   ├── OpenDyslexic-Italic.otf
    │   │   ├── OpenDyslexic-Italic.woff
    │   │   ├── OpenDyslexic-Italic.woff2
    │   │   ├── OpenDyslexic-Regular.eot
    │   │   ├── OpenDyslexic-Regular.otf
    │   │   ├── OpenDyslexic-Regular.woff
    │   │   └── OpenDyslexic-Regular.woff2
    │   ├── github.png
    │   ├── google.png
    │   ├── spotify.png
    │   └── twitch.png
    ├── environments
    │   ├── environment.prod.ts
    │   └── environment.ts
    ├── global.scss
    ├── index.html
    ├── main.ts
    ├── polyfills.ts
    ├── test.ts
    ├── theme
    │   └── variables.scss
    ├── utils
    │   └── ApiService.ts
    └── zone-flags.ts

---

## Dependencies

The following dependencies are required for the project:

**Dev Dependencies:**

-    @angular-devkit/build-angular: ^18.0.0,
-    @angular-eslint/builder: ^18.0.0,
-    @angular-eslint/eslint-plugin: ^18.0.0,
-    @angular-eslint/eslint-plugin-template: ^18.0.0,
-    @angular-eslint/schematics: ^18.0.0,
-    @angular-eslint/template-parser: ^18.0.0,
-    @angular/cli: 18.2.5,
-    @angular/compiler-cli: ^18.0.0,
-    @angular/language-service: ^18.0.0,
-    @capacitor/cli: 6.1.2,
-    @ionic/angular-toolkit: ^11.0.1,
-    @types/jasmine: ~5.1.0,
-    @typescript-eslint/eslint-plugin: ^6.0.0,
-    @typescript-eslint/parser: ^6.0.0,
-    eslint: ^8.57.0,
-    eslint-plugin-import: ^2.29.1,
-    eslint-plugin-jsdoc: ^48.2.1,
-    eslint-plugin-prefer-arrow: 1.2.2,
-    jasmine-core: ~5.1.0,
-    jasmine-spec-reporter: ~5.0.0,
-    karma: ~6.4.0,
-    karma-chrome-launcher: ~3.2.0,
-    karma-coverage: ~2.2.0,
-    karma-jasmine: ~5.1.0,
-    karma-jasmine-html-reporter: ~2.1.0,
-    typescript: ~5.4.0

---

## Useful Commands

-   Build the project: `npm run build`
-   Start the server: `npm run start`
-   Run the project in android studio: `ionic capacitor build android`
-   Run the project in the web browser : `ionic serve`
-   Lint the code: `npm run lint`