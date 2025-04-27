<template>
    <div>
      <ul v-if="wishlist.length">
        <li
          v-for="item in wishlist"
          :key="item.id"
          class="flex items-center gap-4 border-b py-3"
        >
          <img
            :src="'https://chapchap.marshsoft.org' + item.images[0].url"
            class="w-14 h-14 rounded-lg shadow-md"
          />
          <div class="flex-1">
            <p class="font-semibold">{{ item.name }}</p>
            <button class="text-blue-500 text-sm" @click="moveToCart(item)">
              Move to Cart
            </button>
          </div>
          <!-- REMOVE BUTTON -->
          <button
            class="text-red-500 hover:text-red-700 text-xl"
            @click="removeFromWishlist(item.id)"
          >
            &times;
          </button>
        </li>
      </ul>
      <p v-else class="text-gray-500 text-center py-4">Your wishlist is empty</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useWishlistStore } from './WishlistStore';
  import { useCartStore } from '../cart/CartStore';
  import { Product } from '../products/productsTypes'; 
  
  const wishlistStore = useWishlistStore(); // Access the wishlist store
  const cartStore = useCartStore(); // Access the cart store
  
  const wishlist = wishlistStore.wishlist; // Access wishlist from the store
  
  const emit = defineEmits<{
    (e: 'remove', id: number): void;
  }>();
  
  function removeFromWishlist(id: number) {
    wishlistStore.removeFromWishlist(id); // Remove item from wishlist
    emit('remove', id); // Emit the remove event
  }
  
  // Move item from wishlist to cart
  function moveToCart(product: Product) {
    // Add the product to the cart
    cartStore.addToCart(product);
  
    // Remove the product from the wishlist
    wishlistStore.removeFromWishlist(product.id);
  }
  </script>
  