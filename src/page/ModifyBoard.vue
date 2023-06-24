<script setup>
import {onMounted, ref, watch} from "vue";
import DataService from "@/service/DataService";
import router from "@/router/router";
import lib from "@/script/lib";
import WelcomeBanner from "@/components/WelcomeBanner.vue";

const boardData = ref(null);
const fileData = ref(null);
const password = ref('')
const submitError = ref(null)

// TODO: props로 변경할것.
const { data: modifyBoardData, error: modifyBoardError } = DataService.fetchModifyBoard(router.currentRoute._value.params.boardIdx)

let formData = new FormData();

/**
 * 파일 업로드를 처리하는 함수
 * @param {Event} event - 파일 업로드 이벤트
 */
const handleFileUpload = (event) => {
  formData.delete('file');
  formData.append('file', ...event.target.files);
};

/**
 * 폼을 제출하는 함수
 */
function submitForm() {
  formData.append('fileIdx', fileData.value.map(file => file.fileIdx))
  formData.append(
      "board", new Blob([JSON.stringify(boardData.value)], { type: "application/json" })
  );
  submitError.value = DataService.fetchModifyAction(boardData.value.boardIdx, formData)
}

/**
 * 파일 인덱스에 해당하는 파일을 삭제하는 함수
 * @param {number} fileIdx - 삭제할 파일의 인덱스
 */
function deleteFileByFileIdx(fileIdx) {
  fileData.value = fileData.value.filter(file => file.fileIdx !== fileIdx);
}

/**
 * modifyBoardData 객체를 감시하고 값이 변경될 때마다 boardData와 fileData에 새로운 값을 할당하는 함수
 * @param {object} newModifyBoardData - 변경된 modifyBoardData 객체
 */
watch(modifyBoardData, (newModifyBoardData) => {
  boardData.value = newModifyBoardData.board
  fileData.value = newModifyBoardData.files
})

/**
 * password 변수를 감시하고 값이 변경될 때마다 boardData의 password 값을 업데이트하는 함수
 * @param {string} newPassword - 변경된 password 값
 */
watch(password, (newPassword) => {
  boardData.value.password = newPassword;
})

/**
 * submitError 변수를 감시하고 값이 변경될 때마다 formData를 초기화하는 함수
 * @param {object} newError - 변경된 submitError 객체
 */
watch(submitError, (newError) => {
  formData = new FormData()
})

</script>

<template>
  <template v-if="boardData !== null">
    <WelcomeBanner :title="`함께 할 때 더 즐거운 순간`"
                   :subTitle="`다양한 사람을 만나고 생각의 폭을 넓혀보세요.`"/>
    <!-- write -->
    <div class="container-fluid bg-white">
      <div class="container">
        <!-- Title -->
        <div class="d-flex flex-row mt-3 mb-3">
          <button type="button" class="btn btn-secondary btn-sm" @click="$router.push({name: 'Boards'})"><i class="fa-solid fa-arrow-left"></i> 나가기</button>
        </div>
        <div  v-if="submitError !== null && submitError.error !== null" class="alert alert-danger text-center" role="alert">
          {{ submitError.error.detail }}
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

                    <div class="d-flex align-items-center justify-content-center">
                      <span class="badge bg-success me-2 badge-lg">등록일시</span>
                      <div class="d-flex me-2">
                        <div class="text-secondary text-lg">{{ lib.formatDate(boardData.regDate) }}</div>
                      </div>
                      <span class="badge bg-warning text-dark me-2 badge-lg">수정일시</span>
                      <div class="d-flex me-2">
                        <div class="text-secondary text-lg">{{ boardData.modDate !== null ? lib.formatDate(boardData.modDate) : '없음' }}</div>
                      </div>
                      <span class="badge bg-info text-dark me-2 badge-lg">조회수</span>
                      <div class="d-flex">
                        <div class="text-secondary text-lg">{{ boardData.hit }}</div>
                      </div>
                    </div>
                    <form>
                      <div class="mb-3">
                        <label class="form-label">카테고리</label>
                        <select class="form-select">
                          <option :value="null">모든 카테고리</option>
                          <option v-for="category in boardData.categories" :value="category.categoryIdx" :key="category.categoryIdx" :selected="boardData.categoryIdx === category.categoryIdx">
                            {{ category.name }}
                          </option>
                        </select>
                      </div>

                      <div class="mb-3">
                        <label for="writerInput" class="form-label">작성자</label>
                        <input type="text" class="form-control" id="writerInput" placeholder="3글자 이상, 4글자 이하여야 합니다" v-model="boardData.writer" required minlength="3" maxlength="4">
                      </div>

                      <div class="mb-3">
                        <label for="passwordInput" class="form-label">패스워드</label>
                        <input type="password" class="form-control" id="passwordInput" placeholder="문자, 숫자, 특수문자가 포함된 4글자 이상, 15글자 이하여야 합니다" v-model="password" required pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{4,15}" autocomplete="off">
                      </div>

                      <div class="mb-3">
                        <label for="titleInput" class="form-label">제목</label>
                        <input type="text" class="form-control" id="titleInput" placeholder="4글자 이상, 100글자 이하여야 합니다" v-model="boardData.title" required minlength="4" maxlength="100">
                      </div>

                      <div class="mb-3">
                        <label for="contentTextarea" class="form-label">내용</label>
                        <textarea class="form-control" id="contentTextarea" rows="3" placeholder="4글자 이상, 2000글자 이하여야 합니다" v-model="boardData.content" required minlength="4" maxlength="2000"></textarea>
                      </div>


                      <div class="mb-3" v-if="fileData && fileData.length > 0">
                        <ul class="list-group list-group-light">
                          <label class="form-label">기존 업로드된 파일</label>
                          <div v-for="file in fileData" :key="file.fileIdx" class="list-group-item list-group-item-action px-3 border-1 ripple d-flex align-items-center">
                            <div class="flex-grow-1 text-decoration-none text-dark">{{ file.originalName }} ({{ file.fileSize }})</div>
                            <button type="button" class="btn-close" aria-label="Delete" @click="deleteFileByFileIdx(file.fileIdx)"></button>
                          </div>
                        </ul>
                      </div>

                      <div class="mb-5">
                        <label for="formFileMultiple" class="form-label">파일 업로드</label>
                        <input class="form-control" type="file" id="formFileMultiple" multiple ref="fileInput" @change="handleFileUpload">
                      </div>

                      <div class="d-grid gap-2 mt-4">
                        <button type="button" class="btn btn-primary" @click="submitForm"><i class="fa-regular fa-circle-check"></i> 등록</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else-if="modifyBoardError != null">
    <div class="alert alert-danger text-center" role="alert">
      {{ modifyBoardError.detail }}
    </div>
  </template>
  <template v-else>
    <div>로딩 중...</div>
  </template>
</template>