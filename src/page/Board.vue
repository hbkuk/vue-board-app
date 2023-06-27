<script setup>
import DataService from "@/service/DataService";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import {defineProps, ref} from "vue";
import BoardDetail from "@/components/BoardArticle.vue";
import Spinner from "@/components/Spinner.vue";
import Error from "@/components/Error.vue";

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

getBoard()
</script>

<template>
  <WelcomeBanner :title="`커뮤니티`"
                 :subTitle="`다양한 사람을 만나고 ....`"/>

  <!-- 조건부 렌더링 1: 서버 통신 success -->
  <template v-if="boardData !== null">
    <BoardDetail :boardData="boardData"/>
  </template>

  <!-- 조건부 렌더링 2: 서버 통신 fail -->
  <template v-else-if="boardError !== null">
    <Error :error="boardError"/>
  </template>

  <!-- 조건부 렌더링 3: 서버 통신 delay -->
  <template v-else>
    <Spinner msg="게시글 가져오는 중 ..." />
  </template>

</template>
