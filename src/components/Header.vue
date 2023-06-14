<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light text-black">
    <div class="container px-3 px-lg-5">
      <router-link to="/" class="navbar-brand">메인</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span
          class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item px-4 "><a class="nav-link" href="#!">Q/A</a></li>
          <li class="nav-item px-4"><a class="nav-link" href="#!">지식</a></li>
          <li class="nav-item px-4"><a class="nav-link" href="#!">커뮤니티</a></li>
          <li class="nav-item px-4"><a class="nav-link" href="#!">공지사항</a></li>
          <li class="nav-item px-4"><a class="nav-link" href="#!">마이페이지</a></li>
        </ul>
        <a class="navbar-brand ps-3" href="#">icon1
          <i class="bi bi-chat-left-dots"></i>
        </a>
        <a class="navbar-brand ps-3" href="#">icon2
          <i class="bi bi-person"></i>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Header',
}
</script>

<style scoped>
</style>
