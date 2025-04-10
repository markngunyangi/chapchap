<template>
  <div>
    <Navbar :wishlist="wishlist" @toggle-wishlist="openWishlistSidebar" />

    <Banner />
    <CategoryTabs />
    <CategorySelector />

    <div class="p-6 md:p-10 space-y-16 bg-gray-50">

      <!-- Featured Products Section -->
      <div class="flex items-start gap-6">
        <!-- 1/4: Heading with Image -->
        <div class="w-1/4 flex flex-col items-start gap-3">
          <h2 class="text-2xl font-extrabold text-sky-700 flex items-center gap-2">
            🌟 Featured Products
          </h2>
          <div class="w-full bg-white shadow-md rounded-xl overflow-hidden">
            <img
              src="../../assets/shirts.jpg"
              alt="Featured"
              class="w-full object-contain transition-transform hover:scale-105 duration-300"
            />
          </div>
        </div>

        <!-- 3/4: Product Cards -->
        <div class="w-3/4">
          <div v-if="featuredProducts.length === 0" class="text-center py-6 text-red-500">
            No featured products available.
          </div>
          <div v-else class="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div class="flex gap-6">
              <div
                v-for="product in featuredProducts.slice(0, 5)"
                :key="product.id"
                class="relative w-full p-4 bg-white shadow-lg rounded-xl"
              >
                <ProductCard
                  :image="product.images?.[0]?.url ? 'https://chapchap.marshsoft.org' + product.images[0].url : 'https://chapchap.marshsoft.org/uploads/shirt.jpeg'"
                  :title="product.name"
                  :price="product.net_price ? product.net_price.toFixed(2) : 'N/A'"
                  buttonText="View Product"
                  @view="viewProduct(product)"
                  @wishlist="addToWishlist(product)"

                />
                <button
                  @click="addToWishlist(product)"
                  class="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:text-red-500 text-gray-500 transition-colors"
                >
                  <i class="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Best Selling Section -->
      <div class="flex items-start gap-6">
        <!-- 1/4: Heading with Image -->
        <div class="w-1/4 flex flex-col items-start gap-3">
          <h2 class="text-2xl font-extrabold text-orange-600 flex items-center gap-2">
            🔥 Best Selling
          </h2>
          <div class="w-full bg-white shadow-md rounded-xl overflow-hidden">
            <img
              src="../../assets/couch.jpeg"
              alt="Best Selling"
              class="w-full object-contain transition-transform hover:scale-105 duration-300"
            />
          </div>
        </div>

        <!-- 3/4: Product Cards -->
        <div class="w-3/4">
          <div v-if="bestSellingProducts.length === 0" class="text-center py-6 text-red-500">
            No bestselling products available.
          </div>
          <div v-else class="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div class="flex gap-6">
              <div
                v-for="product in bestSellingProducts.slice(0, 5)"
                :key="product.id"
                class="relative w-full p-4 bg-white shadow-lg rounded-xl "
              >
                <ProductCard
                  :image="product.images?.[0]?.url ? 'https://chapchap.marshsoft.org' + product.images[0].url : 'https://via.placeholder.com/151'"
                  :title="product.name"
                  :price="product.net_price ? product.net_price.toFixed(2) : 'N/A'"
                  buttonText="View Product"
                  @view="viewProduct(product)"
                  @wishlist="addToWishlist(product)"
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
  import { computed, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import useProductService from './HomeViewService';
  import type { Product, ProductCategory } from './HomeViewTypes';
  import ProductDetails from '../products/ProductDetails.vue';

  const selectedProduct = ref<Product | null>(null);
  const router = useRouter();

  // View the selected product
  function viewProduct(product: Product) {
    // Navigate to the product details page
    console.log(product.id)
    router.push({ path: `/product/${product.id}` });
  }

  // Close tstoreListhe product details modal
  function closeProductDetails() {
    selectedProduct.value = null;
  }

  function handleCheckout(product: Product) {
    // Handle checkout functionality
    alert(`Proceeding to checkout for ${product.name}`);
  }

  const activeCategory = ref<string>(''); // Initialize with an empty string


  const { fetchProducts } = useProductService();

  const {
    data: storeData,
    isSuccess: storeDataIsSuccess,
    isPending: storeDataIsPending,
    mutate: fetchProductMutate
  } = fetchProducts();

  const storeList = ref<Product[]>([]);

  const fetchProduct = () => {
    fetchProductMutate(undefined, {
      onSuccess: (data) => {
        // console.log(' Store Data:', data);
        // console.log('Fetched Store Data:', data);
        storeList.value = data ;
        console.log('Fetched Store Data:', storeList.value);


      },
      onError: (error) => {
        console.error('Error fetching stores:', error);
      }
    });
  };

  onMounted(fetchProduct);

  // Filter featured products
  const featuredProducts = computed(() => {
    return storeList.value.filter(product => product.is_featured);
  });

  // Filter bestselling products based on quantity (or sales logic)
  const bestSellingProducts = computed(() => {
    return storeList.value.sort((a, b) => b.quantity - a.quantity); // Example using quantity
  });
  
  const wishlist = ref<any[]>([]); 
  const addToWishlist = (product: any) => {
  const exists = wishlist.value.find(p => p.id === product.id);
  if (!exists) wishlist.value.push(product);
};
</script>
