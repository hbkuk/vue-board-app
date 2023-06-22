<script setup>
import { ref } from 'vue'
import SearchBar from "@/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";
import lib from "@/script/lib";
import { useGetApi } from "@/script/fetch";

/** 검색 조건을 담는 변수 */
const condition = ref({
  startDate: lib.getPastDate(365),
  endDate: lib.getCurrentDate(),
  categoryIdx: null,
  keyword: null,
})

const { data, error } = useGetApi('/api/boards', '/boards', condition)

</script>

<template>
  <SearchBar :categories="categories"
             :condition="condition"
             @updateSearchCondition="(updateSearchCondition) => condition = updateSearchCondition"/>
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
        <template v-if="data !== null">
          <tr v-if="data.boards.length === 0">
            <td colspan="7" class="text-center">게시글이 없습니다.</td>
          </tr>
          <tr v-else v-for="(board, index) in data.boards" :key="index">
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
        <template v-else-if="error !== null">
          <tr>
            <td colspan="7" class="text-center">
              <div class="alert alert-danger" role="alert">
                {{ error.detail }}
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

<!--  <Pagination :pagination="pagination"-->
<!--              @changePageNo="changePageNo"/>-->
</template>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>