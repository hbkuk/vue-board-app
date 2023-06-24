import {createRouter, createWebHistory} from 'vue-router'
import Boards from "@/page/Boards.vue";
import Board from "@/page/Board.vue";
import DeleteBoard from "@/page/DeleteBoard.vue";
import WriteBoard from "@/page/WriteBoard.vue";
import ModifyBoard from "@/page/ModifyBoard.vue";

const routes = [
    {path: '/', redirect: '/boards'}, // 리다이렉트 설정
    {path: '/boards', name: 'Boards', component: Boards},
    {path: '/board/:boardIdx', component: Board, props: true},
    {path: '/board/write', name: 'WriteBoard', component: WriteBoard},
    {path: '/board/modify/:boardIdx', component: ModifyBoard, props: true},
    {path: '/board/delete/:boardIdx', component: DeleteBoard},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;