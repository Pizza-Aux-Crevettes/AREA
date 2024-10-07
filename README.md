# AREA

This project is built using Docker, ensuring a streamlined development and deployment process. The project structure is organized into distinct components: the backend (including database and API access), the website, and the mobile application. Each component has its own Dockerfile located within its respective directory, and there is a docker-compose.yaml file at the root of the project.

The docker-compose.yaml file orchestrates the build process by referencing the Dockerfiles in the following directories: /Backend, /FrontendAPP, and /FrontendWeb. It builds the entire project and sets up the server.

Both the web and mobile application components can be launched independently by providing specific command-line arguments: 
use `-a` or `--app` for the mobile application, 
and `-w` or `--web` for the website.

The individual Dockerfiles are responsible for constructing each component (/Backend, /FrontendAPP, and /FrontendWeb) to enable the docker-compose.yaml to successfully launch the entire project.