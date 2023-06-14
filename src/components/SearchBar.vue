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
        <button class="btn btn-primary text-nowrap" @click="search">검색</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import store from "@/script/store";

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
      const { startDate, endDate, categoryIdx, keyword } = searchCondition;
      store.commit('setStartDate', startDate);
      store.commit('setEndDate', endDate);
      store.commit('setCategoryIdx', categoryIdx);
      store.commit('setKeyword', keyword);
    };

    return { searchCondition, search };
  },
};
</script>
