# Frontend Web Project

## Description

This project is the end to end testing part of the AREA project. It provides a user interface to check if the website work properly and manage automatique tests, to ensure the proper functioning of the website on differente website and device.

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
    cd B-DEV-500-TLS-5-1-area-anastasia.bouby/
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

1. By default tests will be run on all 3 browsers, chromium, firefox and webkit using 3 workers. This can be configured in the playwright.config file. Tests are run in headless mode meaning no browser will open up when running the tests. Results of the tests and test logs will be shown in the terminal:
    ```bash
    ./launch_docker.sh
    npx playwright test
    ```

2. Run your tests with UI Mode for a better developer experience with time travel debugging, watch mode and more:
    ```bash
    npx playwright test --ui
    ```

**After your test completes, an HTML Reporter will be generated, which shows you a full report of your tests. You can click on each test and explore the test's errors as well as each step of the test. By default, the HTML report is opened automatically if some of the tests failed.***

3. To show the last report you can use the following command:
    ```bash
    npx playwright show-report
    ```
**The report will run by default on port 9323**

---

## Project structure

Here is the structure of the project:

    tests
    ├── example.spec.js
    └── README.md