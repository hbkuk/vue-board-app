import {createRouter, createWebHistory} from 'vue-router'
import Boards from "@/page/Boards.vue";
import Board from "@/page/Board.vue";
import WriteBoard from "@/page/WriteBoard.vue";
import ModifyBoard from "@/page/ModifyBoard.vue";
import NotFound from "@/page/NotFound.vue";

const routes = [
    {path: '/', redirect: '/boards'}, // 리다이렉트 설정
    {path: '/boards', name: 'Boards', component: Boards},
    {path: '/board/:boardIdx', name: 'Board', component: Board, props: true},
    {path: '/board/write', name: 'WriteBoard', component: WriteBoard},
    {path: '/board/modify/:boardIdx', component: ModifyBoard, props: true},
    {path: '/:catchAll(.*)*', name: 'NotFound', component: NotFound}, // 404 페이지로 리다이렉트
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;