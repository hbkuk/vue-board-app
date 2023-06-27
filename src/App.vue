<script setup>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import DataService from "@/service/DataService";
import {store} from "@/script/store";

/**
 * 카테고리 데이터를 가져와 스토어를 업데이트하는 비동기 함수입니다.
 *
 * @returns {Promise<void>} 카테고리 데이터 가져오기와 스토어 업데이트가 성공하면 완료(resolve)됩니다.
 */
async function getCategories() {
  const { data: categoriesData, error: categoriesError } = await DataService.fetchCategories(); // 데이터 카테고리를 가져오고, 가져온 데이터와 에러를 변수에 할당
  store.updateCategories(categoriesData); // 가져온 카테고리 데이터를 스토어에 업데이트
}

getCategories()

</script>

<template>
  <Header/>
  <RouterView/>
  <Footer/>
</template>
