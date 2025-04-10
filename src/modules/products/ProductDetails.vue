<template>
  <div class="py-8 min-h-screen">
    <Navbar />
    <Banner />

    <div class="max-w-6xl mx-auto bg-white p-6  mt-8">
      <div class="flex flex-col md:flex-row gap-10">
        <!-- Product Image -->
        <div class="w-full md:w-1/3">
          <img
            :src="imageUrl"
            alt="Product Image"
            class="rounded-xl w-full h-80 object-cover shadow-md"
          />
        </div>
        <!-- Product Info -->
        <div class="flex-1 space-y-4">
          <h1 class="text-3xl font-bold text-gray-900">{{ ProductDetails[0]?.name }}</h1>
          <p class="text-lg text-gray-700">{{ ProductDetails[0]?.description || 'No description provided.' }}</p>

          <!-- Price Info -->
          <div>
            <p class="text-xl text-gray-800">Gross Price: <span class="line-through">Ksh {{ ProductDetails[0]?.gross_price?.toFixed(2) }}</span></p>
            <p class="text-xl text-orange-600 font-semibold">Net Price: Ksh {{ ProductDetails[0]?.net_price?.toFixed(2) }}</p>
            <p class="text-sm text-green-600">Discount: {{ ProductDetails[0]?.discount }}%</p>
          </div>

          <!-- Attributes -->
          <div v-if="ProductDetails[0]?.attributes">
            <h3 class="font-semibold text-gray-700">Attributes</h3>
            <ul class="text-gray-600">
              <li>Size: {{ ProductDetails[0]?.attributes?.size }}</li>
              <li>Color: {{ ProductDetails[0]?.attributes?.color }}</li>
            </ul>
          </div>

          <!-- Quantity -->
          <div>
            <p class="text-sm text-gray-600">Available Quantity: {{ ProductDetails[0]?.quantity }}</p>
          </div>

          <!-- Category Info -->
          <div>
            <p class="text-sm text-gray-500">Category: {{ ProductDetails[0]?.product_categories?.name }}</p>
            <p class="text-sm text-gray-500">Sub-category: {{ ProductDetails[0]?.product_sub_categories?.name }}</p>
          </div>

          <!-- Store Info -->
          <div class="border-t pt-4 mt-4">
            <div class="flex items-center gap-4">
              <img
                :src="'https://chapchap.marshsoft.org' + ProductDetails[0]?.stores?.logoUrl"
                alt="Store Logo"
                class="w-14 h-14 object-cover rounded-full border"
              />
              <div>
                <p class="font-semibold text-gray-800">{{ ProductDetails[0]?.stores?.name }}</p>
                <p class="text-sm text-gray-600">📞 {{ ProductDetails[0]?.stores?.telephone }}</p>
                <p class="text-sm text-gray-600">📧 {{ ProductDetails[0]?.stores?.email }}</p>
                <p class="text-sm text-gray-600">📍 {{ ProductDetails[0]?.stores?.address }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-6">
            <button
              class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-xl transition"
              @click="checkout"
            >
              Proceed to Checkout
            </button>
            <button
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl transition"
              @click="goBack"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProductService from './productsService';
import Navbar from '../navbar/Navbar.vue';
import Banner from '../banner/Banner.vue';
import CategoryTabs from '../categorytabs/CategoryTabs.vue';
import CategorySelector from '../categoryselector/CategorySelector.vue';
import type { Product } from '../homeview/HomeViewTypes';

// Define `product` as a ref of type Product | null
const product = ref<Product[]>([]);
const route = useRoute();
const router = useRouter();

const { fetchProductforSpecificStore } = useProductService();
const { mutate: fetchProductMutate } = fetchProductforSpecificStore();

onMounted(() => {
  const productId = route.params.id as string;

  fetchProductMutate(productId, {
    onSuccess: (data) => {
      // If data is undefined or invalid, set product to null
      if (data) {
        product.value = data; // Assign the product data
      } else {
        product.value = null; // If no data, set to null
      }
      console.log('Fetched product 1:', product.value);
    },
    onError: (error) => {
      console.error('Failed to fetch product:', error);
      product.value = null; // In case of error, set product to null
    }
  });
});

const ProductDetails = computed(() => {
    return product.value.filter(product => product.id !== null);
  });

// Computed image URL for the product
const imageUrl = computed(() => {
  const base = 'https://chapchap.marshsoft.org';
  const img = ProductDetails.value[0]?.images?.[0]?.url;
  return img ? base + img : base + '/uploads/shirt.jpeg';
});
function checkout() {
  if (product.value) {
    router.push({ name: 'checkout', params: { productId: product.value.id } });
  }
}

function goBack() {
  router.push({ name: 'home' });
}


</script>
