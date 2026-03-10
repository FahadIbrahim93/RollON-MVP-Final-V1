import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  describe('initial state', () => {
    it('should have null user initially', () => {
      const { user } = useAuthStore.getState();
      expect(user).toBeNull();
    });

    it('should not be authenticated initially', () => {
      const { isAuthenticated } = useAuthStore.getState();
      expect(isAuthenticated).toBe(false);
    });

    it('should not be loading initially', () => {
      const { isLoading } = useAuthStore.getState();
      expect(isLoading).toBe(false);
    });
  });

  describe('login', () => {
    it('should login with valid admin credentials', async () => {
      const { login } = useAuthStore.getState();
      const result = await login('admin@rollon.com', 'admin123');

      expect(result).toBe(true);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user?.role).toBe('admin');
    });

    it('should login with valid user credentials', async () => {
      const { login } = useAuthStore.getState();
      const result = await login('customer@example.com', 'password123');

      expect(result).toBe(true);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user?.role).toBe('user');
    });

    it('should fail login with invalid credentials', async () => {
      const { login } = useAuthStore.getState();
      const result = await login('invalid@example.com', 'wrongpassword');

      expect(result).toBe(false);
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const { register } = useAuthStore.getState();
      const result = await register('New User', 'new@example.com', 'password123');

      expect(result).toBe(true);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user?.name).toBe('New User');
      expect(useAuthStore.getState().user?.role).toBe('user');
    });
  });

  describe('logout', () => {
    it('should logout and clear user data', async () => {
      const { login, logout } = useAuthStore.getState();

      await login('admin@rollon.com', 'admin123');
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      logout();
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().token).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const { login, updateProfile } = useAuthStore.getState();

      await login('admin@rollon.com', 'admin123');
      updateProfile({ name: 'Updated Name' });

      expect(useAuthStore.getState().user?.name).toBe('Updated Name');
    });

    it('should not update when user is null', () => {
      const { updateProfile } = useAuthStore.getState();

      updateProfile({ name: 'Updated Name' });

      expect(useAuthStore.getState().user).toBeNull();
    });
  });
});
