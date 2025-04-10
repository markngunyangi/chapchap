import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../modules/homeview/HomeView.vue';
import Stores from '../modules/storedetails/StoreDetails.vue';
import StoreDetails from '../modules/storedetails/ViewStore.vue';
import ProductDetails from '../modules/products/ProductDetails.vue';
import NotFoundView from '../modules/exception/NotFound.vue';
import RestaurantsPage from '../modules/restaurants/Restaurant.vue';
import AddJobView from '@/views/AddJobView.vue';
import EditJobView from '@/views/EditJobView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product/:id', // Dynamic route for the product page
      name: 'productDetails',
      component: ProductDetails,
      props: true, // This allows passing the route params as props to the component
    },
    {
      path: '/stores',
      name: 'stores',
      component: Stores,
    },
    { 
      path: '/restaurants', 
      name:'restaurants', 
      component: RestaurantsPage 
    },
    { path: '/store/:id', name: 'StoreDetails', component: StoreDetails, props: true },

    // { 
    //   path: '/service-request',
    //   name:'service-request', 
    //   component: ServiceRequestPage 
    // },

    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
