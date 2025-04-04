<!-- src/components/products/ProductDetails.vue -->
<template>
    <div class="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <div class="flex gap-6">
        <img :src="product.images?.[0]?.url || placeholder" alt="Product" class="w-48 h-48 rounded" />
        <div class="flex-1">
          <h2 class="text-2xl font-bold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.description || 'No description available.' }}</p>
          <p class="text-xl font-semibold text-sky-600 mb-4">Ksh {{ product.net_price?.toFixed(2) }}</p>
          <button
            class="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-xl transition"
            @click="checkout"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Product } from './productsTypes';
  
  const placeholder = 'https://via.placeholder.com/151';
  
  const props = defineProps<{
    product: Product;
  }>();
  
  const emit = defineEmits(['checkout']);
  
  function checkout() {
    emit('checkout', props.product);
  }
  </script>
  