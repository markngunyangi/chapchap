<template>
  <div class="py-8 min-h-screen bg-gray-00">
    <Navbar />
    <Banner />

    <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <div class="flex flex-col md:flex-row gap-10">
        <!-- Product Image -->
        <div class="w-full md:w-1/2 space-y-4">
          <div class="relative overflow-hidden rounded-xl border">
            <img
              :src="imageUrl"
              alt="Product Image"
              class="w-full h-72 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
          <!-- Product thumbnails -->
          <div class="flex gap-2">
            <img
              v-for="(img, index) in ProductDetails[0]?.images || []"
              :key="index"
              :src="'https://chapchap.marshsoft.org' + img.url"
              class="w-16 h-16 object-cover border rounded cursor-pointer hover:ring-2 ring-orange-500"
              @click="selectImage(index)"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex-1 space-y-4">
          <h1 class="text-3xl font-extrabold text-gray-900">{{ ProductDetails[0]?.name }}</h1>

          <!-- Rating + Wishlist -->
          <div class="flex items-center justify-between">
            <div class="flex items-center text-yellow-400 gap-1">
              <span v-for="i in 4" :key="i">★</span><span class="text-gray-400">★</span>
              <span class="text-sm text-gray-500 ml-2">(123 reviews)</span>
            </div>
            <button class="text-orange-600 hover:underline">❤️ Add to Wishlist</button>
          </div>

          <p class="text-lg text-gray-700 leading-relaxed">
            {{ ProductDetails[0]?.description || 'No description provided.' }}
          </p>

          <!-- Price Info -->
          <div class="text-xl space-y-1">
            <p class="text-gray-500 line-through">Ksh {{ ProductDetails[0]?.gross_price?.toFixed(2) }}</p>
            <p class="text-orange-600 font-semibold">Net Price: Ksh {{ ProductDetails[0]?.net_price?.toFixed(2) }}</p>
            <p class="text-green-600 text-sm">You save {{ ProductDetails[0]?.discount }}%</p>
          </div>

          <!-- Attributes -->
          <div v-if="ProductDetails[0]?.attributes" class="text-sm">
            <h3 class="font-semibold text-gray-700 mb-1">Attributes</h3>
            <ul class="flex gap-4">
              <li class="bg-gray-100 px-3 py-1 rounded">Size: {{ ProductDetails[0]?.attributes?.size }}</li>
              <li class="bg-gray-100 px-3 py-1 rounded">Color: {{ ProductDetails[0]?.attributes?.color }}</li>
            </ul>
          </div>

          <!-- Availability -->
          <p class="text-sm text-gray-700">
            <span class="font-medium">In stock:</span> {{ ProductDetails[0]?.quantity }} items
          </p>

          <!-- Category Info -->
          <div class="text-sm text-gray-500">
            <p>Category: {{ ProductDetails[0]?.product_categories?.name }}</p>
            <p>Sub-category: {{ ProductDetails[0]?.product_sub_categories?.name }}</p>
          </div>

          <!-- Delivery Info -->
          <div class="bg-gray-50 border text-sm rounded p-3 mt-4">
            🚚 <strong>Free delivery</strong> within 3-5 business days. <br />
            🔄 Easy returns within 7 days.
          </div>

          <!-- Store Info -->
          <div class="border-t pt-4 mt-4 flex gap-4 items-center">
            <img
              :src="'https://chapchap.marshsoft.org' + ProductDetails[0]?.stores?.logoUrl"
              alt="Store Logo"
              class="w-14 h-14 object-cover rounded-full border"
            />
            <div class="text-sm text-gray-700">
              <p class="font-semibold">{{ ProductDetails[0]?.stores?.name }}</p>
              <p>📞 {{ ProductDetails[0]?.stores?.telephone }}</p>
              <p>📧 {{ ProductDetails[0]?.stores?.email }}</p>
              <p>📍 {{ ProductDetails[0]?.stores?.address }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4 pt-6">
            <button
              class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-xl transition"
              @click="checkout"
            >
              🛒 Proceed to Checkout
            </button>
            <button
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl transition"
              @click="goBack"
            >
              ← Back to Products
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

  const selectedImageIndex = ref(0);

function selectImage(index: number) {
  selectedImageIndex.value = index;
}

const imageUrl = computed(() => {
  const base = 'https://chapchap.marshsoft.org';
  const img = ProductDetails.value[0]?.images?.[selectedImageIndex.value]?.url;
  return img ? base + img : base + '/uploads/shirt.jpeg';
});

function checkout() {
  if (product.value) {
    router.push({ name: 'checkout', params: { productId: product.value.id } });
  }
}

function goBack() {
  router.back();
}


</script>
