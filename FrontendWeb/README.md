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
    cd B-DEV-500-TLS-5-1-area-anastasia.bouby/FrontendWeb
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

1. To start the project, use the following command:
    ```bash
    npm run dev
    ```

    or
    ```bash
    yarn dev
    ```

**The server will run by default on port 8081.**


2. If you want build the project and after start it independently:
    ```bash
    npm run build
    ```

    or
    ```bash
    yarn build
    ```

    and:
    ```bash
    npm run preview
    ```

    or
    ```bash
    yarn preview
    ```

---

## Project structure

Here is the structure of the project:

    src
    ├── App.css
    ├── App.jsx
    ├── Dashboard
    │   ├── Dashboard.css
    │   └── Dashboard.jsx
    ├── Login
    │   ├── Login.css
    │   └── Login.jsx
    ├── Register
    │   ├── Register.css
    │   └── Register.jsx
    ├── ServiceConnection
    │   ├── ServiceConnection.css
    │   └── ServiceConnection.jsx
    ├── Title
    │   ├── Title.css
    │   └── Title.jsx
    ├── assets
    │   ├── X.png
    │   ├── cross.png
    │   ├── discord.png
    │   ├── exit.png
    │   ├── google.png
    │   ├── info.png
    │   ├── menu.png
    │   ├── plus.png
    │   └── spotify.png
    ├── index.css
    └── main.jsx
---

## Dependencies

The following dependencies are required for the project:

**Dev Dependencies:**

-   @eslint/js: ^9.9.0
-   @types/react: ^18.3.3
-   @types/react-dom: ^18.3.0
-   @vitejs/plugin-react: ^4.3.1
-   @vitejs/plugin-react-swc: ^3.7.0
-   eslint: ^9.9.0
-   eslint-plugin-react: ^7.35.0
-   eslint-plugin-react-hooks: ^5.1.0-rc.0
-   eslint-plugin-react-refresh: ^0.4.9
-   globals: ^15.9.0
-   vite: ^4.5.5
