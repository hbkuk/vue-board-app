<script setup>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import DataService from "@/service/DataService";
import {store} from "@/script/store";
import {RequestSuccessCode} from "@/composable/response/RequestSuccessCode";

/**
 * 카테고리 데이터를 가져와 스토어를 업데이트하는 비동기 함수입니다.
 *
 * @returns {Promise<void>} 카테고리 데이터 가져오기와 스토어 업데이트가 성공하면 완료(resolve)됩니다.
 */
async function getCategories() {
  const [response] = await Promise.all([DataService.fetchCategories()]);
  if(response.status === RequestSuccessCode.GET) {
    store.updateCategories(response.data);
  }
}

getCategories()

</script>

<template>
  <Header/>
  <RouterView/>
  <Footer/>
</template>
