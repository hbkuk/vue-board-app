<template>
  <div class="container">
    <div class="row">
      <div class="col-3 d-flex justify-content-start">
        <input class="currentDate" type="date" v-model="searchCondition.startDate" placeholder="시작 날짜" /> &nbsp;
        <input class="currentDate" type="date" v-model="searchCondition.endDate" placeholder="끝 날짜" />
      </div>
      <div class="col-9 d-flex justify-content-end">
        <select class="form-select me-2" v-model="searchCondition.categoryIdx" aria-label="Default select example"
                style="max-width: 150px;">
          <option value="0" selected>모든 카테고리</option>
          <option v-for="category in categories" :value="category.categoryIdx" :key="category.categoryIdx">
            {{ category.name }}
          </option>
        </select>
        <input class="form-control me-2" type="text" v-model="searchCondition.keyword" placeholder="게시글 검색"
               style="max-width: 300px;">
        <button class="btn btn-primary text-nowrap" @click="search">검색</button>&nbsp;
        <button class="btn btn-danger text-nowrap" @click="searchReset">검색 초기화</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import store from "@/script/store";
import lib from "@/script/lib";
import DataService from "@/service/DataService";
import router from "@/router/router";
import storeHelper from "@/script/storeHelper";

export default {
  name: "SearchBar",
  computed: {
    categories() {
      return store.getters.getCategories;
    },
  },
  setup() {
    const searchCondition = reactive(store.state.searchCondition);

    const fetchData = () => {
      DataService.fetchBoards(store.state.searchCondition)
          .then((res) => {
            store.commit("setBoards", res.boards);
            store.commit("setPagination", res.pagination);
          })
          .catch((error) => {
            console.error("Failed to fetch boards:", error);
            router.push("/error");
          });
    };

    const search = () => {
      const searchCondition = store.state.searchCondition;
      searchCondition.pageNo = 1;
      storeHelper.commitSearchConditionToStore(searchCondition);

      fetchData();
    };

    const searchReset = () => {
      storeHelper.defaultSearchConditionToStore();

      fetchData();
    };

    return { searchCondition, search, searchReset };
  },
};
</script>

