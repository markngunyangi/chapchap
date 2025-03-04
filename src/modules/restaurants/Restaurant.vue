<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from '../navbar/Navbar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const categories = ref([
  'Fast Food', 'Fine Dining', 'Cafes', 'Seafood', 'Italian', 'Asian Cuisine'
]);
const activeCategory = ref('Fast Food');

const generateRestaurants = (category: string, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${category}-${i + 1}`,
    name: `${category} Restaurant ${i + 1}`,
    category,
    location: `City Center, Restaurant ${i + 1}`,
    image: 'https://via.placeholder.com/150',
    description: `Delicious ${category.toLowerCase()} served fresh.`,
  }));
};

// Generate restaurants for each category
const restaurants = ref(categories.value.flatMap(category => generateRestaurants(category, 5)));

const filteredRestaurants = computed(() => {
  return restaurants.value.filter(restaurant => restaurant.category === activeCategory.value);
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <Navbar />
  
  <div class="p-6 mt-4">
    <div class="flex items-center mb-6 py-6">
      <button @click="goBack" class="text-orange-500 text-md hover:text-orange-600 fgraylex items-center mr-4">
        ← Back
      </button>
      <h1 class="text-xl font-bold text-center flex-1">List of Restaurants</h1>
    </div> 
    
    <div class="flex gap-4 py-4 px-8 bg-gray-100 text-sm justify-between">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="activeCategory = category"
        class=""
        :class="activeCategory === category ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'"
      >
        {{ category }}
      </button>
    </div>

    <div class="grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      <div v-for="restaurant in filteredRestaurants" :key="restaurant.id" 
           class="p-4 bg-white shadow rounded-xl text-center transition-transform transform hover:scale-105">
        <img :src="restaurant.image" alt="Restaurant Image" class="w-32 h-32 mx-auto rounded-full shadow-md mb-3">
        <h2 class="text-lg font-semibold text-gray-900">{{ restaurant.name }}</h2>
        <p class="text-gray-600 text-sm">{{ restaurant.description }}</p>
        <p class="text-sm text-gray-500">{{ restaurant.location }}</p>
        <button class="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition">
          View Restaurant
        </button>
      </div>
    </div>
  </div>
</template>
