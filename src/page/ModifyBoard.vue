<script setup>
import DataService from "@/service/DataService";
import router from "@/router/router";
import lib from "@/script/lib";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import {useSubmitForm} from "@/composable/submitForm";

const { data: modifyViewData, error: modifyViewError }
    = DataService.fetchModifyBoard(router.currentRoute._value.params.boardIdx)

const { board, submitError, handleFileUpload, getSubmitFormData, deleteFileByFileIdx }
        = useSubmitForm(modifyViewData)

const submitForm = () => {
  submitError.value = DataService.fetchModifyAction(board.value.boardIdx, getSubmitFormData())
}

</script>

<template>
  <template v-if="board !== null">
    <WelcomeBanner :title="`함께 할 때 더 즐거운 순간`"
                   :subTitle="`다양한 사람을 만나고 생각의 폭을 넓혀보세요.`"/>
    <!-- write -->
    <div class="container-fluid bg-white">
      <div class="container">
        <!-- Title -->
        <div class="d-flex flex-row mt-3 mb-3">
          <button type="button" class="btn btn-secondary btn-sm" @click="$router.push({name: 'Boards'})"><i
              class="fa-solid fa-arrow-left"></i> 나가기
          </button>
        </div>
        <div v-if="submitError !== null && submitError.error !== null" class="alert alert-danger text-center"
             role="alert">
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
                        <div class="text-secondary text-lg">{{ lib.formatDate(board.regDate) }}</div>
                      </div>
                      <span class="badge bg-warning text-dark me-2 badge-lg">수정일시</span>
                      <div class="d-flex me-2">
                        <div class="text-secondary text-lg">{{
                            board.modDate !== null ? lib.formatDate(board.modDate) : '없음'
                          }}
                        </div>
                      </div>
                      <span class="badge bg-info text-dark me-2 badge-lg">조회수</span>
                      <div class="d-flex">
                        <div class="text-secondary text-lg">{{ board.hit }}</div>
                      </div>
                    </div>
                    <form>
                      <div class="mb-3">
                        <label class="form-label">카테고리</label>
                        <select class="form-select">
                          <option :value="null">모든 카테고리</option>
                          <option v-for="category in modifyViewData.categories" :value="category.categoryIdx"
                                  :key="category.categoryIdx" :selected="board.categoryIdx === category.categoryIdx">
                            {{ category.name }}
                          </option>
                        </select>
                      </div>

                      <div class="mb-3">
                        <label for="writerInput" class="form-label">작성자</label>
                        <input type="text" class="form-control" id="writerInput" placeholder="3글자 이상, 4글자 이하여야 합니다"
                               v-model="board.writer" required minlength="3" maxlength="4">
                      </div>

                      <div class="mb-3">
                        <label for="passwordInput" class="form-label">패스워드</label>
                        <input type="password" class="form-control" id="passwordInput"
                               placeholder="문자, 숫자, 특수문자가 포함된 4글자 이상, 15글자 이하여야 합니다" v-model="board.password" required
                               pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{4,15}" autocomplete="off">
                      </div>

                      <div class="mb-3">
                        <label for="titleInput" class="form-label">제목</label>
                        <input type="text" class="form-control" id="titleInput" placeholder="4글자 이상, 100글자 이하여야 합니다"
                               v-model="board.title" required minlength="4" maxlength="100">
                      </div>

                      <div class="mb-3">
                        <label for="contentTextarea" class="form-label">내용</label>
                        <textarea class="form-control" id="contentTextarea" rows="3"
                                  placeholder="4글자 이상, 2000글자 이하여야 합니다" v-model="board.content" required minlength="4"
                                  maxlength="2000"></textarea>
                      </div>


                      <div class="mb-3" v-if="board.files && board.files.length > 0">
                        <ul class="list-group list-group-light">
                          <label class="form-label">기존 업로드된 파일</label>
                          <div v-for="file in board.files" :key="file.fileIdx"
                               class="list-group-item list-group-item-action px-3 border-1 ripple d-flex align-items-center">
                            <div class="flex-grow-1 text-decoration-none text-dark">{{ file.originalName }}
                              ({{ file.fileSize }})
                            </div>
                            <button type="button" class="btn-close" aria-label="Delete"
                                    @click="deleteFileByFileIdx(file.fileIdx)"></button>
                          </div>
                        </ul>
                      </div>

                      <div class="mb-5">
                        <label for="formFileMultiple" class="form-label">파일 업로드</label>
                        <input class="form-control" type="file" id="formFileMultiple" multiple ref="fileInput"
                               @change="handleFileUpload">
                      </div>

                      <div class="d-grid gap-2 mt-4">
                        <button type="button" class="btn btn-primary" @click="submitForm"><i
                            class="fa-regular fa-circle-check"></i> 등록
                        </button>
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
  <template v-else-if="modifyViewError != null">
    <div class="alert alert-danger text-center" role="alert">
      {{ modifyViewError.detail }}
    </div>
  </template>
  <template v-else>
    <div>로딩 중...</div>
  </template>
</template>