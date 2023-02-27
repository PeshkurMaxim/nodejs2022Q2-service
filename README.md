# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Switch branch

```
git checkout dev-docker-orm
```

## Installing NPM modules

```
npm install
```

## Copy .env file

```
cp .env.example .env
```

## Running application

```
npm start
```

or in docker 

```
docker compose up --build
```

This will run 2 docker containers on ports from `.env` (Postgres database, NestJS application).

All migrations will be executed.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Scan images for vulnerabilities

```
npm run docker:scan
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization:

```
npm run test
```

in docker

```
docker compose exec node npm run test
```

To run only one of all test suites:

```
npm run test -- <path to suite>
```

in docker

```
docker compose exec node npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

in docker

```
docker compose exec node npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

in docker

```
docker compose exec node npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
