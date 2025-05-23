<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<h2 align="center">Farms API - NestJS</h2>
<p align="center">
  API for managing farmers, farms, and harvests.<br>
  Built with <a href="https://nestjs.com/" target="_blank">NestJS</a> and TypeScript.
</p>

---

## Description

This project is a RESTful API for managing farmers, their farms, and harvests.  
It uses [NestJS](https://nestjs.com/) for the backend and follows best practices for DTO validation, modularity, and scalability.

## Features

- Farmer, Farm, and Harvest management
- DTO validation with class-validator and class-transformer
- Swagger (OpenAPI) documentation
- Modular architecture
- Ready for production deployment

## Project setup

```bash
npm install
```

## Running the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Documentation

After running the project, access the Swagger UI at:

```
http://localhost:3000/api
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Folder Structure

```
src/
  app/
    domain/
      dto/
      service/
      validator/
    exception/
  entrypoint/
    controllers/
  infra/
    database/
      entities
  main.ts
```

## Technologies

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)

## Makefile

This project includes a `Makefile` to simplify common development tasks.  
You can use the following commands:

| Command           | Description                                 |
|-------------------|---------------------------------------------|
| `make install`    | Install all dependencies (`npm install`)     |
| `make start`      | Start the application (`npm run start`)      |
| `make jest`       | Run unit tests (`npm run test`)              |
| `make lint`       | Run linter (`npm run lint`)                  |
| `make lint-fix`   | Fix lint issues (`npm run lint:fix`)         |
| `make build`      | Build the project (`npm run build`)          |
| `make docker-up`  | Start Docker containers                      |
| `make docker-down`| Stop and remove Docker containers/volumes    |
| `make docker-restart` | Rebuild and restart Docker containers    |
| `make docker-log` | Show Docker logs                             |
| `make docker-erase`| Remove containers and image                 |

**Usage example:**

```bash
make install
make start
make jest
make docker-up
```


## License

MIT