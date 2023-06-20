<script setup>
import {onMounted, ref} from 'vue'
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import DataService from "@/service/DataService";

const boards = ref([])
const categories = ref([])
const pagination = ref({})
const searchCondition = ref({})

onMounted(() => {
  DataService.fetchBoards(searchCondition.value)
      .then(data => {
        boards.value = data.boards
        pagination.value = data.pagination
      })
      .catch(error => {
        // 에러 처리 로직
      });
  DataService.fetchCategories()
      .then(data => {
        categories.value = data.categories
      })
      .catch(error => {
        // 에러 처리 로직
      });
})

function updateSearchCondition(searchCondition) {
  DataService.fetchBoards(searchCondition)
      .then(data => {
        boards.value = data.boards
        pagination.value = data.pagination
      })
      .catch(error => {
        // 에러 처리 로직
      });
}

</script>

<template>
  <SearchBar :categories="categories"
             @updateSearchCondition="updateSearchCondition"
             @initSearchCondition="(initSearchCondition) => searchCondition = initSearchCondition" />
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
  <Pagination :pagination="pagination"/>
</template>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>