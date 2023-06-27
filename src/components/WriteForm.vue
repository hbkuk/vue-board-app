<script setup>
import {ref} from "vue";

const emit = defineEmits(['useHandleFileUpload', 'submitForm'])

const props = defineProps({
  board: Object
})

const newBoard = ref(props.board);

</script>

<template>
  <form>
    <div class="mb-3">
      <label for="writerInput" class="form-label">작성자</label>
      <input type="text" class="form-control" id="writerInput" placeholder="3글자 이상, 4글자 이하여야 합니다" v-model="newBoard.writer" required minlength="3" maxlength="4">
    </div>

    <div class="mb-3">
      <label for="passwordInput" class="form-label">패스워드</label>
      <input type="password" class="form-control" id="passwordInput" placeholder="문자, 숫자, 특수문자가 포함된 4글자 이상, 15글자 이하여야 합니다" v-model="newBoard.password" required pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{4,15}" autocomplete="off">
    </div>

    <div class="mb-3">
      <label for="titleInput" class="form-label">제목</label>
      <input type="text" class="form-control" id="titleInput" placeholder="4글자 이상, 100글자 이하여야 합니다" v-model="newBoard.title" required minlength="4" maxlength="100">
    </div>

    <div class="mb-3">
      <label for="contentTextarea" class="form-label">내용</label>
      <textarea class="form-control" id="contentTextarea" rows="3" placeholder="4글자 이상, 2000글자 이하여야 합니다" v-model="newBoard.content" required minlength="4" maxlength="2000"></textarea>
    </div>

    <div class="mb-5">
      <label for="formFileMultiple" class="form-label">파일 업로드</label>
      <input class="form-control" type="file" id="formFileMultiple" multiple ref="fileInput"
             @change="$emit(useHandleFileUpload)">
    </div>

    <div class="d-grid gap-2 mt-4">
      <button type="button" class="btn btn-primary" @click="$emit(submitForm, newBoard)"><i class="fa-regular fa-circle-check"></i> 등록
      </button>
    </div>
  </form>
</template>