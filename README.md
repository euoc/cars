# Cars management

## Description

Cars management with user authentication and authorization with JWT

## Design approach

NodeJS: Modules, Controllers, Service, Unit Tests, Repository, Config
Persistence and schema validation: TypeORM, Postgres, Entities, DTOs

## Installation

```bash
$ npm install
```

## Run

docker-compose up --build -d

## Stop and remove

docker-compose down

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Postman

Requests available in postman folder.

Auth: User SignUp and SignIn
Cars: CRUD operations

## How to use the app

Check src/auth/dto/auth-credentials.dto.ts for user creation validation requirements.

Step 1. SignUp
Step 2. SignIn and copy the TOKEN from the response
Step 3. Use any of the Cars CRUD requests applying the Bearer TOKEN.

## Considerations

JWT expires in 1 hour.

Check src/auth/auth.module.ts