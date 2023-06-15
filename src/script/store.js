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
        /**
         * 검색 시작 날짜를 설정합니다.
         *
         * @param {object} state - Vuex 상태 객체
         * @param {string} payload - 시작 날짜
         */
        setStartDate(state, payload) {
            state.searchCondition.startDate = payload;
            sessionStorage.setItem("startDate", payload);
        },
        /**
         * 검색 종료 날짜를 설정합니다.
         *
         * @param {object} state - Vuex 상태 객체
         * @param {string} payload - 종료 날짜
         */
        setEndDate(state, payload) {
            state.searchCondition.endDate = payload;
            sessionStorage.setItem("endDate", payload);
        },
        /**
         * 카테고리 인덱스를 설정합니다.
         *
         * @param {object} state - Vuex 상태 객체
         * @param {string} payload - 카테고리 인덱스
         */
        setCategoryIdx(state, payload) {
            state.searchCondition.categoryIdx = payload;
            sessionStorage.setItem("categoryIdx", payload);
        },
        /**
         * 키워드를 설정합니다.
         *
         * @param {object} state - Vuex 상태 객체
         * @param {string} payload - 키워드
         */
        setKeyword(state, payload) {
            state.searchCondition.keyword = payload;
            sessionStorage.setItem("keyword", payload);
        },
        /**
         * 페이지 번호를 설정합니다.
         *
         * @param {object} state - Vuex 상태 객체
         * @param {string} payload - 페이지 번호
         */
        setPageNo(state, payload) {
            state.searchCondition.pageNo = payload;
            sessionStorage.setItem("pageNo", payload);
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
    getters: {
        /**
         * 상태에서 게시판 목록을 가져옵니다.
         *
         * @param {object} state - Vuex 상태 객체입니다.
         * @returns {Array} - 게시판 배열입니다.
         */
        getBoards: state => {
            return state.boards;
        },
        /**
         * 상태에서 카테고리 목록을 가져옵니다.
         *
         * @param {object} state - Vuex 상태 객체입니다.
         * @returns {Array} - 카테고리 배열입니다.
         */
        getCategories: state => {
            return state.categories;
        },
    },

});

export default store;
