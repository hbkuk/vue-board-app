import axios from 'axios'
import router from '@/router/router'
import {ref} from "vue";

/**
 * Post 방식으로 요청하는 컴포저블
 *
 * @param {string} url - API 엔드포인트 URL
 * @param {string} successRouterPath - 라우터 네비게이션을 위한 경로
 * @param {Object} formData - API 요청에 사용되는 데이터 객체
 * @returns {object} - 에러 객체 혹은 Null
 */
export function usePostApi(url, successRouterPath, formData) {
    const error = ref(null)

    async function fetchData() {
        error.value = null

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": `multipart/form-data`
                }
            })
            await router.push(successRouterPath + `${response.data.boardIdx}`);
            return null;
        } catch (err) {
            console.log(err)
            error.value = err.response.data
        }
    }
    fetchData()
    return {error};
}
