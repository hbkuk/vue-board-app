<script setup>
const props = defineProps({
  title: String,
  subTitle: String,
})

</script>

<template>
  <div class="bg-light text-dark py-1 text-center">
    <div class="container mt-3">
      <h2>{{ title }}</h2>
      <p>{{ subTitle }}</p>
    </div>
  </div>
</template>