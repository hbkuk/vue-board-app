<script setup>
import { ref } from 'vue'
import DataService from "@/service/DataService";
import axios from "axios";
import WelcomeBanner from "@/components/WelcomeBanner.vue";

const board = ref({
  categoryIdx: 10,
  writer: "테스터1",
  password: "qudrnr132!",
  title: "최초 제목1",
  content: "최초 내용1",
})

const { data: writeBoardData, error: writeBoardError } = DataService.fetchWriteBoard()

const formData = new FormData();

const handleFileUpload = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i]);
  }
};

function submitForm() {
  formData.append(
      "board", new Blob([JSON.stringify(board.value)], { type: "application/json" })
  );

  axios.post('/api/board', formData, {
    headers: {
      "Content-Type": `multipart/form-data`
    }
  }).then(response => {
    alert(response);
  }).catch(error => {
    alert(error);
  });
}



</script>

<template>
  <template v-if="writeBoardData !== null">
    <WelcomeBanner :title="`함께 할 때 더 즐거운 순간`"
                   :subTitle="`다양한 사람을 만나고 생각의 폭을 넓혀보세요.`"/>
    <!-- write -->
    <div class="container-fluid bg-white">
      <div class="container">
        <!-- Title -->
        <div class="d-flex flex-row mt-3 mb-3">
          <button type="button" class="btn btn-secondary btn-sm" @click="$router.go(-1)"><i class="fa-solid fa-arrow-left"></i> 나가기</button>
        </div>
        <!-- Main content -->
        <div class="row">
          <!-- Left side -->
          <div class="col">
            <!-- Basic information -->
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="h6 mb-4"></h3>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">카테고리</label>
                      <select class="form-select" v-model="board.categoryIdx">
                        <option :value="null" selected>모든 카테고리</option>
                        <option v-for="category in writeBoardData" :value="category.categoryIdx" :key="category.categoryIdx">
                          {{ category.name }}
                        </option>
                      </select>
                    </div>

                    <div class="mb-3">
                      <label for="writerInput" class="form-label">작성자</label>
                      <input type="text" class="form-control" id="writerInput" placeholder="3글자 이상, 4글자 이하여야 합니다" v-model="board.writer" required minlength="3" maxlength="4">
                    </div>

                    <div class="mb-3">
                      <label for="passwordInput" class="form-label">패스워드</label>
                      <input type="password" class="form-control" id="passwordInput" placeholder="문자, 숫자, 특수문자가 포함된 4글자 이상, 15글자 이하여야 합니다" v-model="board.password" required pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{4,15}">
                    </div>

                    <div class="mb-3">
                      <label for="titleInput" class="form-label">제목</label>
                      <input type="text" class="form-control" id="titleInput" placeholder="4글자 이상, 100글자 이하여야 합니다" v-model="board.title" required minlength="4" maxlength="100">
                    </div>

                    <div class="mb-3">
                      <label for="contentTextarea" class="form-label">내용</label>
                      <textarea class="form-control" id="contentTextarea" rows="3" placeholder="4글자 이상, 2000글자 이하여야 합니다" v-model="board.content" required minlength="4" maxlength="2000"></textarea>
                    </div>

                    <div class="mb-5">
                      <label for="formFileMultiple" class="form-label">파일 업로드</label>
                      <input class="form-control" type="file" id="formFileMultiple" multiple ref="fileInput" @change="handleFileUpload">
                    </div>

                    <div class="d-grid gap-2 mt-4">
                      <button type="button" class="btn btn-primary" @click="submitForm">등록</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else-if="writeBoardError != null">
    <div class="alert alert-danger text-center" role="alert">
      {{ writeBoardError.detail }}
    </div>
  </template>
  <template v-else>
    <div>로딩 중...</div>
  </template>
</template>