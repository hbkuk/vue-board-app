import store from "@/script/store";
import lib from "@/script/lib";

export default {
    /**
     * sessionStorage에서 값을 가져와서 스토어에 커밋합니다.
     *
     * @param {string} key - sessionStorage에서 값을 가져올 키입니다.
     * @param {function} commitFn - 가져온 값을 스토어에 커밋할 함수입니다.
     */
    loadSearchCondition(key, commitFn) {
        const value = sessionStorage.getItem(key);
        if (value) {
            commitFn(value);
        }
    },

    /**
     * SearchCondition 값을 store에 커밋하는 메서드
     *
     * @param {object} searchCondition - 변경할 SearchCondition 객체
     */
    commitSearchConditionToStore(searchCondition) {
        store.commit("setStartDate", searchCondition.startDate);
        store.commit("setEndDate", searchCondition.endDate);
        store.commit("setCategoryIdx", searchCondition.categoryIdx);
        store.commit("setKeyword", searchCondition.keyword);
        store.commit("setPageNo", searchCondition.pageNo);
    },

    defaultSearchConditionToStore() {
        store.commit("setStartDate", lib.getPastDate(365));
        store.commit("setEndDate", lib.getCurrentDate());
        store.commit("setCategoryIdx", "0");
        store.commit("setKeyword", "");
        store.commit("setPageNo", "1");
    },
};