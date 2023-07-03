import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PlayerController } from '../src/player/player.controller';

describe('PlayerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [PlayerController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/player (POST)', () => {
    return request(app.getHttpServer())
      .post('/player')
      .send({
        login: 'examplePlayer',
        avatarUrl: 'http://example.com/avatar.jpg',
      })
      .expect(201)
      .expect((res) => {
        // Perform assertions on the response if needed
      });
  });

  it('/player (GET)', () => {
    return request(app.getHttpServer())
      .get('/player')
      .expect(200)
      .expect((res) => {
        // Perform assertions on the response if needed
      });
  });

  it('/player/:id (GET)', () => {
    const playerId = '1'; // Provide a valid player id

    return request(app.getHttpServer())
      .get(`/player/${playerId}`)
      .expect(200)
      .expect((res) => {
        // Perform assertions on the response if needed
      });
  });

  it('/player/:id (PATCH)', () => {
    const playerId = '1'; // Provide a valid player id

    return request(app.getHttpServer())
      .patch(`/player/${playerId}`)
      .send({
        // Provide necessary properties for updating a player
      })
      .expect(200)
      .expect((res) => {
        // Perform assertions on the response if needed
      });
  });

  it('/player/:id (DELETE)', () => {
    const playerId = '1'; // Provide a valid player id

    return request(app.getHttpServer())
      .delete(`/player/${playerId}`)
      .expect(200)
      .expect((res) => {
        // Perform assertions on the response if needed
      });
  });
});
