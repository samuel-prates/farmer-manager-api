import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testOrmConfig } from './test-ormconfig';
import { FarmerModule } from 'src/app/farmer.module';

describe('FarmerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testOrmConfig),
        FarmerModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let createdFarmerId: number;

  it('POST /farmer - should create a farmer', async () => {
    const response = await request(app.getHttpServer())
      .post('/farmer')
      .send({
        federalIdentification: '12345678901',
        farmerName: 'John Doe',
        farms: [],
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.farmerName).toBe('John Doe');
    createdFarmerId = response.body.id;
  });

  it('GET /farmer - should return all farmers', async () => {
    const response = await request(app.getHttpServer())
      .get('/farmer')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /farmer/:id - should return a farmer by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/farmer/${createdFarmerId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdFarmerId);
  });

  it('PUT /farmer/:id - should update a farmer', async () => {
    const response = await request(app.getHttpServer())
      .put(`/farmer/${createdFarmerId}`)
      .send({
        federalIdentification: '12345678901',
        farmerName: 'Jane Doe',
        farms: [],
      })
      .expect(200);

    expect(response.body.farmerName).toBe('Jane Doe');
  });

  it('DELETE /farmer/:id - should delete a farmer', async () => {
    await request(app.getHttpServer())
      .delete(`/farmer/${createdFarmerId}`)
      .expect(200);
  });
});