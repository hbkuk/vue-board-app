<script setup>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import DataService from "@/service/DataService";
import {store} from "@/script/store";

// 데이터 카테고리를 가져오고, 가져온 데이터와 에러를 변수에 할당
const { data: categoriesData, error: categoriesError } = DataService.fetchCategories();

// 가져온 카테고리 데이터를 스토어에 업데이트
store.updateCategories(categoriesData);

</script>

<template>
  <Header/>
  <RouterView/>
  <Footer/>
</template>
