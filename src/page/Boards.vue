<script setup>
import {ref} from 'vue'
import SearchBar from "@/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";
import Error from "@/components/Error.vue";
import DataService from "@/service/DataService";
import router from "@/router/router";
import lib from "@/script/lib";

/** 게시글 목록을 담는 변수 */
const boards = ref([])

/** 카테고리 목록을 담는 변수 */
const categories = ref([])

/** 페이지 조건을 담는 변수 */
const pagination = ref({})

/** 검색 조건을 담는 변수 */
const condition = ref({
  startDate: lib.getPastDate(365),
  endDate: lib.getCurrentDate(),
  categoryIdx: null,
  keyword: null,
})

/** 에러 메시지를 담는 변수 */
const errorMessage = ref(null);

// 현재 url에 검색조건 추출
const currentRouteCondition = filteredCondition(router.currentRoute.value.query);

// sessionStorage에서 검색조건 추출
const serializedCondition = JSON.parse(sessionStorage.getItem('condition'));

if (currentRouteCondition && Object.keys(currentRouteCondition).length !== 0) {
  Object.assign(condition.value, currentRouteCondition);
} else if (serializedCondition && Object.keys(serializedCondition).length !== 0) {
  Object.assign(condition.value, serializedCondition);
}

fetchBoards(condition.value)
fetchCategories()

/**
 * 게시글 목록을 조회하는 함수
 * @param {object} newCondition 조회할 검색 조건
 */
function fetchBoards(newCondition) {
  DataService.fetchBoards(filteredCondition(newCondition))
      .then(data => {
        boards.value = data.boards
        pagination.value = data.pagination
        errorMessage.value = null
        condition.value = newCondition
        sessionStorage.setItem('condition', JSON.stringify(filteredCondition(newCondition)))
      })
      .catch(err => {
        errorMessage.value = err
        errorMessage.value = err.response.data.detail
      });
}

/**
 * 카테고리 목록을 조회하는 함수
 */
function fetchCategories() {
  DataService.fetchCategories()
      .then(data => {
        categories.value = data.categories
      })
      .catch(error => {
        // 에러 처리 로직
      });
}

/**
 *
 * 검색 조건을 업데이트하는 함수
 * @param {object} newSearchCondition 업데이트할 검색 조건
 */
function updateSearchCondition(searchCondition) {
  condition.value.pageNo = 1
  fetchBoards(searchCondition)
}

function changePageNo(changePageNo) {
  condition.value.pageNo = changePageNo
  fetchBoards(condition.value)
}

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
function filteredCondition(searchCondition) {
  return Object.entries(searchCondition || {})
      .filter(([key, value]) => value !== null)
      .reduce((params, [key, value]) => {
        params[key] = value;
        return params;
      }, {});
}

</script>

<template>
  <SearchBar :categories="categories"
             :searchCondition="condition"
             @updateSearchCondition="updateSearchCondition"/>
  <Error v-if="errorMessage" :error="errorMessage"/>
  <div class="boards text-center">
    <table class="table center table-hover" style="max-width: 1280px;">
      <thead class="thead-dark">
      <tr>
        <th>카테고리</th>
        <th>파일첨부</th>
        <th>제목</th>
        <th>작성자</th>
        <th>조회수</th>
        <th>등록 일시</th>
        <th>수정 일시</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(board, index) in boards" :key="index">
        <td class="col-md-1">{{ board.categoryName }}</td>
        <td class="col-md-1"> O</td>
        <td class="col-md-4">
          <router-link class="text-decoration-none text-dark font-weight-bold" :to="`/board/${board.boardIdx}`">
            {{ board.title }}
          </router-link>
        </td>
        <td class="col-md-1">{{ board.writer }}</td>
        <td class="col-md-1">{{ board.hit }}</td>
        <td class="col-md-2">{{ board.regDate }}</td>
        <td class="col-md-2">{{ board.modDate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pagination="pagination"
              @changePageNo="changePageNo"/>
</template>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>