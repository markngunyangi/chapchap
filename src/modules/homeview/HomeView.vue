<template>
  <div >
    <Navbar />
    <Banner />
    <CategoryTabs />
    <CategorySelector />

    <div class="p-4">
      <!-- Featured Products Section -->
    <!-- Featured Products Section -->
<div class="flex items-start gap-4 mb-8">
  <!-- 1/4: Heading with Image -->
  <div class="w-1/4 flex flex-col items-start gap-2">
    <h2 class="text-xl font-bold">Featured Products</h2>
    <img src="../../assets/best.jpg" alt="" class="w-full  bg-white shadow rounded-xl text-center transition-transform transform " />
  </div>
  

  <!-- 3/4: Products -->
  <div class="w-3/4">
    <div v-if="storeList.length === 0" class="text-center py-6 text-red-500">
      No products available or failed to fetch products.
    </div>
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

<!-- Best Selling Section -->
<div class="flex items-start gap-4">
  <!-- 1/4: Heading with Image -->
  <div class="w-1/4 flex flex-col items-start gap-2">
    <h2 class="text-xl font-bold">Best Selling</h2>
    <img src="../../assets/sales.jpg" alt="" class="w-full  bg-white shadow rounded-xl text-center transition-transform transform " />
  </div>

  <!-- 3/4: Products -->
  <div class="w-3/4">
    <div v-if="storeList.length === 0" class="text-center py-6 text-red-500">
      No products available or failed to fetch products.
    </div>
    <div v-else class="overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div class="flex gap-6">
        <div
          v-for="product in filteredStores.slice(-5)"
          :key="product.id"
          class="w-full p-4 bg-white shadow rounded-xl text-center transition-transform transform hover:scale-105"
        >
          <ProductCard
            :image=image
            :title="product.name"
            :price="product.net_price ? product.net_price.toFixed(2) : 'N/A'"
            buttonText="View Product"
             @view="viewProduct(product)"
          />
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
    <ProductDetails
  v-if="selectedProduct"
  :product="selectedProduct"
  @checkout="handleCheckout"
/>

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
import image from '../../assets/laptop.png'
import ProductDetails from '../products/ProductDetails.vue';

const selectedProduct = ref<Product | null>(null);

function viewProduct(product: Product) {
  selectedProduct.value = product;
}

function handleCheckout(product: Product) {
  // Navigate to a checkout route or trigger a modal, etc.
  alert(`Proceeding to checkout for ${product.name}`);
}

const activeCategory = ref<string>(''); // Initialize with an empty string

const { fetchProducts,fetchFeaturedProducts } = useProductService();
const {
  data: storeData,
  isSuccess: storeDataIsSuccess,
  isPending: storeDataIsPending,
  mutate: fetchProductMutate
} = fetchProducts();

const {
  data: storeFeaturedData,
  isSuccess: storeFeaturedDataIsSuccess,
  isPending: storeFeaturedDataIsPending,
  mutate: fetchFeaturedProductMutate
} = fetchFeaturedProducts();


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
const fetchFeaturedProduct = () => {
  fetchFeaturedProductMutate(undefined, {
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
onMounted(fetchFeaturedProduct);



const filteredStores = computed(() => {
  if (!activeCategory.value) {
    return storeList.value; // Show all if no category is selected
  }
  return storeList.value.filter(
    (product) => product.product_categories?.name === activeCategory.value
  );
});

  </script>