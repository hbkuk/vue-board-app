<script setup>
import DataService from "@/service/DataService";
import WelcomeBanner from "@/components/WelcomeBanner.vue";
import {defineProps, watch} from "vue";
import BoardDetail from "@/components/BoardArticle.vue";
import Spinner from "@/components/Spinner.vue";
import Error from "@/components/Error.vue";

const props = defineProps({
  boardIdx: String,
});

/** DataService를 사용하여 게시글을 가져옴 */
const { data: boardData, error: boardError } = DataService.fetchBoard(props.boardIdx)

watch(boardError, (boardError) =>{
  console.log(boardError)
})
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
