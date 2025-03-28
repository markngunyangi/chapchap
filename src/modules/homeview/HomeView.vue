<template>
  <div>
    <Navbar />
    <Banner />
    <CategoryTabs />
    <CategorySelector />

    <div class="p-4">
      <!-- Featured Products Section -->
      <div class="">
        <h2 class="text-xl font-bold">Featured Products</h2>
        <div class=" mt-4">
          <div v-if="storeDataIsPending" class="text-center py-6">Loading products...</div>
          <div v-else-if="!storeDataIsSuccess" class="text-center py-6 text-red-500">Failed to load products</div>

          <div v-else class="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div class="flex gap-6">
              <div
                v-for="product in filteredStores.slice(0, 5)"
                :key="product.id"
                class="w-full p-4 bg-white shadow rounded-xl text-center transition-transform transform hover:scale-105"
              >
                <ProductCard
                  :image="product.images?.[0]?.url || 'https://via.placeholder.com/151'"
                  :title="product.name"
                  :price="product.net_price ? product.net_price.toFixed(2) : 'N/A'"
                  buttonText="View Product"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Best Selling Section (Below) -->
      <div>
        <h2 class="text-xl font-bold">Best Selling</h2>
        <div class="relative mt-4">
          <div v-if="storeDataIsPending" class="text-center py-6">Loading products...</div>
          <div v-else-if="!storeDataIsSuccess" class="text-center py-6 text-red-500">Failed to load products</div>

          <div v-else class="overflow-x-auto  scrollbar-hide">
            <div class="flex gap-6">
              <div
                v-for="product in filteredStores.slice(-5)"
                :key="product.id"
                class="w-full p-4 bg-white shadow rounded-xl text-center transition-transform transform hover:scale-105"
              >
                <ProductCard
                  :image="product.images?.[0]?.url || 'https://via.placeholder.com/151'"
                  :title="product.name"
                  :price="product.net_price ? product.net_price.toFixed(2) : 'N/A'"
                  buttonText="View Product"
                />
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>


<script setup lang="ts">
  import Navbar from '../navbar/Navbar.vue';
  import Banner from '../banner/Banner.vue';
  import CategoryTabs from '../categorytabs/CategoryTabs.vue';
  import ProductCard from '../products/ProductCard.vue';
import CategorySelector from '../categoryselector/CategorySelector.vue';
import { computed,ref,onMounted } from 'vue';

import useProductService from './HomeViewService';
import type { Product, ProductCategory } from '../products/productsTypes';


const activeCategory = ref<string>(''); // Initialize with an empty string

const { fetchProducts } = useProductService();
const {
  data: storeData,
  isSuccess: storeDataIsSuccess,
  isPending: storeDataIsPending,
  mutate: fetchProductMutate
} = fetchProducts();




const storeList = ref<Product[]>([]);

// Fetch products when storeId is available
const fetchProduct = () => {
    fetchProductMutate(undefined, {
      onSuccess: (data) => {
        console.log('Fetched Store Data:', data);
        storeList.value = data || [];
        // Set initial active category if categories are available
        
      },
      onError: (error) => {
        console.error('Error fetching stores:', error);
      }
    });
  
};

onMounted(fetchProduct);



const filteredStores = computed(() => {
  if (!activeCategory.value) {
    return storeList.value; // Show all if no category is selected
  }
  return storeList.value.filter(
    (product) => product.product_categories?.name === activeCategory.value
  );
});

  </script>