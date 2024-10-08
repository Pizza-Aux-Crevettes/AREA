# Frontend Web Project

## Description

This project is the Frontend part of the AREA project. It provides a user interface to define and manage automation rules (actions and reactions), while ensuring a smooth user experience for viewing and tracking ongoing automations.

---

## Table of Contents

-   [Installation](#installation)
-   [Starting the Project](#starting-the-project)
-   [Project Structure](#project-structure)

---

## Installation

To install and run the frontend web locally:

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

**The server will run by default on port 4200.**


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
    │   ├── app.canActivate.ts
    │   ├── app.component.html
    │   ├── app.component.scss
    │   ├── app.component.spec.ts
    │   ├── app.component.ts
    │   ├── app.module.ts
    │   ├── app.redirectGard.ts
    │   ├── app-routing.module.ts
    │   ├── dashboard
    │   │   ├── dashboard.module.ts
    │   │   ├── dashboard.page.html
    │   │   ├── dashboard.page.scss
    │   │   ├── dashboard.page.spec.ts
    │   │   ├── dashboard.page.ts
    │   │   └── dashboard-routing.modules.ts
    │   ├── empty.component.ts
    │   ├── login
    │   │   ├── login.module.ts
    │   │   ├── login.page.html
    │   │   ├── login.page.scss
    │   │   ├── login.page.spec.ts
    │   │   ├── login.page.ts
    │   │   └── login-routing.module.ts
    │   ├── register
    │   │   ├── register.module.ts
    │   │   ├── register.page.html
    │   │   ├── register.page.scss
    │   │   ├── register.page.spec.ts
    │   │   ├── register.page.ts
    │   │   └── register-routing.module.ts
    │   ├── service
    │   │   ├── service.module.ts
    │   │   ├── service.page.html
    │   │   ├── service.page.scss
    │   │   ├── service.page.spec.ts
    │   │   ├── service.page.ts
    │   │   └── service-routing.module.ts
    │   └── services
    │       ├── localStorage
    │       │   └── localStorage.service.ts
    │       ├── login
    │       │   └── login.service.ts
    │       ├── register
    │       │   └── register.service.ts
    │       ├── spotify
    │       │   └── spotify.service.ts
    │       ├── token
    │       │   └── token.service.ts
    │       └── weather
    │           └── weather.service.ts
    ├── assets
    │   ├── discord.png
    │   ├── exit.png
    │   ├── google.png
    │   ├── menu.png
    │   ├── spotify.png
    │   └── X.png
    ├── environments
    │   ├── environment.prod.ts
    │   └── environment.ts
    ├── global.scss
    ├── index.html
    ├── main.ts
    ├── polyfills.ts
    ├── test.ts
    ├── theme
    │   └── variables.scss
    ├── utils
    │   └── ApiService.ts
    └── zone-flags.ts
