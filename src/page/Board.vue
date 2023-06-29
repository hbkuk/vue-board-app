<script setup>
import DataService from "@/service/DataService";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import {defineProps, ref} from "vue";
import BoardDetail from "@/components/BoardArticle.vue";
import Spinner from "@/components/Spinner.vue";
import Error from "@/components/Error.vue";
import Comment from "@/components/Comment.vue";
import {useDeleteBoardModal} from "@/composable/modal/deleteBoardModal";
import {RequestSuccessCode} from "@/composable/response/RequestSuccessCode";
import {useResponseHandler} from "@/composable/response/responseHandler";

const boardData = ref(null) /** 게시글 정보를 담는 반응성 객체 */
const boardError = ref(null) /** 게시글 정보를 가져올때 발생하는 에러를 담는 반응성 객체 */

const props = defineProps({
  boardIdx: {
    type: String,
    default: '',
  },
});

/**
 * 게시글 정보를 가져오는 함수
 *
 * @returns {Promise<void>}
 */
async function getBoard() {
  const [response] = await Promise.all([DataService.fetchBoard(props.boardIdx)]);
  const result = await useResponseHandler(response, RequestSuccessCode.GET);

  if (result && result.type === "data") {
    boardData.value = result.data;
  } else {
    boardError.value = result?.error;
  }
}

const submitData = ref(null) /** 게시글 삭제 후 반환된 데이터를 담는 반응성 객체 */
const submitError = ref(null) /** 게시글 삭제 후 반환된 에러를 담는 반응성 객체 */

/** useDeleteBoardModal 컴포저블을 통해 게시글 삭제에 필요한 함수와 상태를 가져옴 */
const {modalShow, password, resetPassword}
    = useDeleteBoardModal()

/**
 * 게시글 삭제 확인 버튼 함수
 *
 * @param {Event} bvModalEvent - 모달 이벤트 객체
 */
function handleOk(bvModalEvent) {
  bvModalEvent.preventDefault()
  handleSubmit()
}

/**
 * 게시글 삭제 함수
 */
async function handleSubmit() {
  const formData = new FormData
  formData.append('password', password.value)

  const [response] = await Promise.all([DataService.fetchDeleteAction(props.boardIdx, formData)])
  const result = await useResponseHandler(response, RequestSuccessCode.DELETE, 'Boards');
  submitError.value = result?.error;
}


getBoard()
</script>

<template>
  <WelcomeBanner
    :title="`커뮤니티`"
    :sub-title="`다양한 사람을 만나고 ....`"
  />

  <!-- 조건부 렌더링 1: 서버 통신 success -->
  <template v-if="boardData !== null">
    <BoardDetail :board-data="boardData">
      <div class="d-flex justify-content-between">
        <b-button
          class="btn btn-danger font-weight-bold btn-sm"
          @click="modalShow = true"
        >
          게시글 삭제
        </b-button>
        <router-link
          class="btn btn-secondary font-weight-bold btn-sm"
          :to="`/board/modify/${boardData.board.boardIdx}`"
        >
          게시글 수정
        </router-link>
      </div>
      <Comment
        v-if="boardData"
        :comments="boardData.board.comments"
      />
    </BoardDetail>
  </template>

  <!-- 조건부 렌더링 2: 서버 통신 fail -->
  <template v-else-if="boardError !== null">
    <Error :error="boardError" />
  </template>

  <!-- 조건부 렌더링 3: 서버 통신 delay -->
  <template v-else>
    <Spinner msg="게시글 가져오는 중 ..." />
  </template>

  <!-- 모달 -->
  <b-modal
    id="deleteModal"
    ref="modal"
    v-model="modalShow"
    title="게시글 삭제 요청"
    cancel-title="취소하기"
    ok-title="삭제하기"
    @show="resetPassword"
    @hidden="resetPassword"
    @ok="handleOk"
  >
    <form ref="form">
      <b-form-group
        label="password"
        label-for="password-input"
        invalid-feedback="password is required"
      >
        <b-form-input
          id="password-input"
          v-model="password"
          type="password"
          required
        />
      </b-form-group>
    </form>
    <div v-if="submitError !== null">
      <Error :error="submitError"/>
    </div>
  </b-modal>
</template>
