<template>
  <div class="pos-relative d-flex justify-content-center mt-5">
    <ul class="pagination pagination-sm">
      <li :class="['page-item', { 'disabled': pagination.pageNo === 1 }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="change(1)">처음</a>
      </li>
      <li :class="['page-item', { 'disabled': pagination.pageNo === 1 }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="change('prev')">이전</a>
      </li>
      <li
          v-for="page in filteredPages"
          :class="['page-item', { 'active': page === pagination.pageNo }]"
          :key="page"
      >
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="change(page)">{{ page }}</a>
      </li>
      <li :class="['page-item', { 'disabled': pagination.pageNo === pagination.maxPage }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="change('next')">다음</a>
      </li>
      <li :class="['page-item', { 'disabled': pagination.pageNo === pagination.maxPage }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="change(pagination.maxPage)">끝</a>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "@/script/store";
import DataService from "@/service/DataService";
import router from "@/router/router";
import {mapMutations, mapState} from "vuex";
import queryHelper from "@/script/queryHelper";

export default {
  name: 'Pagination',
  computed: {
    ...mapState(['pagination']),
    filteredPages() {
      const { startPage, endPage, maxPage } = this.pagination;
      return Array.from({ length: Math.min(endPage, maxPage) - startPage + 1 }, (_, index) => startPage + index);
    },
  },
  methods: {
    ...mapMutations(['updateSearchCondition']),
    change(direction) {
      const searchCondition = store.state.searchCondition;
      searchCondition.pageNo = direction === "prev" ? this.pagination.pageNo - 1 : direction === "next" ? this.pagination.pageNo + 1 : direction;

      const filteredQuery = queryHelper.filteredSearchConditionParams(searchCondition);

      DataService.fetchBoards(filteredQuery)
          .then((res) => {
            this.updateSearchCondition(filteredQuery);
            store.commit("setBoards", res.boards);
            store.commit("setPagination", res.pagination);
          })
          .catch((error) => {
            console.error("Failed to fetch boards:", error);
            router.push("/error");
          });
    },
  },
};
</script>
