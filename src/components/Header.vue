<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light text-black">
    <div class="container px-3 px-lg-5">
      <router-link to="/boards" class="navbar-brand">메인</router-link>
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
        <ul class="navbar-nav d-flex flex-row me-1">
          <li class="nav-item me-3 me-lg-3">
            <a class="nav-link" href="#"><i class="fa-solid fa-bell"></i></a>
          </li>
          <li class="nav-item me-3 me-lg-3">
            <a class="nav-link" href="#"><i class="fa-solid fa-comment"></i></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><i class="fa-regular fa-user"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>