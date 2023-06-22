import { ref, unref, isRef, watchEffect } from 'vue'
import axios from 'axios'
import router from '@/router/router'
import { useFilterParams } from '@/composable/filterParams'

/**
 * GET 방식으로 데이터를 가져오는 컴포저블
 *
 * @param {string} url - API 엔드포인트 URL
 * @returns {object} - 가져온 데이터와 에러를 포함하는 객체
 */
export function useGetApi(url) {
    const data = ref(null)
    const error = ref(null)

    /**
     * 데이터를 가져오는 작업을 수행합니다.
     *
     * @async
     */
    async function fetchData() {
        data.value = null
        error.value = null

        try {
            //axios => 200번대 응답만을 성공으로 처리
            const response = await axios.get(url)
            data.value = response.data
        } catch (err) {
            error.value = err.response.data // 상태코드 200번외의 응답에 대한 처리
        }
    }
    fetchData()
    return { data, error }
}