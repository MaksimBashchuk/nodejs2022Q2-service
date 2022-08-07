# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

> **NOTE!!** The containerization and migration to Postgres step was skipped during the assignment. The application stores data in memory

## Downloading

```
git clone https://github.com/MaksimBashchuk/nodejs2022Q2-service
```

## Checkout `logging` branch with

```
git checkout logging
```

## Installing NPM modules

```
npm install
```

## Running application

Rename `.env.example` to `.env`.

```
npm start
```

> **NOTE!** App contains inmemory database with predefined values for testing purposes.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
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
