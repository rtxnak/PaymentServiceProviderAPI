import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { authRegisterDtoMock } from '../src/testing/auth-register-dto.mock';
import { Role } from '../src/enums/role.enum';
import { NewTransactionDTOMock } from '../src/testing/new-transaction-dto.mock';
import { transactionEntityListMock } from '../src/testing/transaction-entity-list.mock';
import { payableEntityListMock } from '../src/testing/payable-entity-list.mock';
import { PaymentMethod } from '../src/enums/paymentMethod.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let adminAccessToken: string;
  let userAccessToken: string;
  let companyAccessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('SUCCESS on register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...authRegisterDtoMock, role: Role.Admin });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
  });

  it('FAILURE to register a new user with existing email', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...authRegisterDtoMock, role: Role.Admin });

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Email já existente');
    expect(response.body.error).toEqual('Bad Request');
  });

  it('SUCCESS on register a new company', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'company',
        email: 'company@email.com',
        password: '123456@aA',
        role: Role.Company,
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    companyAccessToken = response.body.accessToken;
  });

  it('SUCCESS on Login of a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterDtoMock.email,
        password: authRegisterDtoMock.password,
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    userAccessToken = response.body.accessToken;
  });

  it('SUCCESS on Login of a admin', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@email.com',
        password: '123456a!A',
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    adminAccessToken = response.body.accessToken;
  });

  it('SUCCESS to registered a user and company correct roles', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${adminAccessToken}`);

    const admin = response.body[0];
    const user = response.body[1];
    const company = response.body[2];

    expect(response.statusCode).toEqual(200);
    expect(admin.role).toEqual(Role.Admin);
    expect(user.role).toEqual(Role.User);
    expect(company.role).toEqual(Role.Company);
  });

  it('SUCCESS to create a transaction', async () => {
    const response = await request(app.getHttpServer())
      .post('/transaction')
      .set('Authorization', `Bearer ${userAccessToken}`)
      .send(NewTransactionDTOMock);

    const resultBody = response.body;

    expect(response.statusCode).toEqual(201);
    expect(resultBody.amount).toEqual(transactionEntityListMock[0].amount);
    expect(resultBody.description).toEqual(
      transactionEntityListMock[0].description,
    );
    expect(resultBody.cardNumber).toEqual(
      transactionEntityListMock[0].cardNumber,
    );
    expect(resultBody.cardOwnerName).toEqual(
      transactionEntityListMock[0].cardOwnerName,
    );
    expect(resultBody.cardExpirationDate).toEqual(
      transactionEntityListMock[0].cardExpirationDate,
    );
    expect(resultBody.cardVerificationCode).toEqual(
      transactionEntityListMock[0].cardVerificationCode,
    );
    expect(resultBody.customerId).toEqual(2);
    expect(resultBody.companyId).toEqual(
      transactionEntityListMock[0].companyId,
    );
    expect(resultBody.paymentMethod).toEqual(
      transactionEntityListMock[0].paymentMethod,
    );
    expect(typeof resultBody.createdAt).toEqual('string');
  });

  it('SUCCESS to get transactions by customer', async () => {
    await request(app.getHttpServer())
      .post('/transaction')
      .set('Authorization', `Bearer ${userAccessToken}`)
      .send(NewTransactionDTOMock);
    await request(app.getHttpServer())
      .post('/transaction')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({
        ...NewTransactionDTOMock,
        paymentMethod: PaymentMethod.debitCard,
      });

    const response = await request(app.getHttpServer())
      .get('/transaction/customer')
      .set('Authorization', `Bearer ${userAccessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it('SUCCESS to get transactions by company', async () => {
    const response = await request(app.getHttpServer())
      .get('/transaction/company')
      .set('Authorization', `Bearer ${companyAccessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(3);
  });

  it('FAILURE to get transactions by company with logged user', async () => {
    const response = await request(app.getHttpServer())
      .get('/transaction/company')
      .set('Authorization', `Bearer ${userAccessToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body.message).toEqual('Forbidden resource');
  });

  it('SUCCESS to get payable details by company', async () => {
    const response = await request(app.getHttpServer())
      .get('/payable/details')
      .set('Authorization', `Bearer ${companyAccessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(3);
    expect(response.body[0].feeValue).toEqual(
      payableEntityListMock[0].feeValue.toString(),
    );
    expect(response.body[0].status).toEqual('waiting_funds');
    expect(new Date(response.body[0].paymentDate) > new Date()).toBe(true);

    expect(Number(response.body[2].feeValue)).toEqual(
      payableEntityListMock[2].feeValue,
    );
    expect(response.body[2].status).toEqual('paid');
    expect(new Date(response.body[2].paymentDate) <= new Date()).toBe(true);
  });

  it('FAILURE to get payable details by company with logged user', async () => {
    const response = await request(app.getHttpServer())
      .get('/transaction/company')
      .set('Authorization', `Bearer ${userAccessToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body.message).toEqual('Forbidden resource');
  });

  it('SUCCESS to get payable balance by company', async () => {
    const response = await request(app.getHttpServer())
      .get('/payable/balance')
      .set('Authorization', `Bearer ${companyAccessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      balance: { available: 6369.55, waiting_funds: 12476.44 },
    });
  });

  it('FAILURE to get payable balance by companywith logged user', async () => {
    const response = await request(app.getHttpServer())
      .get('/transaction/company')
      .set('Authorization', `Bearer ${userAccessToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body.message).toEqual('Forbidden resource');
  });

  it('SUCCESS to update all information in a user (admin permission)', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/2')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({
        name: 'newName',
        email: 'newemail@email.com',
        password: '654321@aA',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      success: true,
    });
  });

  it('FAILURE to update all information in a user (admin permission) with logged user', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/2')
      .set('Authorization', `Bearer ${userAccessToken}`)
      .send({
        name: 'newName',
        email: 'newemail@email.com',
        password: '654321@aA',
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body.message).toEqual('Forbidden resource');
  });

  it('SUCCESS to update some information in a user (admin permission)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/users/2')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send({
        name: 'Maria',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      success: true,
    });
  });

  it('FAILURE to update some information in a user (admin permission) with logged user', async () => {
    const response = await request(app.getHttpServer())
      .patch('/users/2')
      .set('Authorization', `Bearer ${userAccessToken}`)
      .send({
        name: 'Maria',
      });

    expect(response.statusCode).toEqual(403);
    expect(response.body.message).toEqual('Forbidden resource');
  });

  it('SUCCESS to delete a user (admin permission)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/users/2')
      .set('Authorization', `Bearer ${adminAccessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      success: true,
    });
  });

  it('FAILURE to delete a user (admin permission) with logged user', async () => {
    const response = await request(app.getHttpServer())
      .delete('/users/2')
      .set('Authorization', `Bearer ${userAccessToken}`);

    expect(response.statusCode).toEqual(403);
    expect(response.body.message).toEqual('Forbidden resource');
  });
});
