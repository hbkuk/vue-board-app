<script setup>
import { reactive } from "vue";
import lib from "@/script/lib";

const emit = defineEmits(['updateSearchCondition', 'initSearchCondition'])

const props = defineProps({
  categories: Array,
})

const searchCondition = reactive({
  startDate: lib.getPastDate(365),
  endDate: lib.getCurrentDate(),
  categoryIdx: "0",
  keyword: "",
});

emit('initSearchCondition', searchCondition)

/**
 * 검색 조건을 초기화합니다.
 * @function
 * @returns {void}
 */
const cleanSearchCondition = () => {
  searchCondition.startDate = lib.getPastDate(365);
  searchCondition.endDate = lib.getCurrentDate();
  searchCondition.categoryIdx = "0";
  searchCondition.keyword = "";
  emit('updateSearchCondition', searchCondition)
};

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-3 d-flex justify-content-start">
        <input class="currentDate" type="date" v-model="searchCondition.startDate" placeholder="시작 날짜"/> &nbsp;
        <input class="currentDate" type="date" v-model="searchCondition.endDate" placeholder="끝 날짜"/>
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
        <button class="btn btn-primary text-nowrap" @click="$emit('updateSearchCondition', searchCondition)">검색</button>&nbsp;
        <button class="btn btn-danger text-nowrap" @click="cleanSearchCondition">검색 초기화</button>
      </div>
    </div>
  </div>
</template>
