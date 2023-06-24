import {useGetApiWithParams} from "@/composable/fetch/getApiWithParams";
import {useGetApi} from "@/composable/fetch/getApi";
import {usePutApi} from "@/composable/fetch/putApi";
import {usePostApi} from "@/composable/fetch/postApi";

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
     * 게시물 정보를 가져오는 함수
     *
     * @param boardIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchBoard(boardIdx) {
        return useGetApi(`/api/board/${boardIdx}`)
    },

    /**
     * 게시물 작성을 위한 데이터를 가져오는 함수
     *
     * @param boardIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchWriteBoard() {
        return useGetApi('/api/board/write')
    },

    /**
     * 게시물 작성을 위한 데이터를 가져오는 함수
     *
     * @param boardIdx 게시물 번호
     * @returns {{data, error}}
     */
    fetchModifyBoard(boardIdx) {
        return useGetApi(`/api/board/modify/${boardIdx}`)
    },

    /**
     * 게시물 작성을 위한 요청 함수
     *
     * @param formData 요청 데이터
     */
    fetchWriteAction(formData) {
        return usePostApi(`/api/board`, `/board/`, formData)
    },

    /**
     * 게시물 수정을 위한 요청 함수
     *
     * @param boardIdx 게시물 번호
     * @param formData 요청 데이터
     */
    fetchModifyAction(boardIdx, formData) {
        return usePutApi(`/api/board/${boardIdx}`, `/board/${boardIdx}`, formData)
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
