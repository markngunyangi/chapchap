<template>
    <div class="py-10 bg-gray-50 min-h-screen">
      <Navbar :wishlist="wishlist" />
  
      <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 class="text-2xl font-bold mb-6 text-gray-800">Checkout</h1>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Product Summary -->
          <div>
            <img
              :src="imageUrl"
              alt="Product Image"
              class="w-full h-60 object-contain rounded-lg border"
            />
            <h2 class="text-xl font-semibold mt-4">{{ product?.name }}</h2>
            <p class="text-sm text-gray-600 mt-1">{{ product?.description }}</p>
            <div class="mt-4">
              <p class="text-gray-500 line-through text-sm">
                Ksh {{ product?.gross_price?.toFixed(2) }}
              </p>
              <p class="text-orange-600 font-bold text-lg">
                Ksh {{ product?.net_price?.toFixed(2) }}
              </p>
              <p class="text-green-600 text-sm">You save {{ product?.discount }}%</p>
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
  
  const product = ref<Product | null>(null);
  const selectedImageIndex = ref(0);
  const { fetchProductforSpecificStore } = useProductService();
  const { mutate: fetchProductMutate } = fetchProductforSpecificStore();
  
  const imageUrl = ref<string>('https://chapchap.marshsoft.org/uploads/shirt.jpeg');
  
  onMounted(() => {
    const productId = route.params.productId as string;
  
    fetchProductMutate(productId, {
      onSuccess: (data) => {
        if (data && data.length > 0) {
          product.value = data[0];
          if (product.value.images?.length) {
            imageUrl.value = 'https://chapchap.marshsoft.org' + product.value.images[0].url;
          }
        }
      },
      onError: (err) => {
        console.error('Error fetching product for checkout:', err);
      }
    });
  });
  
  const form = ref({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  function submitOrder() {
    // Simulate order submission (replace with real backend integration)
    console.log('Order submitted:', {
      product: product.value,
      ...form.value
    });
    alert('Your order has been submitted!');
    router.push({ name: 'home' }); // Redirect to homepage or order summary
  }
  </script>
  