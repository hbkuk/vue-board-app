import { ref, unref, isRef, watchEffect } from 'vue'
import axios from 'axios'
import router from '@/router/router'
import { useFilterCondition } from '@/script/filterCondition'

/**
 * GET 방식으로 데이터를 가져오는 훅
 * @param {string} url - API 엔드포인트 URL
 * @param {string} routerPath - 라우터 네비게이션을 위한 경로
 * @param {ref} params - API 요청에 사용되는 반응형 파라미터
 * @returns {object} - 가져온 데이터와 에러를 포함하는 객체
 */
export function useGetApi(url, routerPath, params) {
    const data = ref(null)
    const error = ref(null)

    /**
     * 데이터를 가져오는 작업을 수행합니다.
     * @async
     */
    async function fetchData() {
        data.value = null
        error.value = null

        try {
            const response = await axios.get(url, { params: useFilterCondition(unref(params)) })
            if (response.status >= 200 && response.status < 300) {
                await router.push({ path: routerPath, query: useFilterCondition(unref(params)) })
                data.value = response.data
            }
        } catch (err) {
            error.value = err.response.data
        }
    }

    if (isRef(params)) {
        watchEffect(fetchData)
    } else {
        fetchData()
    }

    return { data, error }
}
