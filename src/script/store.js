import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            searchCondition: {
                startDate: "",
                endDate: "",
                categoryIdx: "0",
                keyword: ""
            },
            boards: [],
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
        setCategories(state, payload) {
            state.categories = payload;
        }
    }
})

export default store;