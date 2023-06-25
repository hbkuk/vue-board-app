<script setup>
import {defineProps} from "vue";

const props = defineProps({
  error: Object,
});
</script>

<template>
  <div class="alert alert-danger text-center" role="alert">
    {{ error.detail }}
  </div>
</template>