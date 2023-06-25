<script setup>
import dateUtils from "@/script/DateUtils";
import {defineProps} from "vue";

const props = defineProps({
  boards: Object,
});
</script>
<template>
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
      <template v-if="boards !== null">
        <tr v-if="boards.boards.length === 0">
          <td colspan="7" class="text-center">게시글이 없습니다.</td>
        </tr>
        <tr v-else v-for="(board, index) in boards.boards" :key="index">
          <td class="col-md-1">{{ board.categoryName }}</td>
          <td class="col-md-1" v-if="board.files.length !== 0"><i class="fa-regular fa-folder-closed"></i></td>
          <td class="col-md-1" v-else><i class="fa-regular fa-file-excel"></i></td>
          <td class="col-md-4">
            <router-link class="text-decoration-none text-dark font-weight-bold" :to="`/board/${board.boardIdx}`">
              {{ board.title }}
            </router-link>
          </td>
          <td class="col-md-1">{{ board.writer }}</td>
          <td class="col-md-1">{{ board.hit }}</td>
          <td class="col-md-2">{{ dateUtils.formatDate(board.regDate) }}</td>
          <td class="col-md-2">{{ board.modDate !== null ? dateUtils.formatDate(board.modDate) : '' }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>