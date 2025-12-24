### New Developer Onboarding Document -- DRAFT

Welcome to the OpenDSA project! This document will guide you through the process of setting up your development environment and introduce you to the project's architecture and workflow.

**1. Project Overview**

OpenDSA is a project dedicated to creating open-source, interactive courseware for Data Structures and Algorithms courses. The project combines textbook-quality content with algorithm visualizations and interactive, automatically assessed exercises.

**2. Setting up the Development Environment**

The OpenDSA development environment is managed using Docker.

*   **Prerequisites:**
    *   [Docker](https://docs.docker.com/get-docker/)
    *   [Git](https://git-scm.com/book/en/v2/getting-started-installing-git)
*   **Installation:**
    1.  Clone the `OpenDSA` repository.
    2.  Start the development environment using `docker compose up`.
    3.  Access a shell within the running container using `docker compose exec opendsa bash`.
    4.  Build a book using the `make` command (e.g., `make Test`).

For detailed instructions, refer to the `README.md` file.

**3. Project Structure**

The project is organized into several directories:

*   `AV`: Source code for algorithm visualizations.
*   `Books`: Compiled versions of the "textbooks".
*   `config`: Configuration files for different books.
*   `Doc`: Project documentation.
*   `Exercises`: Interactive exercises.
*   `JSAV`: The JavaScript Algorithm Visualization library.
*   `lib`: System-wide library files.
*   `RST`: Tutorial content in reStructuredText format.
*   `SourceCode`: Code snippets used in the tutorials.

**4. Development Workflow**

*   **Building Books:** Books are built from within the Docker container using the `make` command. The configuration for each book is defined in the `config` directory.
*   **Creating Content:**
    *   Textbook content is written in reStructuredText (`.rst`) files in the `RST` directory.
    *   Algorithm visualizations are created in the `AV` directory.
    *   Interactive exercises are developed in the `Exercises` directory.
*   **Documentation:** The project documentation is in the `Doc` directory and can be compiled using `make`.

**5. Key Technologies**

*   **Docker:** For creating a consistent development environment.
*   **reStructuredText (RST):** For writing the textbook content.
*   **Sphinx:** For building the RST content into HTML.
*   **JSAV:** A JavaScript library for creating algorithm visualizations.
*   **Khan Academy Exercise Framework:** For creating interactive exercises.

Please take some time to review the `README.md` file and the documentation in the `Doc` directory to familiarize yourself with the project.