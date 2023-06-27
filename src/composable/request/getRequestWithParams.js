import axios from 'axios'
import { useFilterParams } from '@/composable/filterParams'

/**
 * GET 방식으로 데이터를 가져오는 컴포저블
 *
 * @param {string} url - API 엔드포인트 URL
 * @param {Object} params - API 요청에 사용되는 반응형 파라미터 (선택적)
 * @returns {object} - 가져온 데이터와 에러를 포함하는 객체
 */
export async function useGetRequestWithParams(url, params) {
    let data = null;
    let error = null;

    try {
        const response = await axios.get(url, { params: useFilterParams(params) }) // axios 기반 GET 요청 ==> 200번대 응답만을 성공으로 처리
        data = response.data
    } catch (err) {
        error = err.response.data // 상태코드 200번외의 응답에 대한 처리
    }

    return { data, error }
}
