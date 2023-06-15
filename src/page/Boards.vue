<template>
  <SearchBar/>
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
      <tr v-for="(item, idx) in boards" :key="idx">
        <td class="col-md-1">{{ item.categoryName }}</td>
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
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import DataService from "@/service/DataService";
import store from "@/script/store";
import router from "@/router/router";
import queryStringUtils from "@/script/queryStringHelper";

export default {
  name: "Boards",
  computed: {
    boards() {
      return store.getters.getBoards;
    }
  },
  components: {SearchBar, Pagination},
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {

      const searchCondition = this.$store.state.searchCondition;
      queryStringUtils.updateSearchConditionWithQueryParams(router.currentRoute.value.query, searchCondition);

      DataService.fetchBoards(searchCondition)
          .then((res) => {
            store.commit("setBoards", res.boards);
            store.commit("setPagination", res.pagination);
          })
          .catch(error => {
            console.error("Failed to fetch data:", error);
            router.push("/error");
          });

      DataService.fetchCategories()
          .then((res) => {
            store.commit("setCategories", res.categories);
          })
          .catch(error => {
            console.error("Failed to fetch categories:", error);
            router.push("/error");
          });
    }
  }
};
</script>


<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
}
</style>