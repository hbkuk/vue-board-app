<script setup>
import dateUtils from "@/script/DateUtils";
import {defineProps, ref} from "vue";
import Comment from "@/components/Comment.vue";

const props = defineProps({
  boardData: Object,
});

</script>

<template>
  <div class="board bg-white text-dark py-1 text-left">
    <div class="container mt-3">
      <div class="d-flex flex-row mt-3 mb-5">
        <button type="button" class="btn btn-secondary btn-sm" @click="$router.push({name: 'Boards'})"><i class="fa-solid fa-arrow-left"></i> 나가기</button>
      </div>
      <div class="hstack gap-3">
        <div class="vr"></div>
        <span class="fw-bold">{{ boardData.board.categoryName }}</span>
      </div>
    </div>
  </div>

  <div class="container-fluid bg-white">
    <div class="container py-3">
      <div class="row">
        <div class="col-md-12 mb-4">
          <article>
            <div class="post-content">
              <h2 class="title mb-4">{{ boardData.board.title }}</h2>

              <nav style="--bs-breadcrumb-divider: 'ㆍ';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item text-secondary"> {{ boardData.board.writer }} </li>
                  <li class="breadcrumb-item text-secondary">{{ dateUtils.formatDate(boardData.board.regDate) }}</li>
                  <li class="breadcrumb-item text-secondary" v-if="boardData.comments">댓글 {{ boardData.comments.length }}개</li>
                </ol>
              </nav>
              <div class="container p-5 my-5 border border-light rounded">
                <p>{{ boardData.board.content }}</p>
              </div>

              <ul class="list-group list-group-light">
                <li v-for="file in boardData.board.files" :key="file.fileIdx" class="list-group-item list-group-item-action px-3 border-0 ripple">
                  <a :href="`/download/${file.fileIdx}`" class="text-decoration-none text-dark">{{ file.originalName }} ({{ file.fileSize }})</a>
                </li>
              </ul>
              <hr class="my-4"/>
            </div>
          </article>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>

</template>