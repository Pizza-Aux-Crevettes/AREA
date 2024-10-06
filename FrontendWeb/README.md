# Frontend Web Project

## Description

This project is the Frontend part of the AREA project. It provides a user interface to define and manage automation rules (actions and reactions), while ensuring a smooth user experience for viewing and tracking ongoing automations.

---

## Table of Contents

-   [Installation](#installation)
-   [Starting the Project](#starting-the-project)
-   [Environment Variables](#environment-variables)
-   [API Documentation](#api-documentation)
-   [Project Structure](#project-structure)
-   [Dependencies](#dependencies)
-   [Useful Commands](#useful-commands)

---

## Installation

To install and run the frontend web locally:

1. Prerequisites

    Before getting started, make sure you have the following installed on your machine:

    Node.js (version 14.18+ or 16+ recommended)
    npm (comes with Node.js) or yarn.

2. Clone the repository:

    ```bash
    git clone <your-repo-url>
    cd frontWeb-project
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

The server will run by default on port 5173.

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

## API Documentation

The complete API documentation can be accessed via Swagger. Once the server is running, navigate to http://localhost:3000/api-docs to explore the available endpoints and their usage.

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

**Dependencies:**

-   @mantine/core: ^7.13.1
-   @mantine/hooks: ^7.13.1
-   @mantine/notifications: ^7.12.2
-   @tabler/icons-react: ^3.17.0
-   axios: ^1.7.7
-   cookies-js: ^1.2.3
-   react: ^18.3.1
-   react-dom: ^18.3.1
-   react-router-dom: ^6.26.2

