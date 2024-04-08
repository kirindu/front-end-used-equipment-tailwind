<script setup>
//Importaciones de sistemas y librerias
import { ref, computed, watch, onMounted } from "vue";

// Importamos Stores
import { usePostsStore } from "@/stores/posts.js";

// Leemos propiedades de los Stores
const storePost = usePostsStore();

const emit = defineEmits(["data-sent", "evento-click"]);

//Reactividad
const count = ref(0);
const posts = ref([]);

// Props
const props = defineProps({
  category: {
    type: Object,
  },
  isAll: {
    type: Boolean,
  },
});

// // Watches
// watch(() => storePost.posts, (newVal, oldVal) => {
//   console.log(storePost.posts);
//   count.value = 8;
//    // count.value = storePost.posts.filter((e) => e.category.name === props.category.name).length; // Otra forma
//   }
// );

// Metodos
const selectCategory = (selectedCategory) => {
  if (Object.keys(selectedCategory).length != 0) { // Si la categoria esta vacia es porque quiero todos los post ed todas las categorias
    posts.value = storePost.posts.filter(
      (e) => e.category.name === selectedCategory.name
    );
    emit("data-sent", posts.value); // Emitimos los posts seleccionados dependiendo de la categoria
  } else {
    emit("data-sent", storePost.posts); // Emitimos los posts seleccionados dependiendo de la categoria
  }

  emit("evento-click", false);
};

// Computed
const selectClassIcon = computed(() => {
  if (!props.isAll) {
    return props.category.name === "Cans"
      ? "ti ti-trash text-2xl leading-none"
      : "ti ti-truck text-2xl leading-none";
  } else {
    return "ti ti-category text-2xl leading-none";
  }
});

const selectnombreCategoria = computed(() => {
  if (props.isAll) {
    return "All Categories";
  } else {
    return props.category.name;
  }
});

const getCount = computed(() => {
  if (props.isAll) {
    return storePost.posts.length;
  } else {
    return storePost.posts.filter(
      (e) => e.category.name === props.category.name
    ).length;
  }
});
</script>

<template>
  <div
    v-on:click="selectCategory(props.category)"
    class="col-span-12 xxxl:col-span-2 md:col-span-4 cursor-pointer"
  >
    <div class="box overflow-hidden">
      <div class="box-body">
        <div class="flex items-start">
          <div class="ltr:mr-3 rtl:ml-3">
            <span
              style="background-color: #e41a01 !important"
              class="avatar rounded-full bg-primary text-white p-3"
              ><i :class="selectClassIcon"></i
            ></span>
          </div>
          <div class="flex-1 sm:flex justify-between items-center mx-3">
            <div class="flex-1">
              <p class="mb-1 text-gray-500 dark:text-white/70 text-sm">
                Total: {{ getCount }}
              </p>
              <h5 class="text-xl text-gray-800 dark:text-white font-semibold">
                {{ selectnombreCategoria }}
              </h5>
            </div>
            <div id="totalInvested" class="min-w-fit"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
