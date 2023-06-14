<template>
  <SearchBar :categories="state.categories"/>
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
      <tr v-for="(item, idx) in state.boards" :key="idx">
        <td class="col-md-1">{{ item.categoryIdx }}</td>
        <td class="col-md-1"> O</td>
        <td class="col-md-4">
          <router-link class="text-decoration-none text-dark font-weight-bold" :to="`/board/${item.boardIdx}`">
            {{ item.title }}
          </router-link>
        </td>
        <td class="col-md-1">{{ item.writer }}</td>
        <td class="col-md-1">{{ item.hit }}</td>
        <td class="col-md-2">{{ item.regDate }}</td>
        <td class="col-md-2">{{ item.modDate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <Pagination/>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import store from "@/script/store";
import {generateSearchParams} from "@/script/searchCondition";

export default {
  name: "Boards",
  components: {SearchBar, Pagination},
  setup() {
    const state = reactive({
      boards: [],
      categories: [],
    })

    const params = generateSearchParams(store.state.searchCondition);
    axios.get("/api/boards", {params}).then(({data}) => {
      state.boards = data;
    });

    axios.get("/api/categories").then(({data}) => {
      state.categories = data.map(category => ({
        categoryIdx: category.categoryIdx,
        code: category.code,
        name: category.name
      }));
    });

    return {state};
  }

}

</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>