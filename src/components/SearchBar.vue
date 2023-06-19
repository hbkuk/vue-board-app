<template>
  <div class="container">
    <div class="row">
      <div class="col-3 d-flex justify-content-start">
        <input class="currentDate" type="date" v-model="startDate" placeholder="시작 날짜"/> &nbsp;
        <input class="currentDate" type="date" v-model="endDate" placeholder="끝 날짜"/>
      </div>
      <div class="col-9 d-flex justify-content-end">
        <select class="form-select me-2" v-model="categoryIdx" aria-label="Default select example"
                style="max-width: 150px;">
          <option value="0" selected>모든 카테고리</option>
          <option v-for="category in categories" :value="category.categoryIdx" :key="category.categoryIdx">
            {{ category.name }}
          </option>
        </select>
        <input class="form-control me-2" type="text" v-model="keyword" placeholder="게시글 검색"
               style="max-width: 300px;">
        <button class="btn btn-primary text-nowrap" @click="search">검색</button>&nbsp;
        <button class="btn btn-danger text-nowrap" @click="cleanSearch">검색 초기화</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import store from "@/script/store";
import queryHelper from "@/script/queryHelper";
import DataService from "@/service/DataService";
import router from "@/router/router";
import lib from "@/script/lib";

export default {
  name: "SearchBar",
  data() {
    return {
      startDate: '',
      endDate: '',
      categoryIdx: '',
      keyword: '',
    };
  },
  created() {
    // 랜더링 되기 전에 전역 저장소의 searchCondition 값을 가져와 data에 설정합니다.
    const searchCondition = store.state.searchCondition;
    this.startDate = searchCondition.startDate;
    this.endDate = searchCondition.endDate;
    this.categoryIdx = searchCondition.categoryIdx;
    this.keyword = searchCondition.keyword;
  },
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    ...mapActions(['updateBoards', 'updatePagination']),
    fetchBoard(query) {
      DataService.fetchBoards(query)
          .then((res) => {
            this.$store.dispatch('updateSearchCondition', query);
            this.$store.dispatch('updateBoards', res.boards);
            this.$store.dispatch('updatePagination', res.pagination);
          })
          .catch((error) => {
            console.error("Failed to fetch boards:", error);
            router.push("/error");
          });
    },
    search() {
      let searchCondition = {
        startDate: this.startDate,
        endDate: this.endDate,
        categoryIdx: this.categoryIdx,
        keyword: this.keyword
      }

      const filteredQuery = queryHelper.filteredSearchConditionParams(searchCondition);
      this.fetchBoard(filteredQuery);
    },
    cleanSearch() {
      this.startDate = lib.getPastDate(365);
      this.endDate = lib.getCurrentDate();
      this.categoryIdx = 0;
      this.keyword = null;

      let searchCondition = null;
      this.fetchBoard(queryHelper.filteredSearchConditionParams(searchCondition));
    },
  },
};
</script>

