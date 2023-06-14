<template>
  <div>
    <h2>글 번호: {{ postId }}</h2>
    <div>I am Board</div>
  </div>
</template>

<script>
export default {
  name: "Board",
  computed: {
    postId() {
      return this.$route.params.id;
    }
  }
}
</script>
