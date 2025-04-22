<template>
    <div>
      <div class="p-6">
        <h2 class="text-2xl font-semibold mb-6 mt-6 text-gray-800 text-center">
          {{ isLogin ? "Login to Shop" : "Create an Account" }}
        </h2>
  
        <!-- Sign Up only fields -->
        <div v-if="!isLogin">
          <input
            type="text"
            v-model="name"
            placeholder="Full Name"
            class="w-full p-2 mb-2 border rounded-lg"
          />
          <input
            type="text"
            v-model="telephone"
            placeholder="Phone Number"
            class="w-full p-2 mb-2 border rounded-lg"
          />
          <select v-model="roleId" class="w-full p-2 mb-2 border rounded-lg">
            <option disabled value="">Select Role</option>
            <option :value="1">Admin</option>
            <option :value="2">Vendor</option>
            <option :value="3">Customer</option>
          </select>
        </div>
  
        <!-- Common fields -->
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="w-full p-2 mb-2 border rounded-lg"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full p-2 mb-4 border rounded-lg"
        />
  
        <button
          class="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-200"
          @click="submitForm"
          :disabled="isRegistering"
        >
          {{ isLogin ? "Login Now" : isRegistering ? "Signing Up..." : "Sign Up Now" }}
        </button>
  
        <p class="mt-4 text-sm">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <span class="text-blue-500 cursor-pointer" @click="isLogin = !isLogin">
            {{ isLogin ? "Sign Up" : "Login" }}
          </span>
        </p>
  
        <button @click="closeSidebar" class="mt-4 text-red-500">Close</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import useAuthService from './AuthService';
  import type { AuthPayload, AuthResponse } from './AuthTypes';
  
  const props = defineProps<{
    isSidebarOpen: boolean;
    activeSidebar: 'auth' | 'wishlist' | 'cart' | null;
    closeSidebar: () => void;
  }>();
  
  const isLogin = ref(true);
  
  // Common fields
  const email = ref('');
  const password = ref('');
  
  // Sign-up only fields
  const name = ref('');
  const telephone = ref('');
  const roleId = ref<number | ''>('');
  
  // Auth API hook
  const { useRegisterUser,useLoginUser } = useAuthService();
  const {
    mutate: registerUserMutate,
    isPending: isRegistering,
    isSuccess: registerSuccess,
    data: registeredUser
  } = useRegisterUser();
  
  const {
  mutate: loginUserMutate,
  isPending: isLoggingIn
} = useLoginUser();

  const userInfo = ref<AuthResponse | null>(null);
  
  // Form submission logic
  function submitForm() {
  if (isLogin.value) {
    const loginPayload = {
      email: email.value,
      password: password.value,
    };

    loginUserMutate(loginPayload, {
      onSuccess: (data: AuthResponse) => {
        userInfo.value = data;
        console.log('Logged in:', data);
        // Redirect or store token
      }
    });
  } else {
    const signupPayload: AuthPayload = {
      name: name.value,
      email: email.value,
      password: password.value,
      telephone: telephone.value,
      role_id: roleId.value as number,
    };

    registerUserMutate(signupPayload, {
      onSuccess: (data: AuthResponse) => {
        userInfo.value = data;
        console.log('Registered successfully:', data);

        if (data.user.role_id === 1 || data.user.role_id === 2) {
          window.open('https://chapchapadmin.vercel.app/merchant/auth/login', '_blank');
        }
      }
    });
  }
}
  </script>
  