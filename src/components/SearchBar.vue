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
          <option v-for="category in $store.state.categories" :value="category.categoryIdx" :key="category.categoryIdx">
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
import {generateSearchParams} from "@/script/searchCondition";
import axios from "axios";
import lib from "@/script/lib";

export default {
  name: "SearchBar",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const searchCondition = reactive(store.state.searchCondition);

    const search = () => {
      const { startDate, endDate, categoryIdx, keyword, pageNo } = searchCondition;
      store.commit('setStartDate', startDate);
      store.commit('setEndDate', endDate);
      store.commit('setCategoryIdx', categoryIdx);
      store.commit('setKeyword', keyword);
      store.commit('setPageNo', pageNo);
      sessionStorage.setItem("startDate", startDate);
      sessionStorage.setItem("endDate", endDate);
      sessionStorage.setItem("categoryIdx", categoryIdx);
      sessionStorage.setItem("keyword", keyword);
      sessionStorage.setItem("pageNo", pageNo);

      const params = generateSearchParams(store.state.searchCondition);
      axios.get("/api/boards", {params}).then(({data}) => {
        store.commit('setBoards', data.boards);
        store.commit('setPagination', data.pagination);
      });
    };

    const searchReset = () => {
      store.commit('setStartDate', lib.getPastDate(365));
      store.commit('setEndDate', lib.getCurrentDate());
      store.commit('setCategoryIdx', "0");
      store.commit('setKeyword', "");
      store.commit('setPageNo', "");
      sessionStorage.removeItem("startDate");
      sessionStorage.removeItem("endDate");
      sessionStorage.removeItem("categoryIdx");
      sessionStorage.removeItem("keyword");
      sessionStorage.removeItem("pageNo");

      const params = generateSearchParams(store.state.searchCondition);
      axios.get("/api/boards", {params}).then(({data}) => {
        store.commit('setBoards', data.boards);
        store.commit('setPagination', data.pagination);
      });
    }

    return { searchCondition, search, searchReset };
  },
};
</script>
