import { ref, computed } from 'vue';
import {usePostsStore} from "@/stores/posts.js";





export default function useTotalPostByCategory() {

    const count = ref(0);

    const storePost = usePostsStore();
    const posts = JSON.parse(JSON.stringify(storePost.posts));

    const getTotals = (nameCategory) => {

        const getCalculus = computed(() => {
            posts.forEach(element => {

                if (element.category.name === nameCategory) {
                    count.value++;
                }
            });

            return count.value;
        })

        return getCalculus.value;

    }

    return {
        getTotals
    }

}