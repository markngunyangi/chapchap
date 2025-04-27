<template>
    <div class="py-10 bg-gray-50 min-h-screen">
      <Navbar :wishlist="wishlist" />
  
      <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 class="text-2xl font-bold mb-6 text-gray-800">Checkout</h1>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Product Summary -->
          <div v-for="(product, index) in products" :key="product.id">
            <img
              :src="getProductImageUrl(product)"
              alt="Product Image"
              class="w-full h-60 object-contain rounded-lg border"
            />
            <h2 class="text-xl font-semibold mt-4">{{ product.name }}</h2>
            <p class="text-sm text-gray-600 mt-1">{{ product.description }}</p>
            <div class="mt-4">
              <p class="text-gray-500 line-through text-sm">
                Ksh {{ product.gross_price.toFixed(2) }}
              </p>
              <p class="text-orange-600 font-bold text-lg">
                Ksh {{ product.net_price.toFixed(2) }}
              </p>
              <p class="text-green-600 text-sm">You save {{ product.discount }}%</p>
            </div>
          </div>
  
          <!-- Checkout Form -->
          <form @submit.prevent="submitOrder" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Full Name</label>
              <input v-model="form.name" type="text" required class="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="form.email" type="email" required class="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input v-model="form.phone" type="tel" required class="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Shipping Address</label>
              <textarea v-model="form.address" required class="w-full mt-1 p-2 border rounded"></textarea>
            </div>
  
            <button
              type="submit"
              class="w-full bg-orange-600 text-white font-semibold py-2 px-4 rounded hover:bg-orange-700 transition"
            >
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import Navbar from '../navbar/Navbar.vue';
  import type { Product } from '../homeview/HomeViewTypes';
  import useProductService from '../products/productsService';
  
  const wishlist = ref<any[]>([]);
  const route = useRoute();
  const router = useRouter();
  
  const products = ref<Product[]>([]); // Declare the array for multiple products
  const { fetchProductforSpecificStore } = useProductService();
  const { mutate: fetchProductMutate } = fetchProductforSpecificStore();
  
  // Fetch products on component mount
  onMounted(() => {
    // Get productIds from query params (e.g., ?productIds=3,8)
    const productIds = route.query.productIds ? (route.query.productIds as string).split(',') : [];
  
    // Fetch products for each productId
    productIds.forEach(productId => {
      fetchProductMutate(productId, {
        onSuccess: (data) => {
          if (data && data.length > 0) {
            const product = data[0];
            const imageUrl = getProductImageUrl(product); // Call the helper function to get the image URL
  
            // Add fetched product data to products array
            products.value.push({
              ...product,
              imageUrl, // Add image URL dynamically
            });
          }
        },
        onError: (err) => {
          console.error('Error fetching product for checkout:', err);
        }
      });
    });
  });
  
  // Helper function to get image URL
  function getProductImageUrl(product: Product): string {
    // Check if images exists and is an array
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return 'https://chapchap.marshsoft.org' + product.images[0].url;
    } else {
      return 'https://chapchap.marshsoft.org/uploads/default-product.jpeg'; // Default image
    }
  }
  
  // Form data
  const form = ref({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  // Submit order
  function submitOrder() {
    console.log('Order submitted:', {
      products: products.value,
      ...form.value
    });
    alert('Your order has been submitted!');
    router.push({ name: 'home' }); // Redirect to homepage or order summary
  }
  </script>
  