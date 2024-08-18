# OpenDSA Fork for MHC COMSC 205: Data Structures

## Setup (Tony's experience)

1. Install [Docker](https://docs.docker.com/get-docker/)
2. Install [Git](https://git-scm.com/book/en/v2/fGetting-Started-Installing-Git)
3. Clone this repository
4. Start the service: `docker-compose up` (and leave this running)
    - [Tony note]: I had to run `docker compose up` with no dash on my machine (WSL on Windows)
    - The first build of images takes under 5 minutes.  Running them later takes under 10 seconds.
    - The service is ready when you see `opendsa_1 | * Serving Flask app "app.py"`
    - This terminal will not be usable at this point since it is a console for the web server.
    - You can stop the containers by sending an interrupt signal (Press CTRL + C) or using the `docker-compose down` command.
5. Build the Data Structures book
    1. Open a new shell in the root of the repository.
    2. Run `docker-compose exec opendsa bash` to enter the running container from Step 4
        - Note: If you are on Windows using the MINGW64 shell, you might need to use the command: `winpty docker-compose exec opendsa bash`
    3. To make the COMSC-205 book, use the command `make comsc205`
6. See the created book at: https://opendsa.localhost.devcom.vt.edu/Books/
7. In order to stop the container, you can use the CTRL + C (sending an interrupt signal).

## Repository Structure

Below are the relevant files for our particular build of the Data Structures book.

```
├── config                      <- Stores different book configurations
│   └── MHC 
│       └── f24_comsc205.json   <- Our book configuration for F24
├── RST                         <- Stores source for textbook content
│   └── en                      
│       └── ...                 <- Directories correspond to chapter titles specified in the book configuration
└── Makefile                    <- See the bottom for our build rule for `make comsc205`
```


## Modifying the Book Configuration

We can modify the book configuration by editing the `f24_comsc205.json` file, under
the `chapters` object. The top level key is the chapter name of our choosing, while
the values within a particular chapter map to a particular module section in `RST/en`.
For example, the following json creates a chapter called "Intro to Java II: Loops and Arrays" which contains the module located at `RST/en/IntroToSoftwareDesign/ConditionalActions.rst`:

```json
"chapters": {
    "Intro to Java II: Loops and Arrays": {
        "IntroToSoftwareDesign/ConditionalActions": {},
    }
}
```

We can preview the material at the following links:
- CS1 Java intro
    - compiled online textbook: https://opendsa.cs.vt.edu/OpenDSA/Books/IntroToSoftwareDesign/html/
    - local configuration: `config/IntroToSoftwareDesign.json`
- Data Structures reference
    - compiled online textbook: https://opendsa.cs.vt.edu/OpenDSA/Books/Everything/html/
    - local configuration: `config/Everything.json`

OpenDSA also provides a GUI to update the book: https://opendsa.cs.vt.edu/configurations/book
(**Note:** I am currently having issues loading configurations, emailing with the OpenDSA team for a solution)

1. Upload a book config, such as our `f24_comsc205.json` under `Load Existing Configuration -> Select Configuration File` (may take a while to load)
2. Scroll to the bottom to see tree structure of `Book Content`
3. Drag and drop modules to add them, right click to rename/remove.
4. Download the updated configuration via the `Download Configuration` button at the bottom of the page.

---

Below is the original repo's README.

# OpenDSA (Development Channel)

This is the development repository for the OpenDSA project.

The goal of the OpenDSA project is to create open-source courseware for use in
Data Structures and Algorithms courses, that deeply integrates textbook-quality
content with algorithm visualizations and interactive, automatically assessed
exercises.

System documentation can be found at http://opendsa.readthedocs.io/.

## Setup

1. Install [Docker](https://docs.docker.com/get-docker/). 
2. Install [Git](https://git-scm.com/book/en/v2/fGetting-Started-Installing-Git)
3. Clone this repository
    - For reading only: `git clone git://github.com/OpenDSA/OpenDSA.git`
    - For read/write: `git clone https://YOURGITHUBID@github.com/OpenDSA/OpenDSA.git`
4. Start the service: `docker-compose up` (and leave this running)
    - The first build of images takes under 5 minutes.  Running them later takes under 10 seconds.
    - The service is ready when you see `opendsa_1 | * Serving Flask app "app.py"`
    - This terminal will not be usable at this point since it is a console for the web server.
    - You can stop the containers by sending an interrupt signal (Press CTRL + C) or using the `docker-compose down` command.
5. Build any books from within the container:
    1. In order to interact with OpenDSA, you must access a shell in the running container with `docker-compose exec opendsa bash` in another console in the root of the OpenDSA directory.
        - Note: If you are on Windows using the MINGW64 shell, you might need to use the command: `winpty docker-compose exec opendsa bash`
    2. To make the book defined in `config/Test.json`, now use the command `make Test`
6. See your created book at: https://opendsa.localhost.devcom.vt.edu/Books/
7. In order to stop the container, you can use the CTRL + C (sending an interrupt signal).


### Toolchain Installation

For more information on OpenDSA's toolchain: [See our documentation here](http://opendsa.readthedocs.io/en/latest/GettingStarted.html#setting-up-a-local-development-environment)

OpenDSA makes use of the JSAV data structures visualization
library. Nearly all developers and users can make do with the version
of JSAV distributed with OpenDSA. If you really need the most
up-to-date version of JSAV, you can find it at
https://github.com/vkaravir/JSAV

The source files for the OpenDSA documentation can be found in the
"Doc" directory.
Changes to the documentation source, once pushed back to the
repository, will automatically revise the public version at
readthedocs.io.
You can also re-compile the documentation by going to the "Doc"
directory and typing "make".
The result will then be in "Doc/manual".


## Common Errors

The Docker containers used by OpenDSA may have a different set of command-line tools than your host operating system. Ensure that you run the commands in the correct environment.  For example, the `make` commands are only meant to be run within a running container.

If you are on Windows, you may run into issues with line endings.  If you do, simply open Git Bash and run `$ dos2unix filename` to fix them.  This will most likely happen on a script file.

If you are on Windows, you may run into issues with any `docker exec` commands (such as `make ssh`).  To solve them, you may have to start any such command with `winpty`.

If any of the python packages (or any of the ruby gems) have been upgraded since the last time the container has been run, you will need to run `docker-compose build` before you `docker-compose up`.

If you are using the provided Docker containers and they are out of date:
1. Remove the currently running containers and images with `docker-compose down`
2. Pull the updated version of the images with `docker-compose pull`
3. Start up the server as you normally do with `docker-compose up`


## Directory Structure

The major components in the directory structure are as follows:

AV: Source code for various algorithm visualizations and associated exercises.
Subdirectories divide the content by topical areas.

Books: Created by the build process, this contains compiled versions of
"textbooks".

config: This holds configuration files for specific books (whose output will go
to the "Books" directory).

Doc: Documentation.
Currently includes a template for Khan Academy multiple
choice questions, and documentation for using the various Sphinx
directives that we have created.

Exercises: Our Khan Academy Infrastructure-based exercises. Subdirectories
divide the content by topic.

JSAV: The JavaScript Algorithm Visualization library. JSAV is sourced
from https://github.com/vkaravir/JSAV and is updated occasionally.
More information about JSAV can be found here:
http://jsav.io/

lib: System-wide library files

Makefile: Primarily for source file validation and to generate some of the
"textbooks" to the Books directory.

MIT-license.txt: The license file. OpenDSA is distributed under an MIT open
source license.

ODSAkhan-exercises: Obsolete, will be removed soon. We used to keep
our own hacked-up copy of the Khan Academy exercise framework.

QBank: A question bank system under development. This is a submodule maintained
at: https://github.com/cashaffer/QBank.

README.md: This file

RST: Contains our custom Sphinx directives used during the build process and the
source for tutorial content written in reStructuredText (RST) format and divided
by language and sub-divided by topic area.

SourceCode: The sourcecode for code snippets contained in the tutorials.
Ultimately, we hope to support code snippets in Processing (a Java dialect),
Python, and JavaScript. In this way, instructors would be able to generate
versions of tutorials that support any or all of these three languages.

**Storyboard: Materials related to "storyboarding" designs for tutorials. This
concept never gained much traction, and this might be removed at some point.**

WebServer: A command for invoking a simple python-based web server that will
enable you to run the Khan Academy exercises if your machine is not running a
true web server. You only need to have python installed for this to work.

khan-exercises: The Khan Academy exercise framework.  This is a submodule maintained
at: https://github.com/OpenDSA/khan-exercises. This is a mirror of the
actual khan-exercises repository
(https://github.com/Khan/khan-exercises), that we buffer here for
stability.
