import {createRouter, createWebHistory} from 'vue-router'
import Boards from "@/page/Boards.vue";
import Home from "@/page/Home.vue";
import Board from "@/page/Board.vue";
import UpdateBoard from "@/page/UpdateBoard.vue";
import DeleteBoard from "@/page/DeleteBoard.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/boards', component: Boards},
    {path: '/board/:boardIdx', component: Board},
    {path: '/board/modify/:boardIdx', component: UpdateBoard},
    {path: '/board/delete/:boardIdx', component: DeleteBoard},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;