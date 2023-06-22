import {useGetApiWithParams} from "@/composable/fetch/getApiWithParams";
import {useGetApi} from "@/composable/fetch/getApi";

/**
 * 데이터 서비스 함수
 */
const DataService = {

    /**
     * 게시물 목록을 가져오는 함수
     *
     * @param {object} condition - 조건 정보가 담긴 객체
     * @returns {{data, error}} - 게시판 목록
     */
    fetchBoards(condition) {
        return useGetApiWithParams('/api/boards', '/boards', condition)
    },

    /**
     * 게시물정보를 가져오는 함수
     *
     * @param boardIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchBoard(boardIdx) {
        return useGetApi('/api/board/' + boardIdx , '/board/' + boardIdx )
    },

    /**
     * 카테고리 목록을 가져오는 함수
     *
     * @returns {{data, error}} - 카테고리 목록
     */
    fetchCategories() {
        return useGetApi('/api/categories')
    },
};

export default DataService;
