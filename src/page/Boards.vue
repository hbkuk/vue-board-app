<script setup>
import {ref} from 'vue'
import SearchBar from "@/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";
import dateUtils from "@/script/DateUtils";
import DataService from "@/service/DataService";
import {useInitialCondition} from "@/composable/InitialCondition";
import router from "@/router/router";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import BoardTable from "@/components/BoardTable.vue";
import Error from "@/components/Error.vue";
import Spinner from "@/components/Spinner.vue";
import {useFilterParams} from "@/composable/filterParams";

/** 초기 검색 조건을 담는 반응성 객체 */
const initialCondition = ref({
  startDate: dateUtils.getPastDate(365),
  endDate: dateUtils.getCurrentDate(),
  categoryIdx: null,
  keyword: null,
  pageNo: 1
})

/** 현재 라우터의 파라미터와 sessionStorage를 확인해서 속성 덮어쓰기 */
Object.assign(initialCondition.value, useInitialCondition(router, sessionStorage));

const boardsData = ref(null)
const boardsError = ref(null)

/**
 * 검색 실행 함수
 *
 * @param {Record<string, any>} condition - 검색 조건 객체
 * @returns {Promise<void>}
 */
async function searchBoards(condition) {
  const {data, error} = await DataService.fetchBoards(condition)
  boardsData.value = data
  boardsError.value = error

  window.history.pushState(null, "", `/boards?${objectToQueryString(useFilterParams(condition))}`)
  sessionStorage.setItem('condition', JSON.stringify(useFilterParams(condition)))
}

/**
 * 페이지 변경 함수
 *
 * @param {number} changePageNo - 변경된 페이지 번호
 */
function changePage(pageNo) {
  initialCondition.value.pageNo = pageNo
  searchBoards(initialCondition.value)
}

/**
 * 객체를 쿼리스트링으로 변환하는 함수
 *
 * @param {Record<string, any>} obj - 변환할 객체
 * @returns {string} - 변환된 쿼리스트링
 */
function objectToQueryString(obj) {
  const queryParams = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== null && obj[key] !== undefined) {
      queryParams.append(key, obj[key]);
    }
  }
  return queryParams.toString();
}

searchBoards(initialCondition.value)

</script>
<template>
  <WelcomeBanner :title="`커뮤니티`"
                 :sub-title="`다양한 사람을 만나고 ....`"/>

  <!-- 조건부 렌더링 1: 서버 통신 success -->
  <template v-if="boardsData !== null">
    <SearchBar :condition="initialCondition"
               @search="(updateSearchCondition) => searchBoards(updateSearchCondition)"/>
    <div class="container mt-3 mb-3">
      <router-link class="btn btn-primary font-weight-bold btn-sm" :to="`/board/write`"><i class="fa-solid fa-pen"></i>
        게시글 작성
      </router-link>
    </div>
    <div class="boards text-center">
      <BoardTable :boards="boardsData"/>
    </div>
    <Pagination :pagination="boardsData.pagination"
                @changePageNo="(changePageNo) => changePage(changePageNo)" />
  </template>

  <!-- 조건부 렌더링 2: 서버 통신 fail -->
  <template v-else-if="boardsError !== null">
    <Error :error="boardsError" />
  </template>

  <!-- 조건부 렌더링 3: 서버 통신 delay -->
  <template v-else>
    <Spinner msg="게시글 가져오는 중 ..." />
  </template>
</template>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>