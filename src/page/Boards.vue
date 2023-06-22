<script setup>
import {ref, watch} from 'vue'
import SearchBar from "@/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";
import lib from "@/script/lib";
import DataService from "@/service/DataService";
import router from "@/router/router";

/** 검색 조건을 담는 변수 */
const condition = ref({
  startDate: lib.getPastDate(365),
  endDate: lib.getCurrentDate(),
  categoryIdx: null,
  keyword: null,
  pageNo: 1
})

const { data: boardsData, error: boardsError } = DataService.fetchBoards(condition)
const { data: categoriesData, error: categoriesError } = DataService.fetchCategories()

</script>

<template>
  <template v-if="categoriesData !== null">
    <SearchBar :categories="categoriesData.categories"
               :condition="condition"
               @updateSearchCondition="(updateSearchCondition) => condition = updateSearchCondition"/>
  </template>
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
        <template v-if="boardsData !== null">
          <tr v-if="boardsData.boards.length === 0">
            <td colspan="7" class="text-center">게시글이 없습니다.</td>
          </tr>
          <tr v-else v-for="(board, index) in boardsData.boards" :key="index">
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
        </template>
        <template v-else-if="boardsError !== null">
          <tr>
            <td colspan="7" class="text-center">
              <div class="alert alert-danger" role="alert">
                {{ boardsError.detail }}
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="7" class="text-center">로딩 중...</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <template v-if="boardsData !== null">
    <Pagination :pagination="boardsData.pagination" @changePageNo="(changePageNo) => condition.pageNo = changePageNo"/>
  </template>
</template>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>