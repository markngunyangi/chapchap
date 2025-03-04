<template>
    <div class="flex space-x-8 justify-center mt-4">
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="flex flex-col items-center justify-center bg-gray-200 w-32 h-32 rounded-lg cursor-pointer hover:bg-gray-300 transition"
      >
        <!-- <img :src="item.icon" :alt="item.label" class="w-8 h-8 mb-2" /> -->
        <span class="text-sm font-semibold text-center mt-7 text-black">{{ item.label }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Item {
    icon: string;
    label: string;
  }
  
  const items = ref<Item[]>([
    { icon: "/icons/store.svg", label: "Stores" },
    { icon: "/icons/restaurant.svg", label: "Restaurants" },
    { icon: "/icons/service.svg", label: "Request for Service" }
  ]);
  </script>
  
  <style scoped>
  /* You can add additional styles if needed */
  </style>
  