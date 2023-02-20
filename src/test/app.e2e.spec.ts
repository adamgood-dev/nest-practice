import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
  })


  let new_user_id = 0;

  it('/users (POST)', async () => {
    const new_user = await request(app.getHttpServer())
      .post("/users")
      .send({'username': 'new_user', 'email': 'newemail@email.com'});
    expect(new_user.body).toHaveProperty("id");
    expect(new_user.body.username).toBe("new_user");
    expect(new_user.body.email).toBe("newemail@email.com");
    new_user_id = parseInt(new_user.body.id);
    expect(new_user_id).not.toBe(0);
  })

  it('/(user_id) (GET)', async () => {
    expect(new_user_id).not.toBe(0);
    const req_user = await request(app.getHttpServer())
      .get(`/users/${new_user_id}`)
      .expect(200);
    expect(req_user.body).toHaveProperty("username");
    expect(req_user.body.username).toBe("new_user");
  })

  it('/user_id (PATCH)', async () => {
    expect(new_user_id).not.toBe(0);
    const updated_user = await request(app.getHttpServer())
      .patch(`/users/${new_user_id}`)
      .send({'username': 'updated_user', 'email': 'updatedemail@email.com'});
    expect(updated_user.body).toHaveProperty("username");
    expect(updated_user.body.username).toBe("updated_user");
    expect(updated_user.body.email).toBe("updatedemail@email.com");
  })

  it('/(user_id) (GET)', async () => {
    expect(new_user_id).not.toBe(0);
    const req_user = await request(app.getHttpServer())
      .get(`/users/${new_user_id}`)
      .expect(200);
    expect(req_user.body).toHaveProperty("username");
    expect(req_user.body.username).toBe("updated_user");
  })

  it('/(user_id) (DELETE)', async () => {
    expect(new_user_id).not.toBe(0);
    const del_user = await request(app.getHttpServer())
      .delete(`/users/${new_user_id}`)
      .expect(200);
    expect(del_user.body).toHaveProperty("username");
    expect(del_user.body.username).toBe("updated_user");
    const find_del_user = await request(app.getHttpServer())
      .get(`/users/${new_user_id}`)
      .expect(404);
    expect(find_del_user.body.error).toBe("Not Found")
  })
});




