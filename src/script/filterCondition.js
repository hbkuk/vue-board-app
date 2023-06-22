/**
 * null 값을 제외한 필터링된 검색 조건 반환
 *
 * @param {Object} searchCondition - 검색 조건 객체
 * @returns {Object} - 필터링된 검색 조건 객체
 * @example
 *
 * // 예시 1: 검색 조건에서 null 값을 제외하여 필터링합니다.
 * const searchCondition = {
 *   startDate: '2023-01-01',
 *   endDate: null,
 *   categoryIdx: '1',
 *   keyword: null,
 *   pageNo: 1
 * };
 *
 * const filteredParams = filteredSearchCondition(searchCondition);
 * filteredParams: { startDate: '2023-01-01', categoryIdx: '1', pageNo: 1 }
 */
export function useFilterCondition(parameter) {
    return Object.entries(parameter || {})
        .filter(([key, value]) => value !== null)
        .reduce((params, [key, value]) => {
            params[key] = value;
            return params;
        }, {});
}