# Nuxtify

This project serves as a quickstart profile for integrating Drupal and Nuxt 3, allowing them to communicate with each other. It provides a foundation for building dynamic and interactive web applications.

## Table of Contents

- [Installation](#installation)
  - [Backend (Drupal)](#backend-drupal)
  - [Frontend (Nuxt)](#frontend-nuxt)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend (Drupal)

To install the Drupal backend for this project, you can use DDEV, a local development environment tool. Follow the steps below:

1. Make sure you have DDEV installed on your system. If not, you can install it by following the instructions in the [DDEV documentation](https://ddev.readthedocs.io/en/stable/#installation).

2. Once DDEV is installed, navigate to the project directory in your terminal:

```
cd nuxtify
```

3. Run the following command to install the Drupal backend:

```
ddev install -y
```

This command will automatically set up the necessary dependencies and configurations for the Drupal backend.

4. After the installation is complete, you can launch the local website with the following command:

```
ddev launch
```

### Frontend (Nuxt)

To set up the frontend (Nuxt) for this project, you will need to have Node.js installed on your system. Make sure to use the version that is in the [.nvmrc](./frontend/.nvmrc) file.

[NVM](https://github.com/nvm-sh/nvm) can be used to manage Node.js versions. Install NVM by following the instructions in the [NVM GitHub repository](https://github.com/nvm-sh/nvm#installation-and-update). Once NVM is installed, you can run `nvm use` in the `frontend` directory to use the correct version automatically.

1. Run the following command to install dependencies:

```bash
make install
```

## Usage

To run the frontend locally, run the following command:

```bash
make watch
```

To check the frontend code for linting errors, run the following command:

```bash
make lint
```

To build the project, run the following command:

```bash
make
```

## License

The project is licensed under the MIT License, which is a permissive open-source license. This means that you are free to use, modify, and distribute the code for both commercial and non-commercial purposes. The license also comes with limited liability and warranty, so use the code at your own risk. For more details, please refer to the [LICENSE](./LICENSE) file.
