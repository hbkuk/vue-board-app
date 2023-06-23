<script setup>
import lib from "../script/lib";

const props = defineProps({
  comments: Array
});
</script>

<template>
  <div class="comments mt-5">
    <div class="add-comment mt-5">
      <div class="form-outline mb-2">
        <textarea class="form-control mt-2" rows="5" id="comment" name="text" placeholder="댓글 입력 ..."></textarea>
      </div>
      <div class="mb-4 text-end">
        <button type="button" class="btn btn-primary btn-sm">댓글 등록</button>
      </div>
    </div>

    <div class="comment-list">
      <div class="card mb-4 card-comment" v-for="comment in comments" :key="comment.id">
        <div class="card-body">
          <p>{{ comment.content }}</p>

          <div class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" alt="avatar" width="25"
                   height="25"/>
              <p class="small mb-0 ms-2">{{ comment.writer }}</p>
            </div>
            <div class="d-flex flex-row align-items-center">
              <i class="bi bi-chevron-up mx-2"></i>
              <p class="small text-muted mb-0">{{ lib.formatDate(comment.regDate) }}</p><i
                class="ms-2 bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>