import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.js'; 

const testDatabaseUri = process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/user-crud-test';

beforeAll(async () => {
  await mongoose.connect(testDatabaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('User CRUD API', () => {
  let userId;
  let authToken;

  beforeEach(async () => {
    // Clear users collection before each test
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password: 'password123',
        role: 'user'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    userId = res.body.user._id;
  });

  it('should return all users', async () => {
    await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '9876543210',
      password: 'password123',
      role: 'user'
    });

    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return a user by ID', async () => {
    const user = await User.create({
      name: 'Sam Smith',
      email: 'sam@example.com',
      phone: '5551234567',
      password: 'password123',
      role: 'user'
    });

    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Sam Smith');
  });

  it('should update a user by ID', async () => {
    const user = await User.create({
      name: 'Chris Evans',
      email: 'chris@example.com',
      phone: '1112223333',
      password: 'password123',
      role: 'user'
    });

    const loginRes = await request(app).post('/api/login').send({
      email: 'chris@example.com',
      password: 'password123'
    });
    authToken = loginRes.body.token;

    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Chris Updated' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated');
    expect(res.body.user).toHaveProperty('name', 'Chris Updated');
  });

  it('should delete a user by ID', async () => {
    const user = await User.create({
      name: 'Tony Stark',
      email: 'tony@example.com',
      phone: '4445556666',
      password: 'password123',
      role: 'user'
    });

    const loginRes = await request(app).post('/api/login').send({
      email: 'tony@example.com',
      password: 'password123'
    });
    authToken = loginRes.body.token;

    const res = await request(app)
      .delete(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted');
  });

  it('should handle user not found when updating', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .put(`/api/users/${fakeId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Nonexistent' });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  it('should handle user not found when deleting', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .delete(`/api/users/${fakeId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });
});
