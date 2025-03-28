<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '../navbar/Navbar.vue';
import ProductCard from '../products/ProductCard.vue';
import useProductService from '../products/productsService';
import type { Product, ProductCategory } from '../products/productsTypes';

const router = useRouter();
const route = useRoute();
const activeCategory = ref<string>(''); // Initialize with an empty string

const { fetchProductforSpecificStore } = useProductService();
const {
  data: storeData,
  isSuccess: storeDataIsSuccess,
  isPending: storeDataIsPending,
  mutate: fetchProductMutate
} = fetchProductforSpecificStore();

// Ensure storeId is a number
const storeId = computed(() => {
  const id = parseInt(route.params.id as string, 10);
  return isNaN(id) ? null : id;
});

const categories = computed(() => {
  if (!storeData.value || !Array.isArray(storeData.value)) return [];
  const uniqueCategories = new Set<string>();

  storeData.value.forEach((product) => {
    if (product.product_categories?.name) {
      uniqueCategories.add(product.product_categories.name);
    }
  });

  return Array.from(uniqueCategories);
});

const storeList = ref<Product[]>([]);

// Fetch products when storeId is available
const fetchProducts = () => {
  if (storeId.value !== null) {
    fetchProductMutate(storeId.value, {
      onSuccess: (data) => {
        console.log('Fetched Store Data:', data);
        storeList.value = data || [];
        // Set initial active category if categories are available
        if (categories.value.length > 0 && activeCategory.value === '') {
          activeCategory.value = categories.value[0];
        }
      },
      onError: (error) => {
        console.error('Error fetching stores:', error);
      }
    });
  }
};

onMounted(fetchProducts);

// Re-fetch if the storeId changes (e.g., user navigates to a different store)
watch(storeId, (newId) => {
  if (newId !== null) {
    fetchProducts();
  }
});

const filteredStores = computed(() => {
  if (!activeCategory.value) {
    return storeList.value; // Show all if no category is selected
  }
  return storeList.value.filter(
    (product) => product.product_categories?.name === activeCategory.value
  );
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <Navbar />
  <div class="p-6">
    <div class="flex items-center mb-6 py-6">
      <button @click="goBack" class="text-orange-500 text-md hover:text-orange-600 flex items-center mr-4">
        ← Back
      </button>
      <h1 class="text-xl font-bold text-center flex-1">List of Products</h1>
    </div>

    <div class="flex gap-4 py-4 px-8 bg-gray-100 text-sm justify-between">
      <button
        v-for="category in categories"
        :key="category"
        @click="activeCategory = category"
        :class="activeCategory === category ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'"
      >
        {{ category }}
      </button>
      <button
        @click="activeCategory = ''"
        :class="activeCategory === '' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'"
      >
        All
      </button>
    </div>

    <div v-if="storeDataIsPending" class="text-center py-6">Loading products...</div>
    <div v-else-if="!storeDataIsSuccess" class="text-center py-6 text-red-500">Failed to load products</div>

    <div v-else class="grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      <div
        v-for="product in filteredStores"
        :key="product.id"
        class="p-4 bg-white shadow rounded-xl text-center transition-transform transform hover:scale-105"
      >
        <ProductCard
          :image="product.images?.[0]?.url || 'https://via.placeholder.com/151'"
          :title="product.name"
          :price="product.net_price ? product.net_price.toFixed(2) : 'N/A'"
          buttonText="View Product"
        />
      </div>
      <div v-if="filteredStores.length === 0 && storeDataIsSuccess" class="text-center py-6 col-span-full text-gray-500">
        No products found in the selected category.
      </div>
    </div>
  </div>
</template>

