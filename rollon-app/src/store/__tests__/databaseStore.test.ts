import { describe, it, expect, beforeEach } from 'vitest';
import { useDatabaseStore } from '../databaseStore';

describe('databaseStore - addUser', () => {
  beforeEach(() => {
    useDatabaseStore.setState({ users: [] });
  });

  it('adds user with hashed password', async () => {
    const store = useDatabaseStore.getState();
    await store.addUser({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      password: 'securepass123'
    });
    
    const users = useDatabaseStore.getState().users;
    expect(users).toHaveLength(1);
    expect(users[0].passwordHash).toBeDefined();
  });

  it('adds multiple users', async () => {
    const store = useDatabaseStore.getState();
    await store.addUser({
      id: '1',
      email: 'user1@example.com',
      name: 'User One',
      role: 'user',
      password: 'pass123'
    });
    await store.addUser({
      id: '2',
      email: 'user2@example.com',
      name: 'User Two',
      role: 'user',
      password: 'pass456'
    });
    
    const users = useDatabaseStore.getState().users;
    expect(users).toHaveLength(2);
  });

  it('does not store plaintext password', async () => {
    const store = useDatabaseStore.getState();
    await store.addUser({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      password: 'mysecretpassword'
    });
    
    const users = useDatabaseStore.getState().users;
    expect(users[0].passwordHash).toBeDefined();
    expect(users[0].passwordHash).not.toBe('mysecretpassword');
  });
});

describe('databaseStore - verifyPassword', () => {
  beforeEach(() => {
    useDatabaseStore.setState({ users: [] });
  });

  it('verifies correct password returns user', async () => {
    const store = useDatabaseStore.getState();
    await store.addUser({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      password: 'securepass123'
    });
    
    const user = await store.verifyPassword('test@example.com', 'securepass123');
    expect(user).toBeDefined();
    expect(user?.email).toBe('test@example.com');
  });

  it('verifies incorrect password returns undefined', async () => {
    const store = useDatabaseStore.getState();
    await store.addUser({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      password: 'securepass123'
    });
    
    const user = await store.verifyPassword('test@example.com', 'wrongpass');
    expect(user).toBeUndefined();
  });

  it('verifies non-existent email returns undefined', async () => {
    const store = useDatabaseStore.getState();
    await store.addUser({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      password: 'securepass123'
    });
    
    const user = await store.verifyPassword('notexist@example.com', 'anypassword');
    expect(user).toBeUndefined();
  });

  it('returns user without passwordHash field', async () => {
    const store = useDatabaseStore.getState();
    await store.addUser({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
      password: 'securepass123'
    });
    
    const user = await store.verifyPassword('test@example.com', 'securepass123');
    expect(user?.passwordHash).toBeUndefined();
  });
});

describe('databaseStore - initializeFromSeed', () => {
  beforeEach(() => {
    useDatabaseStore.setState({ products: [], categories: [], users: [] });
  });

  it('initializes products in DEV mode', () => {
    const store = useDatabaseStore.getState();
    store.initializeFromSeed();
    
    const state = useDatabaseStore.getState();
    expect(state.products.length).toBeGreaterThan(0);
  });

  it('initializes categories', () => {
    const store = useDatabaseStore.getState();
    store.initializeFromSeed();
    
    const state = useDatabaseStore.getState();
    expect(state.categories.length).toBeGreaterThan(0);
  });
});