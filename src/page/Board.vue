<script setup>
import DataService from "@/service/DataService";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import {defineProps, ref} from "vue";
import BoardDetail from "@/components/BoardArticle.vue";
import Spinner from "@/components/Spinner.vue";
import Error from "@/components/Error.vue";
import router from "@/router/router";
import Comment from "@/components/Comment.vue";
import {useHideElement} from "@/composable/elementControll/hideElement";

const boardData = ref(null) /** 게시글 정보를 담는 반응성 객체 */
const boardError = ref(null) /** 게시글 정보를 가져올때 발생하는 에러를 담는 반응성 객체 */

const props = defineProps({ /** 전달받은 속성 */
  boardIdx: String,
});

/**
 * 게시글 정보를 가져오는 함수
 *
 * @returns {Promise<void>}
 */
async function getBoard() {
  const { data, error } = await DataService.fetchBoard(props.boardIdx)
  if(data) {
    boardData.value = data
    boardError.value = null
  }
  if(error) {
    boardError.value = error
  }
}

const submitData = ref(null) /** 게시글 삭제 후 반환된 데이터를 담는 반응성 객체 */
const submitError = ref(null) /** 게시글 삭제 후 반환된 에러를 담는 반응성 객체 */

const modalShow = ref(false)
const password = ref('')

/**
 * 비밀번호 초기화 함수
 */
function resetPassword() {
  password.value = ''
}

/**
 * 확인 버튼 핸들러
 *
 * @param {Event} bvModalEvent - 모달 이벤트 객체
 */
function handleOk(bvModalEvent) {
  bvModalEvent.preventDefault()
  handleSubmit(bvModalEvent)
}

/**
 * 폼 제출 핸들러
 */
async function handleSubmit() {
  const formData = new FormData // 폼 데이터
  formData.append('password', password.value)

  /**
   * 서버로부터 게시글 삭제 작업 수행
   *
   * @type {Object} - 서버 응답 데이터 또는 에러 객체
   * @property {any} data - 서버 응답 데이터
   * @property {Error} error - 서버 에러 객체
   */
  const { data, error } = await DataService.fetchDeleteAction(props.boardIdx, formData)
  if (error) {
    submitError.value = error
  } else {
    submitData.value = data
    submitError.value = null

    modalShow.value = false
    useHideElement('deleteModal');
    await router.push({name: 'Boards'});
  }
}

getBoard()
</script>

<template>
  <WelcomeBanner :title="`커뮤니티`"
                 :subTitle="`다양한 사람을 만나고 ....`"/>

  <!-- 조건부 렌더링 1: 서버 통신 success -->
  <template v-if="boardData !== null">
    <BoardDetail :boardData="boardData">
      <div class="d-flex justify-content-between">
        <b-button @click="modalShow = true" class="btn btn-danger font-weight-bold btn-sm">게시글 삭제</b-button>
        <router-link class="btn btn-secondary font-weight-bold btn-sm" :to="`/board/modify/${boardData.board.boardIdx}`">게시글 수정</router-link>
      </div>
      <Comment v-if="boardData" :comments="boardData.board.comments"/>
    </BoardDetail>
  </template>

  <!-- 조건부 렌더링 2: 서버 통신 fail -->
  <template v-else-if="boardError !== null">
    <Error :error="boardError"/>
  </template>

  <!-- 조건부 렌더링 3: 서버 통신 delay -->
  <template v-else>
    <Spinner msg="게시글 가져오는 중 ..." />
  </template>

  <!-- 모달 -->
  <b-modal id="deleteModal" ref="modal" title="게시글 삭제 요청"
    v-model="modalShow"
    @show="resetPassword"
    @hidden="resetPassword"
    @ok="handleOk"
    cancel-title="취소하기"
    ok-title="삭제하기">
    <form ref="form">
      <b-form-group label="password" label-for="password-input" invalid-feedback="password is required">
        <b-form-input
          type="password"
          id="password-input"
          v-model="password"
          required
        ></b-form-input>
      </b-form-group>
    </form>
    <div v-if="submitError">
      <div class="alert alert-danger text-center" role="alert">
        {{ submitError.detail }}
      </div>
    </div>
  </b-modal>
</template>
