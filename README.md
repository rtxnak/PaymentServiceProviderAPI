# Payment Service Provider API

## About project
This project was developed to practice REST API creation [skills](#skills) with NestJs. Its a API connected to a relational database, the API's main function is to simulate a dynamic of creation and recording of transactions and payments between users and companies, and as a support function, it creates and manipulates users.

The business rules were based on the challenge in the link: https://github.com/pagarme/vagas/tree/master/desafios/software-engineer-backend

## Skills 
- OOP in Typescript is the base language;
- NestJs framework;
- TypeORM for MYSQL database modeling;
- Unit and E2E tests with JEST
- Swagger to create API documentation;

## Opening the app locally

On terminal:

1. Please install and check the version of the following services on your system:

[NPM & Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
```bash
  npm -v
```
```bash
  node -v
```
[MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html)
```bash
  mysql --version
```

2. Clone the repository in your preferred folder
```bash
  git clone git@github.com:rtxnak/PaymentServiceProviderAPI.git
```
3. Install the dependencies
  * move to app folder:
    ```bash
       cd PaymentServiceProviderAPI/
    ```
  * Install dependencies:
    ```bash
       npm install  
    ```
4. Create enviroment file for database conection:
  * create the file _.env_ and _.test.env_ based on the exemple:
    ```bash
      ENV="development"
      DB_USERNAME="root"
      DB_PASSWORD="root@123"
      DB_DATABASE="pspnestjs"
      DB_HOST="localhost"
      DB_PORT="3306"
      JWT_SECRET="Wfw!aX60yMVp9jH853!3ERMX$M6pCiIJ"
    ```
  * move back to main folder:
    ```bash
       cd ..
    ```
5 Run the application
  * Start the api:
    ```bash
       npm run dev
    ```

6. The API can be accessed through:

    http://localhost:3000/
   

7. The API documentation can be acessed through:

   http://localhost:3000/api
   
8. To run tests:
  * Unit tests:
    ```bash
       npm test
    ```
  * E2E tests:
    ```bash
       npm run test:e2e 
    ```


## Opening the app locally with Docker
 
On terminal:

1. Please install and check the version of the following services on your system:

[Docker](https://docs.docker.com/get-docker/)
```bash
  docker -v
```
[Docker-Compose](https://docs.docker.com/compose/install/)
```bash
  docker-compose -v
```

2. Clone the repository in your preferred folder
```bash
  git clone git@github.com:rtxnak/PaymentServiceProviderAPI.git
```

3. Move to app folder
```bash
  cd PaymentServiceProviderAPI/
```

4. Run the application with docker-compose
```bash
  docker-compose up --build 
```

5. The API can be accessed through:

    http://localhost:3000/
   
6. the API documentation can be acessed through:

   http://localhost:3000/api

7. To run tests:
  * Unit tests:
    ```bash
       npm test
    ```
  * E2E tests:
    ```bash
       npm run test:e2e 
    ```

8. Finishing the application
```bash
  docker-compose down
```
