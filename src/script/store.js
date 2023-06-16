import { createStore } from 'vuex';
import lib from "@/script/lib";

/**
 * Vuex 스토어를 생성합니다.
 */
const store = createStore({
    state() {
        return {
            searchCondition: {
                startDate: lib.getPastDate(365),
                endDate: lib.getCurrentDate(),
                categoryIdx: "0",
                keyword: "",
                pageNo: "1",
            },
            boards: [],
            pagination: {},
            categories: {},
        }
    },
    mutations: {
        updateSearchCondition(state, payload) {
            state.searchCondition = payload;
            sessionStorage.setItem("searchCondition", JSON.stringify(payload));
        },
        /**
         * 게시물 목록을 설정합니다.
         *
         * @param {object} state - Vuex 상태 객체
         * @param {array} payload - 게시물 목록
         */
        setBoards(state, payload) {
            state.boards = payload;
        },
        /**
         * 페이지네이션 정보를 설정합니다.
         *
         * @param {object} state - Vuex 상태 객체
         * @param {object} payload - 페이지네이션 정보
         */
        setPagination(state, payload) {
            state.pagination = payload;
        },
        /**
         * 카테고리 목록을 설정합니다.
         *
         * @param {object} state - Vuex 상태 객체
         * @param {array} payload - 카테고리 목록
         */
        setCategories(state, payload) {
            state.categories = payload;
        }
    },
});

export default store;
