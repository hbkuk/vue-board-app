import { ref, unref, isRef, watchEffect } from 'vue'
import axios from 'axios'
import router from '@/router/router'
import { useFilterParams } from '@/composable/filterParams'

/**
 * GET 방식으로 데이터를 가져오는 컴포저블
 *
 * @param {string} url - API 엔드포인트 URL
 * @param {string} routerPath - 라우터 네비게이션을 위한 경로
 * @param {Object} params - API 요청에 사용되는 반응형 파라미터 (선택적)
 * @returns {object} - 가져온 데이터와 에러를 포함하는 객체
 */
export function useGetRequestWithParams(url, routerPath, params) {
    const data = ref(null)
    const error = ref(null)

    /**
     * 데이터를 가져오는 작업을 수행합니다.
     * @async
     */
    async function fetchRequest() {
        data.value = null
        error.value = null

        try {
            //axios => 200번대 응답만을 성공으로 처리
            const response = await axios.get(url, { params: useFilterParams(unref(params)) }) // axios 기반 GET 요청
            
            await router.push({ path: routerPath, query: useFilterParams(unref(params)) }) // 라우터 네비게이션을 위해 URL 변경
            sessionStorage.setItem('condition', JSON.stringify(useFilterParams(unref(params)))) // TODO: startDate=2022-06-22&endDate=2023-06-22&pageNo=1&ddd=3 => 허용되지 않는 조건에 대한 처리
            data.value = response.data
        } catch (err) {
            error.value = err.response.data // 상태코드 200번외의 응답에 대한 처리
        }
    }

    if (isRef(params)) {
        watchEffect(fetchRequest) // params가 ref인 경우에만 감시
    } else {
        fetchRequest() // 아닌 경우에는 초기에 한 번
    }

    return { data, error }
}
