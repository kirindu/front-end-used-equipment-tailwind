 <script setup>
//Importaciones de sistemas y librerias
import { ref, computed } from "vue";

//Importaciones de componentes
import PostModal2 from "./PostModal2.vue";

//Importaciones de Composables
import useFormatCurrency from "@/composables/useFormatCurrency.js";
import useFormatDate from "@/composables/useFormatDate.js";

//Leemos propiedades de los Composables
const { formattingCurrency } = useFormatCurrency();
const { formattingDate } = useFormatDate();

//Props
const props = defineProps({
  post: {
    type: Object,
  },
});

// Reactividad
const urlImage = ref("");
const indexSelected = ref(0);
const isModalOpened = ref(false);

// Computed
const selectImage = computed(() => {
  urlImage.value = props.post.images[indexSelected.value].image_url;
  return urlImage.value;
});

//Metodos

const SelectIndex = (index) => {
  indexSelected.value = index;
};

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

// const submitHandler = ()=>{

//  console.log('thi is a test');
//   //here you do whatever
// }
</script>

<template>
  <div class="col-span-12 md:col-span-6 xxl:col-span-3">
    <div class="box">
      <div class="p-6">
        <img
          class="w-full rounded-sm"
          :src="selectImage"
          alt="Image Description"
        />
        <div class="box-body px-0 pb-0">
     

          <div class="flex-1">
                        <p class="mb-1 text-orange-500 text-lg font-semibold">Price: <span class="text-base text-gray-800 dark:text-white">{{ ` ${formattingCurrency(props.post.price)}` }}</span></p>
                   
                      </div>

          <p class="mt-3 mb-3 text-base text-gray-500 dark:text-white/70 text-sm">
            {{ props.post.description }}
          </p>
          <button style="background-color: #e41a01 !important;"
            @click="openModal"
            type="button"
            class="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
            data-hs-overlay="#hs-vertically-centered-scrollable-modal"
          >
            Read More...
          </button>
        </div>
      </div>
      <div class="box-footer bg-transparent">
        <div
          class="sm:flex items-center justify-between space-y-2 sm:space-y-0 xxxl:flex xxxl:space-y-0"
        >
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <div class="flex -space-x-2 rtl:space-x-reverse">
              <img
                v-on:click="SelectIndex(index)"
                v-for="(post, index) in props.post.images"
                :key="post._id"
                class="avatar avatar-sm ring-0 rounded-full cursor-pointer"
                :src="post.image_url"
                alt="avatar"
              />
            </div>
            <div>
              <p style="color: #e41a01;" class="text-slate-700 font-semibold text-sm text-purple-400">
                {{ `(${props.post.images.length} Pics)` }}
              </p>
            </div>
          </div>
          <div class="">
            <span class="my-2"
              >Date:
              {{ formattingDate(props.post.creationDate, "MM/DD/YYYY") }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <PostModal2 :isOpen="isModalOpened" @modal-close="closeModal" :post="post">
    <template #header>{{ props.post.name }}</template>
  </PostModal2>
</template>
