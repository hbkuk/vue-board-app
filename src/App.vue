<template>
  <Header/>
  <RouterView/>
  <Footer/>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import store from "@/script/store";

export default {
  name: 'App',
  components: {
    Footer,
    Header
  },
  setup() {
    const startDate = sessionStorage.getItem("startDate");
    const endDate = sessionStorage.getItem("endDate");
    const categoryIdx = sessionStorage.getItem("categoryIdx");
    const keyword = sessionStorage.getItem("keyword");

    if (startDate) {
      store.commit('setStartDate', startDate);
    }
    if (endDate) {
      store.commit('setEndDate', endDate);
    }
    if (categoryIdx) {
      store.commit('setCategoryIdx', categoryIdx);
    }
    if(keyword) {
      store.commit('setKeyword', keyword);
    }
  }
}
</script>
