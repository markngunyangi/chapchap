<template>
  <nav class="bg-orange-500 px-4 py-1 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-lg">
    <router-link to="/">
      <img src="@/assets/logo.png" alt="Chap Chap E-Mall" class="h-20 w-full cursor-pointer" />
    </router-link>
    
    <input type="text" placeholder="Search Products" class="p-2 text-sm rounded-xl w-1/3" />
    <div class="flex gap-4 text-white">
      <button @click="openModal('auth')">Sign up/Login</button>
      <button @click="openSidebar('wishlist')">Wish List</button>
      <button @click="openSidebar('cart')">My Cart</button>
    </div>
  </nav>

  <!-- Auth Modal (Centered) -->
  <div v-if="isModalOpen && activeModal === 'auth'" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-bold mb-4">{{ isLogin ? "Login" : "Sign Up" }}</h2>
      <input type="email" v-model="email" placeholder="Email" class="w-full p-2 mb-2 border rounded-lg" />
      <input type="password" v-model="password" placeholder="Password" class="w-full p-2 mb-4 border rounded-lg" />
      <button class="w-full bg-orange-500 text-white p-2 rounded-lg">
        {{ isLogin ? "Login" : "Sign Up" }}
      </button>
      <p class="mt-4 text-sm">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <span class="text-blue-500 cursor-pointer" @click="isLogin = !isLogin">
          {{ isLogin ? "Sign Up" : "Login" }}
        </span>
      </p>
      <button @click="isModalOpen = false" class="mt-4 text-red-500">Close</button>
    </div>
  </div>

  <!-- Wishlist & Cart Sidebar -->
  <div class="relative mt-16">
    <div 
      v-if="isSidebarOpen" 
      class="fixed top-16 right-0 h-[85vh] w-1/4 bg-white shadow-lg rounded-l-2xl overflow-y-auto transition-transform duration-300 transform z-40"
      :class="sidebarActive === 'wishlist' || sidebarActive === 'cart' ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="p-6">
        <h2 class="text-xl font-bold mb-4 flex justify-between">
          {{ sidebarActive === 'wishlist' ? 'Your Wishlist' : 'Shopping Cart' }}
          <button @click="isSidebarOpen = false" class="text-gray-500 hover:text-red-500 text-lg">&times;</button>
        </h2>

        <!-- Wishlist Content -->
        <div v-if="sidebarActive === 'wishlist'">
          <ul v-if="wishlist.length">
            <li v-for="item in wishlist" :key="item.id" class="flex items-center gap-4 border-b py-3">
              <img :src="item.image" class="w-14 h-14 rounded-lg shadow-md" />
              <div class="flex-1">
                <p class="font-semibold">{{ item.name }}</p>
                <button class="text-blue-500 text-sm">Move to Cart</button>
              </div>
              <button class="text-red-500 hover:text-red-700 text-xl">&times;</button>
            </li>
          </ul>
          <p v-else class="text-gray-500 text-center py-4">Your wishlist is empty.</p>
        </div>

        <!-- Cart Content -->
        <div v-if="sidebarActive === 'cart'">
          <ul v-if="cart.length">
            <li v-for="item in cart" :key="item.id" class="flex items-center gap-4 border-b py-3">
              <img :src="item.image" class="w-14 h-14 rounded-lg shadow-md" />
              <div class="flex-1">
                <p class="font-semibold">{{ item.name }}</p>
                <p class="text-gray-600 text-sm">${{ item.price }}</p>
              </div>
              <button class="text-red-500 hover:text-red-700 text-xl">&times;</button>
            </li>
          </ul>
          <p v-else class="text-gray-500 text-center py-4">Your cart is empty.</p>

          <div v-if="cart.length" class="mt-4">
            <p class="text-lg font-semibold">Total: ${{ cartTotal }}</p>
            <button class="bg-orange-500 text-white w-full py-2 rounded-lg mt-2">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const isModalOpen = ref(false);
const isSidebarOpen = ref(false);
const activeModal = ref<"auth" | null>(null);
const sidebarActive = ref<"wishlist" | "cart" | null>(null);
const isLogin = ref(true);
const email = ref("");
const password = ref("");

const wishlist = ref([
  { id: 1, name: "Smartwatch", image: "https://via.placeholder.com/50" },
  { id: 2, name: "Wireless Earbuds", image: "https://via.placeholder.com/50" }
]);

const cart = ref([
  { id: 1, name: "Laptop", price: 1200, image: "https://via.placeholder.com/50" },
  { id: 2, name: "Headphones", price: 150, image: "https://via.placeholder.com/50" }
]);

const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0));

const openModal = (modalType: "auth") => {
  activeModal.value = modalType;
  isModalOpen.value = true;
};

const openSidebar = (type: "wishlist" | "cart") => {
  sidebarActive.value = type;
  isSidebarOpen.value = true;
};
</script>

<style scoped>
/* Sidebar animations */
.transform {
  transform: translateX(100%);
}
.translate-x-0 {
  transform: translateX(0);
}
</style>
