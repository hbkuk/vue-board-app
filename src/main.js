import {createApp} from 'vue';
import App from './App.vue';
import router from "@/router/router";
import store from "@/script/store";

/**
 * Vue 애플리케이션을 생성하고, 라우터와 상태 관리(store)를 등록하여 마운트합니다.
 */
createApp(App)
    .use(store)
    .use(router)
    .mount('#app');
