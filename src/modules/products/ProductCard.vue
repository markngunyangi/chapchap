<template>
  <div
    class=" rounded-2xl bg-white   flex flex-col items-center text-center"
  >
    <!-- Wishlist Button -->
    <button
      @click.stop="$emit('wishlist')"
      class="absolute top-3 right-3 text-gray-400 hover:text-red-500"
      title="Add to Wishlist"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3.172 5.172a4.004 4.004 0 015.656 0L10 6.343l1.172-1.171a4.004 4.004 0 115.656 5.656L10 17.657l-6.828-6.829a4.004 4.004 0 010-5.656z" />
      </svg>
    </button>

    <!-- Product Image -->
    <img
      :src="image"
      alt="Product"
      class="w-full h-40 object-contain mb-3 rounded-lg bg-gray-50"
    />

    <!-- Product Info -->
    <p class="font-semibold text-base text-gray-800 truncate w-full">{{ title }}</p>
    <p class="text-orange-500 font-medium text-sm mt-1">{{ price }} Ks</p>

    <!-- View Button -->
    <button
      @click="$emit('view')"
      class="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 rounded-lg"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  image: string;
  title: string;
  price: string;
  buttonText: string;
}>();

defineEmits(['view', 'wishlist']);
</script>
