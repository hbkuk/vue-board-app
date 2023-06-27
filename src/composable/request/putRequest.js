import axios from 'axios'
import router from '@/router/router'

/**
 * PUT 요청을 수행하는 컴포저블
 *
 * @param {string} url - API 엔드포인트 URL
 * @param {string} successRouterPath - 라우터 네비게이션을 위한 경로
 * @param {Object} formData - API 요청에 사용되는 데이터 객체
 * @param {Object} requestHeader - 요청 헤더
 * @returns {object|null} - 에러 객체 혹은 Null
 */
export async function usePutRequest(url, successRouterPath, formData, requestHeader) {
    try {
        await axios.put(url, formData, { headers: requestHeader });
        await router.push(successRouterPath);
        return null;
    } catch (err) {
        console.log(err);
        return { error: err.response.data };
    }
}
