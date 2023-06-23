import {createRouter, createWebHistory} from 'vue-router'
import Boards from "@/page/Boards.vue";
import Home from "@/page/Home.vue";
import Board from "@/page/Board.vue";
import UpdateBoard from "@/page/UpdateBoard.vue";
import DeleteBoard from "@/page/DeleteBoard.vue";
import WriteBoard from "@/page/WriteBoard.vue";

const routes = [
    { path: '/', redirect: '/boards' }, // 리다이렉트 설정
    {path: '/boards', component: Boards},
    {path: '/board/:boardIdx', component: Board},
    {path: '/board/write', component: WriteBoard},
    {path: '/board/modify/:boardIdx', component: UpdateBoard},
    {path: '/board/delete/:boardIdx', component: DeleteBoard},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;