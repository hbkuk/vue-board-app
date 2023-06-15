import {createStore} from 'vuex'
import lib from "@/script/lib";

const store = createStore({
    state() {
        return {
            searchCondition: {
                startDate: lib.getPastDate(365),
                endDate: lib.getCurrentDate(),
                categoryIdx: "0",
                keyword: "",
                pageNo: "",
            },
            boards: [],
            pagination: {},
            categories: [],
        }
    },
    mutations: {
        setStartDate(state, payload) {
            state.searchCondition.startDate = payload;
            sessionStorage.setItem("startDate", payload);
        },
        setEndDate(state, payload) {
            state.searchCondition.endDate = payload;
            sessionStorage.setItem("endDate", payload);
        },
        setCategoryIdx(state, payload) {
            state.searchCondition.categoryIdx = payload;
            sessionStorage.setItem("categoryIdx", payload);
        },
        setKeyword(state, payload) {
            state.searchCondition.keyword = payload;
            sessionStorage.setItem("keyword", payload);
        },
        setPageNo(state, payload) {
            state.searchCondition.pageNo = payload;
            sessionStorage.setItem("pageNo", payload);
        },
        setBoards(state, payload) {
            state.boards = payload;
        },
        setPagination(state, payload) {
            state.pagination = payload;
        },
        setCategories(state, payload) {
            state.categories = payload;
        }
    },
})

export default store;