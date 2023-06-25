<script setup>
import DataService from "@/service/DataService";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import {useWriteSubmitForm} from "@/composable/submitForm/writeSubmitForm";
import Spinner from "@/components/Spinner.vue";
import Error from "@/components/Error.vue";
import SubmitErr from "@/components/SubmitErr.vue";


/** DataService를 사용하여 writeViewData를 가져옴 */
const { data: writeViewData, error: writeViewError } = DataService.fetchWriteBoard()

/** useModifySubmitForm 컴포저블을 통해 게시글 수정에 필요한 함수와 상태를 가져옴 */
const {board, submitError, useHandleFileUpload, getSubmitFormData}
    = useWriteSubmitForm()

/** 서버 데이터 전송 처리하는 함수 */
const submitForm = () => {
  submitError.value = DataService.fetchWriteAction(getSubmitFormData())
}

</script>

<template>
  <WelcomeBanner :title="`커뮤니티`"
                 :subTitle="`다양한 사람을 만나고 ....`"/>

  <!-- 조건부 렌더링: 게시글 작성 실패로 인한 Error Message -->
  <template v-if="submitError !== null && submitError.error !== null">
    <SubmitErr :submitError="submitError"/>
  </template>

  <!-- 조건부 렌더링 1: 서버 통신 success -->
  <template v-if="writeViewData !== null">
    <div class="container-fluid bg-white">
      <div class="container">
        <div class="d-flex flex-row mt-3 mb-3">
          <button type="button" class="btn btn-secondary btn-sm" @click="$router.push({name: 'Boards'})"><i class="fa-solid fa-arrow-left"></i> 나가기</button>
        </div>
        <div class="row">
          <div class="col">
            <div class="card mb-4">
              <div class="card-body">
                <h3 class="h6 mb-4"></h3>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label class="form-label">카테고리</label>
                      <select class="form-select" v-model="board.categoryIdx">
                        <option :value="null" selected>모든 카테고리</option>
                        <option v-for="category in writeViewData" :value="category.categoryIdx" :key="category.categoryIdx">
                          {{ category.name }}
                        </option>
                      </select>
                    </div>
                    <form>
                      <div class="mb-3">
                        <label for="writerInput" class="form-label">작성자</label>
                        <input type="text" class="form-control" id="writerInput" placeholder="3글자 이상, 4글자 이하여야 합니다" v-model="board.writer" required minlength="3" maxlength="4">
                      </div>

                      <div class="mb-3">
                        <label for="passwordInput" class="form-label">패스워드</label>
                        <input type="password" class="form-control" id="passwordInput" placeholder="문자, 숫자, 특수문자가 포함된 4글자 이상, 15글자 이하여야 합니다" v-model="board.password" required pattern="(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{4,15}" autocomplete="off">
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
                        <input class="form-control" type="file" id="formFileMultiple" multiple ref="fileInput"
                               @change="useHandleFileUpload">
                      </div>

                      <div class="d-grid gap-2 mt-4">
                        <button type="button" class="btn btn-primary" @click="submitForm"><i class="fa-regular fa-circle-check"></i> 등록
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

  <!-- 조건부 렌더링 2: 서버 통신 fail -->
  <template v-else-if="writeViewError !== null">
    <Error :error="writeViewError"/>
  </template>

  <!-- 조건부 렌더링 3: 서버 통신 delay -->
  <template v-else>
    <Spinner msg="게시글 가져오는 중 ..." />
  </template>

</template>