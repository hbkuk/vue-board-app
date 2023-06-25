<script setup>
import { ref } from "vue";
import dateUtils from "@/script/DateUtils";

const emit = defineEmits(['updateSearchCondition'])

const props = defineProps({
  categories: Array,
  condition: Object,
})

const searchCondition = ref({
  startDate: props.condition.startDate,
  endDate: props.condition.endDate,
  categoryIdx: props.condition.categoryIdx,
  keyword: props.condition.keyword,
  pageNo: props.condition.pageNo,
});

/**
 * 검색 조건을 초기화합니다.
 * @function
 * @returns {void}
 */
const cleanSearchCondition = () => {
  searchCondition.value.startDate = dateUtils.getPastDate(365);
  searchCondition.value.endDate = dateUtils.getCurrentDate();
  searchCondition.value.categoryIdx = null;
  searchCondition.value.keyword = null;
  searchCondition.value.pageNo = 1;
  emit('updateSearchCondition', searchCondition.value)
};

</script>

<template>
  <template v-if="categories !== null">
    <div class="container">
      <div class="row">
        <div class="col-3 d-flex justify-content-start">
          <input class="currentDate text-center form-control" type="date" v-model="searchCondition.startDate" placeholder="시작 날짜"/> &nbsp;
          <input class="endDate text-center form-control" type="date" v-model="searchCondition.endDate" placeholder="끝 날짜"/>
        </div>
        <div class="col-9 d-flex justify-content-end">
          <select class="form-select me-2 text" v-model="searchCondition.categoryIdx" aria-label="Default select example"
                  style="max-width: 150px;">
            <option :value="null" selected>모든 카테고리</option>
            <option v-for="category in categories" :value="category.categoryIdx" :key="category.categoryIdx">
              {{ category.name }}
            </option>
          </select>
          <input class="form-control me-2" type="text" v-model="searchCondition.keyword" placeholder="게시글 검색"
                 style="max-width: 300px;">
          <button class="btn btn-primary btn-sm text-nowrap" @click="$emit('updateSearchCondition', searchCondition)">검색</button>&nbsp;
          <button class="btn btn-danger btn-sm text-nowrap" @click="cleanSearchCondition">검색 초기화</button>
        </div>
      </div>
    </div>
  </template>
</template>
