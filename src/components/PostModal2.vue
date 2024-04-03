<script setup>
// Importaciones de sistemas y librerias
import { defineProps, ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";

//Importaciones de Composables
import useFormatCurrency from "@/composables/useFormatCurrency.js";
import useFormatDate from "@/composables/useFormatDate.js";
import { usePostsStore } from "@/stores/posts.js";

//Leemos propiedades de los Composables
const { formattingCurrency } = useFormatCurrency();
const { formattingDate } = useFormatDate();

// Props
const props = defineProps({
  isOpen: Boolean,
  post: {
    type: Object,
  },
});

// Reactividad
const urlImage = ref("");
const indexSelected = ref(0);
const target = ref(null);

// Emits
const emit = defineEmits(["modal-close"]);

// Metodos
onClickOutside(target, () => emit("modal-close"));

const SelectIndex = (index) => {
  indexSelected.value = index;
};

// Computed
const selectImage = computed(() => {
  urlImage.value = props.post.images[indexSelected.value].image_url;
  return urlImage.value;
});
</script>

<template>
  <div
    v-if="isOpen"
    id="hs-vertically-centered-scrollable-modal"
    class="hs-overlay hidden ti-modal"
    ref="target"
  >
    <div
      class="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto"
    >
      <div class="ti-modal-content">
        <div class="ti-modal-header">
          <h3 class="ti-modal-title">
            <slot name="header"> default tittle </slot>
          </h3>
          <button
            type="button"
            class="hs-dropdown-toggle ti-modal-close-btn"
            data-hs-overlay="#hs-vertically-centered-scrollable-modal"
          >
            <span class="sr-only">Closes</span>
            <svg
              class="w-3.5 h-3.5"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div class="ti-modal-body">
          <div class="p-6">
            <img
              class="w-full rounded-sm"
              :src="selectImage"
              alt="Image Description"
            />
          </div>

          <div
            class="flex justify-center items-center space-x-3 rtl:space-x-reverse"
          >
            <div class="flex -space-x-2 rtl:space-x-reverse">
              <img
                v-on:click="SelectIndex(index)"
                v-for="(post, index) in props.post.images"
                :key="post._id"
                class="avatar avatar-sm ring-0 rounded-full cursor-pointer"
                :src="post.image_url"
                alt="avatar"
                style="height: 4rem; width: 4rem"
              />
            </div>
            <div>
              <p class="text-slate-700 font-semibold text-sm text-purple-400">
                {{ `(${props.post.images.length} Pics)` }}
              </p>
            </div>
          </div>

          <br />

          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                <span class="font-semibold mb-0 text-xl text-orange-500 leading-none">Price:</span>
         

                {{ `${formattingCurrency(props.post.price)}` }}
              </h3>

        
            </div>
          </div>

          <div
            v-if="props.post.category.name != 'Cans'"
            class="grid grid-cols-6 gap-2 mt-4"
          >
            <div class="col-span-12 xxxl:col-span-3 md:col-span-3">
              <div class="box overflow-hidden">
                <div class="box-body">
                  <div class="flex items-start">
                    <div class="ltr:mr-3 rtl:ml-3">
                      <span
                        class="avatar rounded-full bg-primary text-white p-3"
                        ><i
                          class="ti ti-calendar-stats text-2xl leading-none"
                        ></i
                      ></span>
                    </div>
                    <div
                      class="flex-1 sm:flex justify-between items-center mx-3"
                    >
                      <div class="flex-1">
                        <p class="mb-1 text-orange-500 text-xl font-semibold">Year:</p>
                        <h6 class="text-lg text-gray-800 dark:text-white">
                          {{ props.post.year }}
                        </h6>
                      </div>
                      <div id="totalInvested" class="min-w-fit"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-12 xxxl:col-span-3 md:col-span-3">
              <div class="box overflow-hidden">
                <div class="box-body">
                  <div class="flex items-start">
                    <div class="ltr:mr-3 rtl:ml-3">
                      <span
                        class="avatar rounded-full bg-primary text-white p-3"
                        ><i
                          class="ti ti-brand-bandcamp text-2xl leading-none"
                        ></i
                      ></span>
                    </div>
                    <div class="flex-1 sm:flex justify-between items-center mx-3" >
                      <div class="flex-1">
                        <p class="mb-1 text-orange-500 text-xl font-semibold">Manufacturer:</p>
                        <h6 class="text-lg text-gray-800 dark:text-white">
                          {{ props.post.manufacturer }}
                        </h6>
                      </div>
                      <div id="totalInvested" class="min-w-fit"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12 xxxl:col-span-3 md:col-span-3">
              <div class="box overflow-hidden">
                <div class="box-body">
                  <div class="flex items-start">
                    <div class="ltr:mr-3 rtl:ml-3">
                      <span
                        class="avatar rounded-full bg-primary text-white p-3"
                        ><i class="ti ti-box-model text-2xl leading-none"></i
                      ></span>
                    </div>
                    <div class="flex-1 sm:flex justify-between items-center mx-3">

                      <div class="flex-1">
                        <p class="mb-1 text-orange-500 text-xl font-semibold">Body:</p>
                        <h6 class="text-lg text-gray-800 dark:text-white">
                         {{ props.post.body }}
                        </h6>
                      </div>
                      <div id="totalInvested" class="min-w-fit"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12 xxxl:col-span-3 md:col-span-3">
              <div class="box overflow-hidden">
                <div class="box-body">
                  <div class="flex items-start">
                    <div class="ltr:mr-3 rtl:ml-3">
                      <span
                        class="avatar rounded-full bg-primary text-white p-3"
                        ><i class="ti ti-engine text-2xl leading-none"></i
                      ></span>
                    </div>
                    <div class="flex-1 sm:flex justify-between items-center mx-3" >
                      <div class="flex-1">
                        <p class="mb-1 text-orange-500 text-xl font-semibold">Engine:</p>
                        <h6 class="text-lg text-gray-800 dark:text-white">
                          {{ props.post.engine }}
                        </h6>
                      </div>
                      <div id="totalInvested" class="min-w-fit"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12 xxxl:col-span-3 md:col-span-3">
              <div class="box overflow-hidden">
                <div class="box-body">
                  <div class="flex items-start">
                    <div class="ltr:mr-3 rtl:ml-3">
                      <span
                        class="avatar rounded-full bg-primary text-white p-3"
                        ><i
                          class="ti ti-manual-gearbox text-2xl leading-none"
                        ></i
                      ></span>
                    </div>
                    <div class="flex-1 sm:flex justify-between items-center mx-3">
                      <div class="flex-1">
                        <p class="mb-1 text-orange-500 text-xl font-semibold">Power Train:</p>
                        <h6 class="text-lg text-gray-800 dark:text-white">
                          {{ props.post.powerTrain }}
                        </h6>
                      </div>
                      <div id="totalInvested" class="min-w-fit"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12 xxxl:col-span-3 md:col-span-3">
              <div class="box overflow-hidden">
                <div class="box-body">
                  <div class="flex items-start">
                    <div class="ltr:mr-3 rtl:ml-3">
                      <span
                        class="avatar rounded-full bg-primary text-white p-3"
                        ><i
                          class="ti ti-vector-bezier-2 text-2xl leading-none"
                        ></i
                      ></span>
                    </div>
                    <div class="flex-1 sm:flex justify-between items-center mx-3">
                      <div class="flex-1">
                        <p class="mb-1 text-orange-500 text-xl font-semibold">Chassis:</p>
                        <h6 class="text-lg text-gray-800 dark:text-white">
                          {{ props.post.chassis }}
                        </h6>
                      </div>
                      <div id="totalInvested" class="min-w-fit"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

         
            
          </div>

          
          <h4 class="text-lg  text-gray-800 dark:text-white">
                <span class="font-semibold mb-0 text-xl text-orange-500 leading-none">Description:</span>
                {{ `${props.post.description}` }}
              </h4>

              <br>
              <hr>
<br>
              <h4 class="text-lg  text-gray-800 dark:text-white">
                <span class="font-semibold mb-0 text-xl text-blue-500 leading-none">Contact:</span>
               <p>Sam Nelson</p>
               <p>801-836-5658</p>
               <p>sam@caasutah.com</p>
              </h4>

        </div>
        <div class="ti-modal-footer">
          <button
            type="button"
            class="hs-dropdown-toggle ti-modal-close-btn"
            data-hs-overlay="#hs-vertically-centered-scrollable-modal"
          >
            <span>Close</span>
          </button>
          <!-- 
                       <button @click.stop="emit('modal-close')" type="button" class="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
                          Close2
                        </button>  -->

          <!-- <button @click.stop="test('value')" type="button" class="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10" data-hs-overlay="#hs-vertically-centered-scrollable-modal">
                          Close2
                        </button>  -->
        </div>
      </div>
    </div>
  </div>
</template>
