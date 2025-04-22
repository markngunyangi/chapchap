// AuthService.ts

import { useMutation } from '@tanstack/vue-query';
import { useNotification } from '@/composables';
import { registerUser, loginUser } from './AuthApi';
import type { AuthPayload, AuthResponse, LoginPayload } from './AuthTypes';

const { error, success } = useNotification();

const useAuthService = () => {
  function useRegisterUser() {
    return useMutation<AuthResponse, Error, AuthPayload>({
      mutationFn: (payload) => registerUser(payload),
      onSuccess: (data) => {
        success('Account created successfully');
        console.log('Registered user:', data);
      },
      onError: (err) => {
        console.error('Registration error:', err);
        error('Failed to register. Please try again.');
      }
    });
  }

  function useLoginUser() {
    return useMutation<AuthResponse, Error, LoginPayload>({
      mutationFn: (payload) => loginUser(payload),
      onSuccess: (data) => {
        success('Logged in successfully');
        console.log('Logged in user:', data);
        // e.g., store token or redirect
      },
      onError: (err) => {
        console.error('Login error:', err);
        error('Login failed. Please check your credentials.');
      }
    });
  }

  return {
    useRegisterUser,
    useLoginUser
  };
};

export default useAuthService;
