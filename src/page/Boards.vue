<script setup>
import {ref} from 'vue'
import SearchBar from "@/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";
import lib from "@/script/lib";
import DataService from "@/service/DataService";
import {useInitialCondition} from "@/composable/InitialCondition";
import router from "@/router/router";
import WelcomeBanner from "@/components/WelcomeBanner.vue";

/** 검색 조건을 담는 변수 */
const condition = ref({
  startDate: lib.getPastDate(365),
  endDate: lib.getCurrentDate(),
  categoryIdx: null,
  keyword: null,
  pageNo: 1
})

Object.assign(condition.value, useInitialCondition(router, sessionStorage)); // 초기 검색 조건을 condition 값에 할당

const { data: boardsData, error: boardsError } = DataService.fetchBoards(condition)
const { data: categoriesData, error: categoriesError } = DataService.fetchCategories()
</script>

<template>
  <WelcomeBanner :title="`커뮤니티`"
                 :subTitle="`다양한 사람을 만나고 생각의 폭을 넓혀보세요.`"
                 class="mb-3"/>
  <template v-if="categoriesData !== null">
    <SearchBar :categories="categoriesData.categories"
               :condition="condition"
               @updateSearchCondition="(updateSearchCondition) => condition = updateSearchCondition"/>
  </template>
  <div class="container mt-3 mb-3">
    <router-link class="btn btn-primary font-weight-bold btn-sm" :to="`/board/write`"><i class="fa-solid fa-pen"></i> 게시글 작성</router-link>
  </div>
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
            <td class="col-md-1" v-if="board.files.length !== 0"><i class="fa-regular fa-folder-closed"></i></td>
            <td class="col-md-1" v-else><i class="fa-regular fa-file-excel"></i></td>
            <td class="col-md-4">
              <router-link class="text-decoration-none text-dark font-weight-bold" :to="`/board/${board.boardIdx}`">
                {{ board.title }}
              </router-link>
            </td>
            <td class="col-md-1">{{ board.writer }}</td>
            <td class="col-md-1">{{ board.hit }}</td>
            <td class="col-md-2">{{ lib.formatDate(board.regDate) }}</td>
            <td class="col-md-2">{{ board.modDate !== null ? lib.formatDate(board.modDate) : '' }}</td>
          </tr>
        </template>
        <template v-else-if="boardsError !== null">
          <tr>
            <td colspan="7">
              <div class="alert alert-danger text-center" role="alert">
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