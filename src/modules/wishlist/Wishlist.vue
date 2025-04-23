<!-- components/WishlistSidebar.vue -->
<template>
    <div>
      <h2 class="text-xl font-bold mb-4 flex justify-between">
        Your Wishlist
        <button @click="closeSidebar" class="text-gray-500 hover:text-red-500 text-lg">&times;</button>
      </h2>
      <ul v-if="wishlist.length">
        <li
          v-for="item in wishlist"
          :key="item.id"
          class="flex items-center gap-4 border-b py-3"
        >
          <img
            :src="'https://chapchap.marshsoft.org' + item.images[0].url"
            class="w-14 h-14 rounded-lg shadow-md"
          />
          <div class="flex-1">
            <p class="font-semibold">{{ item.name }}</p>
            <button class="text-blue-500 text-sm">Move to Cart</button>
          </div>
          <button class="text-red-500 hover:text-red-700 text-xl">&times;</button>
        </li>
      </ul>
      <p v-else class="text-gray-500 text-center py-4">Your wishlist is empty.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    wishlist: {
      id: number;
      name: string;
      images: { url: string }[];
    }[];
    closeSidebar: () => void;
  }>();
  </script>
  