<template>
    <div>
      <Navbar />
      <Banner />
      <CategoryTabs />
      <CategorySelector />
      <div class="p-4">
        <h2 class="text-lg font-bold">Featured Products</h2>
        <div class="grid grid-cols-4 gap-4">
          <ProductCard image="/food1.jpg" title="Roll ups" price="140" buttonText="Order" />
          <ProductCard image="/food2.jpg" title="Croissants" price="130" buttonText="Order" />
          <ProductCard image="/food3.jpg" title="Tangy Shrimp" price="140" buttonText="Order" />
          <ProductCard image="/food3.jpg" title="Tangy Shrimp" price="140" buttonText="Order" />
        </div>
        <h2 class="text-lg font-bold mt-6">Best Selling</h2>
        <div class="grid grid-cols-4 gap-4">
          <ProductCard image="/laptop1.jpg" title="Galaxy Book 4" price="1400" buttonText="Add to Cart" />
          <ProductCard image="/laptop2.jpg" title="Pro Art 16" price="1800" buttonText="Add to Cart" />
          <ProductCard image="/laptop3.jpg" title="MSI GL63" price="2200" buttonText="Add to Cart" />
          <ProductCard image="/laptop2.jpg" title="Pro Art 16" price="1800" buttonText="Add to Cart" />

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
  </script>