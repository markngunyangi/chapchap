// import { storeStore } from './storeStore';
import { useMutation } from '@tanstack/vue-query';
// import { storeData, HealthPrograms } from './storeTypes';
import { useNotification } from '@/composables';
const { error, success } = useNotification();
import {
    getproducts,getFeaturedProducts
} from './HomeViewAPI';

const useproductService = () => {
//   const storeDataStoreObj = storeStore();

  function fetchProducts() {
    return useMutation({
      mutationFn: getproducts,
      onSuccess: (data) => {
        console.log('Fetched data:', data);
        // storeDataStoreObj.setstoreData(data);
      },
      onError: (error) => {
        console.error('Error fetching store data:', error);
      }
    });
  }
  function fetchFeaturedProducts() {
    return useMutation({
      mutationFn: getFeaturedProducts,
      onSuccess: (data) => {
        console.log('Fetched data:', data);
        // storeDataStoreObj.setstoreData(data);
      },
      onError: (error) => {
        console.error('Error fetching store data:', error);
      }
    });
  }
 

  return {
    fetchProducts,
    fetchFeaturedProducts
  };
};

export default useproductService;
