import axios from 'axios'
import {useFilterParams} from "@/composable/filterParams";


/**
 * GET 요청을 수행하는 컴포저블
 *
 * @param {string} url - 요청을 보낼 URL
 * @param {Record<string, any>} [params=null] - 요청에 사용될 매개변수 객체 (기본값: null)
 * @returns {Promise<{ data: any, error: any }>} - GET 요청 결과를 나타내는 객체의 프로미스
 * - data: 요청에 성공한 경우 응답 데이터
 * - error: 요청에 실패한 경우 에러 데이터 (상태 코드 200 이외의 응답에 대한 처리)
 */
export async function useGetRequest(url, params = null) {
    try {
        const response = await axios.get(url, { params: useFilterParams(params) });
        return { data: response.data, error: null };
    } catch (err) {
        return { data: null, error: err.response.data };
    }
}
