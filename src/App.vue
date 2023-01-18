<script setup>
import { ref } from "vue";
import TheForm from "./components/TheForm.vue";
import TheCrawler from "./components/TheCrawler.vue";

const jsonSchema = ref(null);

const proceedSchema = (json) => {
  jsonSchema.value = json;
};
</script>

<template>
  <div class="container">
    <TheForm @schema-submited="proceedSchema" />
    <TheCrawler v-if="jsonSchema" :json-schema="jsonSchema" />
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
