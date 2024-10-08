# AREA

This project is built using Docker, ensuring a streamlined development and deployment process. The project structure is organized into distinct components: the backend (including database and API access), the website, and the mobile application. Each component has its own Dockerfile located within its respective directory, and there is a docker-compose.yaml file at the root of the project.

The docker-compose.yaml file orchestrates the build process by referencing the Dockerfiles in the following directories: /Backend, /FrontendAPP, and /FrontendWeb. It builds the entire project and sets up the server. You can launch it via the executable file launch_docker.sh.

The individual Dockerfiles are responsible for constructing each component (/Backend, /FrontendAPP, and /FrontendWeb) to enable the docker-compose.yaml to successfully launch the entire project.

You can check the documentation from different part of the project below :
    [Backend](https://github.com/EpitechPromo2027/B-DEV-500-TLS-5-1-area-anastasia.bouby/blob/main/Backend/README.md)
    [Frontend Web](https://github.com/EpitechPromo2027/B-DEV-500-TLS-5-1-area-anastasia.bouby/blob/main/FrontendWeb/README.md)
    [Frontend APP](https://github.com/EpitechPromo2027/B-DEV-500-TLS-5-1-area-anastasia.bouby/blob/main/FrontendAPP/README.md)