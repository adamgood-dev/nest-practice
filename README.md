## Description
This is a simple backend CRUD API created to get myself familiar with Typescript, NestJS, Prisma, Postgres, and Docker. This application models a database of users with unique ID#'s, usernames, email addresses, and a signup date. Supports calls through the GET, POST, PATCH, and DELETE routes with some simple input validation and error handling. 

## Usage

- Install dependencies with ```npm install```
- Start the Postgres database with Docker using ```docker-compose up```
- Run database migrations with ```npx prisma migrate dev```
- Start the project with ```npm run start:dev```
- Make API calls through the browser at http://localhost:3000/users/ or through Postman.

## Update

I am also adding some tests to get myself familiar with different testing approaches (E2E, Integration, Unit, etc.) as well as mocking functions and services with Jest. Run the current suite of tests with ```npm test``` or ```npm run test:watch```. I am mainly adding to the test files users.service.spec.ts, users.controller.spec.ts, and app.e2e.spec.ts.
I also made some small fixes to the routing.

## Credits
This was primarily made while referencing the NestJS and Prisma docs, which both cover CRUD applications, as well as this article from Prisma's blog by Tasin Ishmam that helped me figure out how to get Nest, Prisma, and Docker to all work together: https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0
