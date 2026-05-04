process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-session-secret';
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
process.env.GOOGLE_CLIENT_SECRET = 'test-google-client-secret';
process.env.GOOGLE_CALLBACK_URL = 'http://127.0.0.1/auth/google/callback';

jest.mock('../models/User', () => {
  const localUser = {
    id: 'user-1',
    email: 'admin@example.com',
    displayName: 'Admin User',
    comparePassword: jest.fn(async (candidate) => candidate === 'changeme')
  };

  return {
    findOne: jest.fn(async (query) => {
      if (query && query.email === 'admin@example.com') {
        return localUser;
      }

      if (query && query.googleId === 'google-123') {
        return null;
      }

      return null;
    }),
    findById: jest.fn(async () => localUser),
    create: jest.fn(async (data) => ({
      id: 'google-user-1',
      ...data,
      save: jest.fn(async function save() { return this; })
    }))
  };
});

jest.mock('../../../models/Property', () => ({
  find: jest.fn()
}));

const request = require('supertest');
const app = require('../app');

describe('auth flows', () => {
  test('renders the login page with Google sign-in', async () => {
    const response = await request(app).get('/login');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Sign in with Google');
    expect(response.text).toContain('/auth/google');
  });

  test('rejects missing login fields with validation errors', async () => {
    const response = await request(app)
      .post('/login')
      .type('form')
      .send({ email: '', password: '' });

    expect(response.status).toBe(400);
    expect(response.text).toContain('Email is required');
    expect(response.text).toContain('Password is required');
  });

  test('accepts valid local credentials and redirects to the dashboard', async () => {
    const response = await request(app)
      .post('/login')
      .type('form')
      .send({ email: 'admin@example.com', password: 'changeme' });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/dashboard');
  });

  test('redirects unauthenticated users away from the dashboard', async () => {
    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/login');
  });

  test('starts the Google OAuth flow', async () => {
    const response = await request(app).get('/auth/google');

    expect(response.status).toBe(302);
    expect(response.headers.location).toContain('accounts.google.com');
  });
});