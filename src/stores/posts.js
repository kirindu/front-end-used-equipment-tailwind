import {ref, onMounted} from "vue";
import {defineStore} from "pinia";
import PostsAPI from "@/api/PostsAPI.js";

export const usePostsStore = defineStore('posts', () => {

    const posts = ref([]);
    const loading = ref(false);
    const error = ref('');

    onMounted(async () => {

        loading.value = true;

        try {
            const {data} = await PostsAPI.all();
            posts.value = data.posts; // Recuerda que data es el wrap de axios

         //   console.log(JSON.parse(JSON.stringify(posts)));

        } catch(err) {
            error.value = `Ocurrio el siguiente error al intentar llamar al servicio de post: ${err}`;
        } finally {
            loading.value = false;
        }
    })

    return {
        posts,
        loading,
        error
    }
});