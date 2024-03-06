<script setup>

//Importaciones de sistemas y librerias
import {ref, computed, watch, onMounted} from "vue";

// Importamos Stores
import {useCategoriesStore} from "@/stores/categories.js";

// Importamos Componentes
import AppPageHeader from './components/layouts/AppPageHeader.vue';
import CategoriesItem from './components/CategoriesItem.vue';
import PostsItem from "./components/PostsItem.vue";
import Spinner from "./components/Spinner.vue";

// Leemos propiedades de los Stores
const storeCategory = useCategoriesStore();

//Reactividad
const postRecividos = ref([]);

// Metodos

const gestionarPostsRecibidos = (data) => {
  postRecividos.value = data;
 // console.log(postRecividos.value);
};

</script>

<template>

<div class="page">
  <div class="content mt-1" >
    <div class="main-content">

      <AppPageHeader />

      <Spinner v-if="storeCategory.loading" />
 
            <!-- Start::row-1 -->
            <div class="grid grid-cols-12 gap-x-5">

              <CategoriesItem
              v-if="!storeCategory.loading"
              v-for="category in storeCategory.categories"
                :key="category._id"
                :category="category"
                @data-sent="gestionarPostsRecibidos"
              />
        </div>

        <div class="grid grid-cols-12 gap-x-5">
        <PostsItem
        v-for="post in postRecividos"
                :key="post._id"
                :post="post"    
        />
        </div>

        
       
    </div>

  </div>


</div>
 
</template>
