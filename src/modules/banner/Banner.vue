<template>
  <div class="relative w-full h-40 overflow-hidden bg-gray-200 flex items-center justify-center">
    <div 
      class="flex transition-transform duration-500 ease-in-out w-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="w-full flex-shrink-0 relative">
        <img 
          :src="slide.image" 
          :alt="`Slide ${index + 1}`" 
          class="w-full h-40 object-cover" 
          @error="handleImageError(index)"
        />
        <div 
          v-if="slide.error" 
          class="absolute inset-0 flex items-center justify-center bg-white text-black text-lg font-bold"
        >
          Black Friday - Up to 30% Off
        </div>
      </div>
    </div>
    
    <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <span 
        v-for="(slide, index) in slides" 
        :key="index" 
        @click="currentIndex = index"
        class="w-3 h-3 rounded-full cursor-pointer"
        :class="currentIndex === index ? 'bg-green-500' : 'bg-black'"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import image from '../../assets/sales.jpg'
interface Slide {
  image: string;
  error?: boolean; // To track if an image failed to load
}

const slides = ref<Slide[]>([
  { image: image }, // Broken URL for testing
  { image: image },
  { image: image }
]);

const currentIndex = ref<number>(0);

const handleImageError = (index: number) => {
  slides.value[index].error = true;
};
</script>

<style scoped>
button {
  opacity: 0.7;
  transition: opacity 0.3s;
}
button:hover {
  opacity: 1;
}
</style>
