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
        }
    }
})

export default store;