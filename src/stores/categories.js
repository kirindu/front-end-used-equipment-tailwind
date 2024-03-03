import {ref, onMounted} from "vue";
import {defineStore} from "pinia";
import CategoriesAPI from "@/api/CategoriesAPI.js";

export const useCategoriesStore = defineStore('categories', () => {

    const categories = ref([]);
    const loading = ref(false);
    const error = ref('');

    onMounted(async () => {

        loading.value = true;

        try {
            const {data} = await CategoriesAPI.all();
            categories.value = data.categories; // Recuerda que data es el wrap de axios

         //   console.log(categories.value);

        } catch(err) {
            error.value = `Ocurrio el siguiente error al intentar llamar al servicio de categoria: ${err}`;
        } finally {
            loading.value = false;
        }
    })

    return {
        categories,
        loading,
        error
    }
});