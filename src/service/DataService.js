import {useGetApi} from "@/composable/getApi";

/**
 * 데이터 서비스 함수
 */
const DataService = {

    /**
     * 게시판 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {{data: null, error: null}} - 게시판 목록
     * @throws {Error} - 실패 시 에러를 던짐
     */
    fetchBoards(condition) {
        return useGetApi('/api/boards', '/boards', condition)
    },

    /**
     * 카테고리 목록을 가져오는 함수
     *
     * @returns {{data: null, error: null}} - 카테고리 목록
     * @throws {Error} - 실패 시 에러를 던짐
     */
    fetchCategories() {
        return useGetApi('/api/categories', '/boards')
    },
};

export default DataService;
