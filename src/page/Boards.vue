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
  <Pagination/>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import DataService from "@/service/DataService";
import router from "@/router/router";
import {mapActions, mapState} from "vuex";
import queryHelper from "@/script/queryHelper";

export default {
  name: "Boards",
  computed: {
    ...mapState( ['boards', 'searchCondition'] ),
  },
  components: {SearchBar, Pagination},
  created() {
    /**
     * 컴포넌트가 생성되었을 때 실행되는 로직입니다.
     * 초기 데이터를 가져오고 상태를 업데이트합니다.
     * @returns {void}
     */
    this.fetchData();
  },
  methods: {
    ...mapActions(['updateSearchCondition', 'updateBoards', 'updatePagination', 'updateCategories']),
    fetchData() {

      const parsedQuery = queryHelper.parseSearchConditionParams(this.searchCondition, router.currentRoute.value.query);
      const filteredQuery = queryHelper.filteredSearchConditionParams(parsedQuery);

      DataService.fetchBoards(filteredQuery)
          .then((res) => {
            this.$store.dispatch('updateSearchCondition', filteredQuery);
            this.$store.dispatch('updateBoards', res.boards);
            this.$store.dispatch('updatePagination', res.pagination);
          })
          .catch(error => {
            console.error("Failed to fetch data:", error);
            router.push("/error");
          });

      DataService.fetchCategories()
          .then((res) => {
            this.$store.dispatch('updateCategories', res.categories);
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