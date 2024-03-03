<script setup>

//Importaciones de sistemas y librerias
import {ref, computed} from "vue";


//Props
const props = defineProps({
  post: {
    type: Object
  }
})

//Reactividad
const urlImage = ref('');

// Computed
const selectImage = computed(() => {
  urlImage.value = props.post.images[0].image_url;
  return urlImage.value;
});


</script>

<template>

              <div class="col-span-12 xxxl:col-span-4">
                <div class="box">
                  <div class="p-6">
                    <img class="w-full rounded-sm" :src="selectImage" alt="Image Description">
                    <div class="box-body px-0 pb-0">
                      <a href="javascript:void(0);" class="text-sm leading-[0] text-danger font-semibold">Technology</a>
                      <h5 class="font-semibold mb-0 text-lg leading-none">Lorem ipsum dolor sit amet consectetur
                        adipisicing elit.</h5>
                      <p class="mt-3 mb-3 text-gray-500 dark:text-white/70 text-sm">
                        {{ props.post.description }}
                      </p>
                      <a class="p-0 font-semibold text-primary text-sm flex" href="blog-details.html">
                        Read More<i class="ri ri-arrow-right-line ltr:ml-3 rtl:mr-3 leading-none my-auto rtl:rotate-180"></i>
                      </a>
                    </div>
                  </div>
                  <div class="box-footer bg-transparent">
                    <div class="sm:flex items-center justify-between space-y-2 sm:space-y-0 xxxl:flex xxxl:space-y-0">
                      <div class="flex items-center space-x-3 rtl:space-x-reverse">
                        <div class="flex">
                          <img class="avatar avatar-sm ring-0 rounded-full" src="../assets/img/users/1.jpg"
                            alt="avatar">
                        </div>
                        <div>
                          <p class="text-slate-700 font-semibold text-sm dark:text-white">
                            {{ props.post.name }}
                          </p>
                          <p class="text-xs text-gray-500 dark:text-white/70">
                            {{ props.post.price }}
                          </p>
                        </div>
                      </div>
                      <div class="">
                        <a href="javascript:void(0);"
                          class="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark inline-flex"><i
                            class="text-xs ri ri-heart-line"></i><span class="my-2">30</span></a>
                        <a href="javascript:void(0);"
                          class="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark inline-flex"><i
                            class="text-xs ri ri-thumb-up-line"></i><span class="my-2">25k</span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
</template>