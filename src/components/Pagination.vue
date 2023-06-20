<script setup>
import {computed, defineProps} from 'vue';

const props = defineProps({
  pagination: Object,
});

const filteredPages = computed(() => {
  const range = 2; // 현재 페이지를 기준으로 표시할 양쪽 페이지 수
  const currentPage = props.pagination.pageNo;
  const maxPage = props.pagination.maxPage;
  const startPage = Math.max(1, currentPage - range);
  const endPage = Math.min(maxPage, currentPage + range);
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

// 페이지 변경 이벤트 처리
const changePage = (page) => {
  if (page === 'prev') {
    console.log( '이전' )
  } else if (page === 'next') {
    console.log( '다음' )
  } else {
    console.log( '그외' )
  }
};
</script>

<template>
  <div class="pos-relative d-flex justify-content-center mt-5">
    <ul class="pagination pagination-sm">
      <li :class="['page-item', { 'disabled': pagination.pageNo === 1 }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage(1)">처음</a>
      </li>
      <li :class="['page-item', { 'disabled': pagination.pageNo === 1 }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage('prev')">이전</a>
      </li>
      <li v-for="page in filteredPages " :class="['page-item', { 'active': page === pagination.pageNo }]" :key="page">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li :class="['page-item', { 'disabled': pagination.pageNo === pagination.maxPage }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage('next')">다음</a>
      </li>
      <li :class="['page-item', { 'disabled': pagination.pageNo === pagination.maxPage }]">
        <a class="page-link border-0 mx-1 pg-font-sm" href="#" @click.prevent="changePage(pagination.maxPage)">끝</a>
      </li>
    </ul>
  </div>
</template>
