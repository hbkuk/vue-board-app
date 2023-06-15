export default {
    /**
     * 검색 조건 객체에서 검색 파라미터를 필터링하고 추출합니다.
     *
     * @param {object} searchCondition - 검색 조건 객체
     * @returns {object} - 필터링된 검색 파라미터
     */
    filteredSearchParams(searchCondition) {
        const params = {};

        if (searchCondition.startDate) {
            params.startDate = searchCondition.startDate;
        }

        if (searchCondition.endDate) {
            params.endDate = searchCondition.endDate;
        }

        if (searchCondition.categoryIdx !== "0") {
            params.categoryIdx = searchCondition.categoryIdx;
        }

        if (searchCondition.keyword) {
            params.keyword = searchCondition.keyword;
        }

        if (searchCondition.pageNo) {
            params.pageNo = searchCondition.pageNo;
        }

        return params;
    },

    /**
     *  쿼리 파라미터를 사용하여 SearchCondition을 업데이트하는 메서드
     *
     * @param {object} queryString - 쿼리 문자열 파라미터
     * @param {object} searchCondition - 변경할 SearchCondition 객체
     */
    updateSearchConditionWithQueryParams(queryString, searchCondition) {
        if (queryString) {
            if(queryString.startDate) {
                searchCondition.startDate = queryString.startDate;
            }
            if(queryString.endDate) {
                searchCondition.endDate = queryString.endDate;
            }
            if(queryString.categoryIdx) {
                searchCondition.categoryIdx = queryString.categoryIdx;
            }
            if(queryString.keyword !== "" && queryString.keyword) {
                searchCondition.keyword = queryString.keyword;
            }
            if(queryString.pageNo) {
                searchCondition.pageNo = queryString.pageNo;
            }
        }
    }
};