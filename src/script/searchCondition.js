export const generateSearchParams = (searchCondition) => {
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

    return params;
};
