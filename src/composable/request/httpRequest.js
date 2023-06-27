import axios from 'axios'

/**
 * HTTP 요청을 수행하는 컴포저블
 *
 * @param {string} method - HTTP 메서드 (post, put 등)
 * @param {string} url - API 엔드포인트 URL
 * @param {Object} formData - API 요청에 사용되는 데이터 객체
 * @param {Object} requestHeader - 요청 헤더
 * @returns {object} - 응답 데이터 및 에러 객체
 */
export async function useHttpRequest(method, url, formData = null, requestHeader= null) {
    try {
        const response = await axios.request({
            method,
            url,
            data: formData,
            headers: requestHeader,
        });
        return { data: response.data, error: null };
    } catch (err) {
        console.log(err);
        return { data: null, error: err.response.data };
    }
}

