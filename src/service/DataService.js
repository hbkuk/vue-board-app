import axios from 'axios';
import router from "@/router/router";

/**
 * 데이터 서비스 함수
 */
const DataService = {
    /**
     * 게시판 목록을 가져오는 메서드
     *
     * @param {object} searchConditionParams - 검색 조건 파라미터
     * @returns {Promise<object>} - 게시판 목록
     * @throws {Error} - 실패 시 에러를 던짐
     */
    async fetchBoards(searchConditionParams) {
        try {
            const response = await axios.get('/api/boards', { params: searchConditionParams });
            if (response.status >= 200 && response.status < 300) {
                await router.push({ path: '/boards', query: searchConditionParams });
                return response.data;
            } else {
                throw new Error()
            }
        } catch (error) {
            throw error;
        }
    },


    /**
     * 카테고리 목록을 가져오는 메서드
     *
     * @returns {Promise<object>} - 카테고리 목록
     * @throws {Error} - 실패 시 에러를 던짐
     */
    async fetchCategories() {
        const response = await axios.get('/api/categories');
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error('카테고리 데이터를 가져오는데 실패했습니다. 상태 코드: ' + response.status);
        }
    }
};

export default DataService;
