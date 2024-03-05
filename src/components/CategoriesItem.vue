<script setup>

//Importaciones de sistemas y librerias
import {ref, computed, watch, onMounted} from "vue";

// Importamos Stores
import {usePostsStore} from "@/stores/posts.js";

// Leemos propiedades de los Stores
const storePost = usePostsStore();

const emit = defineEmits(['data-sent']);

//Reactividad
const count = ref(0);
const posts = ref([]);  
// Props
const props = defineProps({
  category: {
    type: Object
  },
});


// Watches
watch(() => storePost.posts, (newVal, oldVal) => {
  count.value = storePost.posts.filter(e => e.category.name === props.category.name).length; // Otra forma
});


// Metodos
const selectCategory = (nameCategory) => {
      posts.value = storePost.posts.filter(e => e.category.name === nameCategory);
      emit('data-sent', posts.value); // Emitimos los posts seleccionados dependiendo de la categoria
    }



// Computed
const selectClassIcon = computed(() => {
  return (props.category.name === 'Cans' ? 'ti ti-trash text-2xl leading-none' : 'ti ti-truck text-2xl leading-none');
});


</script>

<template>

  
 <div v-on:click="selectCategory(props.category.name)" class="col-span-12 xxxl:col-span-2 md:col-span-4 cursor-pointer">
            <div class="box overflow-hidden">
              <div class="box-body">
                <div class="flex items-start">
                  <div class="ltr:mr-3 rtl:ml-3">
                    <span class="avatar rounded-full bg-primary text-white p-3"><i :class="selectClassIcon"></i></span>
                  </div>
                  <div class="flex-1 sm:flex justify-between items-center mx-3">
                    <div class="flex-1">
                      <p class="mb-1 text-gray-500 dark:text-white/70 text-sm">Total: {{ count }}</p>
                      <h5 class="text-xl text-gray-800 dark:text-white font-semibold">{{props.category.name}}</h5>
                    </div>
                    <div id="totalInvested" class="min-w-fit"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
</template>