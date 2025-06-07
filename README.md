# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Docker Images

This project is available as Docker images on Docker Hub:

- Application Image: [agent250691/nodejs2025q2-service-app](https://hub.docker.com/r/agent250691/nodejs2025q2-service-app/tags)
- PostgreSQL Image: [agent250691/nodejs2025q2-service-postgres](https://hub.docker.com/r/agent250691/nodejs2025q2-service-postgres/tags)

### Security Scanning

You can scan the Docker images for vulnerabilities using Docker Scout:

```bash
# Scan the application image
npm run docker:scan:app

# Scan the PostgreSQL image
npm run docker:scan:db
```

These commands use Docker Scout to check for Common Vulnerabilities and Exposures (CVEs) in the images.

## Downloading

```bash
git clone https://github.com/NachinkaShaurmi/nodejs2025Q2-service.git

cd nodejs2025Q2-service

git checkout dev2
```

## Installing NPM modules

```bash
npm install
```

## Create .env file

Copy variables from .env.example to .env file

## Running application

```bash
docker-compose up --build

npm run migration:run
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
