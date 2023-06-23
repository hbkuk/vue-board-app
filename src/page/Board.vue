<script setup>
import DataService from "@/service/DataService";
import router from "@/router/router";
import lib from "../script/lib";
import Comment from "@/components/Comment.vue";
import WelcomeBanner from "@/components/WelcomeBanner.vue";

const { data: boardData, error: boardError } = DataService.fetchBoard(router.currentRoute._value.params.boardIdx)
</script>

<template>
  <template v-if="boardData !== null">
    <WelcomeBanner :title="`커뮤니티`"
                   :subTitle="`다양한 사람을 만나고 생각의 폭을 넓혀보세요.`"/>
    <div class="board bg-white text-dark py-1 text-left">
      <div class="container mt-3">
        <div class="d-flex flex-row mt-3 mb-5">
          <button type="button" class="btn btn-secondary btn-sm" @click="$router.go(-1)"><i class="fa-solid fa-arrow-left"></i> 나가기</button>
        </div>
        <div class="hstack gap-3">
          <div class="vr"></div>
          <span class="fw-bold">{{ boardData.board.categoryName }}</span>
        </div>
      </div>
    </div>

    <div class="container-fluid bg-white">
      <div class="container py-3">
        <div class="row">
          <div class="col-md-12 mb-4">
            <article>
              <div class="post-content">
                <h2 class="title mb-4">{{ boardData.board.title }}</h2>

                <nav style="--bs-breadcrumb-divider: 'ㆍ';" aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item text-secondary"> {{ boardData.board.writer }} </li>
                    <li class="breadcrumb-item text-secondary">{{ lib.formatDate(boardData.board.regDate) }}</li>
                    <li class="breadcrumb-item text-secondary" v-if="boardData.comments">댓글 {{ boardData.comments.length }}개</li>
                  </ol>
                </nav>
                <div class="container p-5 my-5 border border-light rounded">
                  <p>{{ boardData.board.content }}</p>
                </div>

                <ul class="list-group list-group-light">
                  <li v-for="file in boardData.files" :key="file.fileIdx" class="list-group-item list-group-item-action px-3 border-0 ripple">
                    <a :href="`/download/${file.fileIdx}`" class="text-decoration-none text-dark">{{ file.originalName }} ({{ file.fileSize }})</a>
                  </li>
                </ul>
                <hr class="my-4"/>
                <div class="d-flex justify-content-between">
<!--                  // TODO: 삭제는 Modal-->
                  <router-link class="btn btn-danger font-weight-bold btn-sm" :to="`/board/delete/${boardData.board.boardIdx}`">게시글 삭제</router-link>
                  <router-link class="btn btn-secondary font-weight-bold btn-sm" :to="`/board/modify/${boardData.board.boardIdx}`">게시글 수정</router-link>
                </div>
                <Comment v-if="boardData.comments" :comments="boardData.comments"/>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else-if="boardError != null">
    <div class="alert alert-danger text-center" role="alert">
      {{ boardError.detail }}
    </div>
  </template>
  <template v-else>
    <div>로딩 중...</div>
  </template>
</template>
