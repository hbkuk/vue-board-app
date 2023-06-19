<template>
  <Header/>
  <RouterView/>
  <Footer/>
</template>

<script>
import {onBeforeMount} from 'vue';
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import queryHelper from "@/script/queryHelper";
import {mapActions} from "vuex";
import store from "@/script/store";

/**
 * 애플리케이션의 진입점인 App 컴포넌트입니다.
 * Header, RouterView, Footer 컴포넌트를 렌더링합니다.
 */
export default {
  name: 'App',
  components: {Header, Footer},
  ...mapActions(['updateSearchCondition']),
  setup() {
    /**
     * 컴포넌트가 마운트되기 전에 실행되는 로직을 처리합니다.
     * sessionStorage에서 검색 조건을 로드하고, 해당 값을 스토어에 커밋합니다.
     *
     * @param {string} key - sessionStorage에서 로드할 값의 키
     * @param {Function} commitFn - 스토어 커밋을 위한 함수
     */
    onBeforeMount(() => {
      const serializedSearchCondition = sessionStorage.getItem('searchCondition');
      if (serializedSearchCondition) {
        store.dispatch('updateSearchCondition', queryHelper.parseSearchConditionParams(store.state.searchCondition, JSON.parse(serializedSearchCondition)));
      }
    });
  },
};
</script>

