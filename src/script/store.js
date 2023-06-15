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
        },
        setEndDate(state, payload) {
            state.searchCondition.endDate = payload;
        },
        setCategoryIdx(state, payload) {
            state.searchCondition.categoryIdx = payload;
        },
        setKeyword(state, payload) {
            state.searchCondition.keyword = payload;
        },
        setBoards(state, payload) {
            state.boards = payload;
        },
        setPagination(state, payload) {
            state.pagination = payload;
        },
        setPageNo(state, payload) {
            state.searchCondition.pageNo = payload;
        },
        setCategories(state, payload) {
            state.categories = payload;
        }
    }
})

export default store;