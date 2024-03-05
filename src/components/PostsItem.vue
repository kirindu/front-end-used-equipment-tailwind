<script setup>

//Importaciones de sistemas y librerias
import {ref, computed} from "vue";

//Importaciones de Composables
import useFormatCurrency from "@/composables/useFormatCurrency.js";
import useFormatDate from "@/composables/useFormatDate.js";
import useFormatNumber from "@/composables/useFormatNumber.js";

//Leemos propiedades de los Composables
const {formattingCurrency} = useFormatCurrency();
const {formattingDate} = useFormatDate();
const {formattingNumber} = useFormatNumber();

//Props 
const props = defineProps({
  post: {
    type: Object
  }
})


//Reactividad
const urlImage = ref('');
const totalPic = ref(0);

// Computed
const selectImage = computed(() => {
  urlImage.value = props.post.images[0].image_url;
  return urlImage.value;
});



//Metodos

</script>

<template>

<!--                <div class="col-span-12 md:col-span-6 xxl:col-span-3">-->
  <div class="col-span-12 md:col-span-6 xxl:col-span-2">
                <div class="box">
                  <div class="p-6">
                    <img class="w-full rounded-sm" :src="selectImage" alt="Image Description">
                    <div class="box-body px-0 pb-0">

                      <h5 class="font-semibold mb-0 text-lg text-orange-500 leading-none">{{props.post.name}}</h5>

                      <br/>
                      <h5 class="font-semibold mb-0 text-lg leading-none">{{`Price:  ${formattingCurrency(props.post.price)}`}}</h5>

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
                        <div class="flex -space-x-2 rtl:space-x-reverse">
                          <img v-for="post in props.post.images" :key="post._id" class="avatar avatar-sm ring-0 rounded-full" :src="post.image_url" alt="avatar">
                        </div>
                        <div>
                          <p class="text-slate-700 font-semibold text-sm text-purple-400">
                            {{`Total Pics: ${props.post.images.length}`}}
                          </p>

                        </div>
                      </div>
                      <div class="">
                       <span class="my-2">Publication Date: {{formattingDate(props.post.creationDate,'MM/DD/YYYY')}}</span>

                      </div>
                    </div>


                  </div>
                </div>
              </div>
</template>