<template>
  <div class="pos-relative d-flex justify-content-center mt-5">
    <ul class="pagination pagination-sm">
      <li :class="['page-item', { 'disabled': $store.state.pagination.pageNo === 1 }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click="change(1)">처음</a>
      </li>
      <li :class="['page-item', { 'disabled': $store.state.pagination.pageNo === 1 }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click="change($store.state.pagination.pageNo - 1)">이전</a>
      </li>
      <li
          v-for="page in filteredPages"
          :class="['page-item', { 'active': page === $store.state.pagination.pageNo }]"
          :key="page"
      >
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click="change(page)">{{ page }}</a>
      </li>
      <li :class="['page-item', { 'disabled': $store.state.pagination.pageNo === $store.state.pagination.maxPage }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click="change($store.state.pagination.pageNo + 1)">다음</a>
      </li>
      <li :class="['page-item', { 'disabled': $store.state.pagination.pageNo === $store.state.pagination.maxPage }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click="change($store.state.pagination.maxPage)">끝</a>
      </li>
    </ul>
  </div>
</template>


<script>
import {generateSearchParams} from "@/script/searchCondition";
import store from "@/script/store";
import axios from "axios";

export default {
  name: 'Pagination',
  computed: {
    filteredPages() {
      const { startPage, endPage, maxPage } = this.$store.state.pagination;
      if (endPage !== maxPage) {
        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
      } else {
        return Array.from({ length: Math.min(maxPage, startPage + 9) - startPage + 1 }, (_, index) => startPage + index);
      }
    },
  },
  setup() {
    const change = (pageNo) => {
      store.commit("setPageNo", pageNo)
      const params = generateSearchParams(store.state.searchCondition);
      axios.get("/api/boards", {params}).then(({data}) => {
        store.commit('setBoards', data.boards);
        store.commit('setPagination', data.pagination);
      });
    }
    return {change};
  }
};
</script>
