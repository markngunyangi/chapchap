<template>
  <div class="border bg-gray-100 p-4 rounded-md">
    <img :src="image" alt="Product" class="w-full h-32 object-cover" />
    <p class="font-bold">{{ title }}</p>
    <p class="text-gray-600">{{ price }}Ksh</p>
    <button class="bg-black text-white p-2 w-full mt-2 rounded-md">{{ buttonText }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ image: string; title: string; price: string; buttonText: string }>();
</script>
