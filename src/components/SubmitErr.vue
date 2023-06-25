<script setup>
import {defineProps} from "vue";

const props = defineProps({
  submitError: Object,
});
</script>

<template>
  <div class="container">
    <div class="alert alert-danger text-center">
      {{ submitError.error.detail }}
    </div>
  </div>
</template>