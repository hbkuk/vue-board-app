<template>
  <div class="ground">
    <Header/>
    <Boards/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Boards from "./Boards.vue";
import Footer from "./Footer.vue";

export default {
  components: { Header, Boards, Footer },
};
</script>
