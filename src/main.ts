import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PSP - payment service provider API')
    .setDescription(
      `PSP - payment service provider API is organized around REST. 
      The API's main function is to simulate a dynamic of creation and recording of transactions and payments between users and companies. 
      This API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.`,
    )
    .setVersion('1.0')
    .addTag('auth', 'dedicated endpoint to register and login a account')
    .addTag(
      'transaction',
      `dedicated endpoint to create a new transaction and read all the created transactions by customer or company. 
      --IMPORTANT: its search using the logged account information, so if you want to read customer's transactions, you have to login in a USER account and use the token returned in the "Authorize" field of this document, and if you want to read company transactions you have to login in a COMPANY account`,
    )
    .addTag(
      'payable',
      `dedicated endpoint to read all payable details and balance by company, and a payable is created at the same time that the transaction is properly created.
      --IMPORTANT: To use this route, it is necessary to login with a COMPANY account and use the token returned in the "Authorize" field of this document`,
    )
    .addTag(
      'users',
      `dedicated endpoint for creating, viewing, updating and removing users 
      --IMPORTANT: To use this route, it is necessary to login with an ADMIN account and use the token returned in the "Authorize" field of this document`,
    )
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
