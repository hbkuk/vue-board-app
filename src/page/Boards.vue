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

/** 초기 검색 조건을 담는 반응성 객체 */
const condition = ref({
  startDate: dateUtils.getPastDate(365),
  endDate: dateUtils.getCurrentDate(),
  categoryIdx: null,
  keyword: null,
  pageNo: 1
})

/** 현재 라우터의 파라미터와 sessionStorage를 확인해서 속성 덮어쓰기 */
Object.assign(condition.value, useInitialCondition(router, sessionStorage));

/** DataService를 사용하여 게시글 목록을 가져옴 */
const {data: boardsData, error: boardsError} = DataService.fetchBoards(condition)
</script>

<template>
  <WelcomeBanner :title="`커뮤니티`"
                 :subTitle="`다양한 사람을 만나고 ....`"/>

  <!-- 조건부 렌더링 1: 서버 통신 success -->
  <template v-if="boardsData !== null">
    <SearchBar :condition="condition"
               @updateSearchCondition="(updateSearchCondition) => condition = updateSearchCondition"/>
    <div class="container mt-3 mb-3">
      <router-link class="btn btn-primary font-weight-bold btn-sm" :to="`/board/write`"><i class="fa-solid fa-pen"></i>
        게시글 작성
      </router-link>
    </div>
    <div class="boards text-center">
      <BoardTable :boards="boardsData"/>
    </div>
    <Pagination :pagination="boardsData.pagination" @changePageNo="(changePageNo) => condition.pageNo = changePageNo"/>
  </template>

  <!-- 조건부 렌더링 2: 서버 통신 fail -->
  <template v-else-if="boardsError !== null">
    <Error :error="boardsError"/>
  </template>

  <!-- 조건부 렌더링 3: 서버 통신 delay -->
  <template v-else>
    <Spinner msg="게시글 가져오는 중 ..."/>
  </template>

</template>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>