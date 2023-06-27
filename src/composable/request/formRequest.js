import axios from 'axios';
import router from '@/router/router';
import { ref } from 'vue';

export async function useFormRequest(method, url, successRouterPath, formData) {
    const error = ref(null);

    async function fetchData() {
        error.value = null

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": `multipart/form-data`
                }
            })

            if (method === 'post') {
                await router.push(`${successRouterPath}${response.data.boardIdx}`);
            } else if (method === 'put') {
                await router.push(successRouterPath);
            }
            return null;

        } catch (err) {
            console.log(err)
            error.value = err.response.data
        }
    }
    fetchData()
    return { error };
}