<script setup>
//Importaciones de sistemas y librerias
import { ref, computed, watch, onMounted } from "vue";

// Importamos Stores
import { useCategoriesStore } from "@/stores/categories.js";
import { usePostsStore } from "@/stores/posts.js";

// Importamos Componentes
import AppPageHeader from "./components/layouts/AppPageHeader.vue";
import CategoriesItem from "./components/CategoriesItem.vue";
import PostsItem from "./components/PostsItem.vue";
import Spinner from "./components/Spinner.vue";

// Leemos propiedades de los Stores
const storeCategory = useCategoriesStore();
const storePost = usePostsStore();

//Reactividad
const postRecividos = ref([]);
const visiblePostInicial = ref(true);

// Metodos

const gestionarPostsRecibidos = (data) => {
  postRecividos.value = data;
};

const recibirClicksDeCategoerias = (data) => {
  visiblePostInicial.value = data;

  console.log(data);
};
</script>

<template>
  <div class="page">
    <div class="content mt-1">
      <div class="main-content">
        <AppPageHeader />

        <Spinner v-if="storeCategory.loading" />

        <!-- Start::row-1 -->
        <div class="grid grid-cols-12 gap-x-5">
          <CategoriesItem
            v-if="!storeCategory.loading"
            :isAll="true"
            :category="[]"
            @data-sent="gestionarPostsRecibidos"
            @evento-click="recibirClicksDeCategoerias"
          />
          
          <CategoriesItem
            v-if="!storeCategory.loading"
            v-for="category in storeCategory.categories"
            :key="category._id"
            :category="category"
            :isAll="false"
            @data-sent="gestionarPostsRecibidos"
            @evento-click="recibirClicksDeCategoerias"
          />
        </div>

        <template v-if="visiblePostInicial">
          <div class="grid grid-cols-12 gap-x-5">
            <PostsItem
              v-if="!storePost.loading"
              v-for="post in storePost.posts"
              :key="post._id"
              :post="post"
            />
          </div>
        </template>

        <template v-if="!visiblePostInicial">
          <div class="grid grid-cols-12 gap-x-5">
            <PostsItem
              v-for="post in postRecividos"
              :key="post._id"
              :post="post"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
