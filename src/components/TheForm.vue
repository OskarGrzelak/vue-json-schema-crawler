<script setup>
import { ref } from "vue";

const emit = defineEmits(["schema-submited"]);

const jsonSchemaString = ref("");
const errorText = ref("");
const focused = ref(false);

const collapse = () => {
  focused.value = false;
};

const submit = () => {
  errorText.value = "";

  try {
    if (!jsonSchemaString.value)
      throw new Error("There is no input to proceed");
    const json = JSON.parse(jsonSchemaString.value);
    if (!("properties" in json))
      throw new Error("Provided JSON is not a JSON Schema");
    emit("schema-submited", json);
  } catch (error) {
    errorText.value = error.message;
    emit("schema-submited", null);
  }
};
</script>
<template>
  <form class="form" @submit.prevent="submit">
    <div class="form-group">
      <label for="json-schema" class="form-label"
        >Provide a valid JSON Schema</label
      >
      <textarea
        name="json-schema"
        id="json-schema"
        v-model="jsonSchemaString"
        class="form-textarea"
        :class="{ 'form-textarea-extended': focused }"
        @focus="focused = true"
        v-click-outside="collapse"
      ></textarea>
      <p v-if="errorText" class="form-error">{{ errorText }}</p>
    </div>
    <div>
      <button class="form-submit">Proceed</button>
    </div>
  </form>
</template>
<style scoped>
.form {
  width: 100%;
  padding: 50px 0;
}

.form-group {
  margin: 10px 0;
}

.form-label {
  display: block;
  padding: 0 1em;
}

.form-textarea {
  width: 100%;
  height: 100px;
  resize: none;
  padding: 0.5em 1em;
  transition: height 0.3s;
}

.form-textarea-extended {
  height: 400px;
}

.form-submit {
  width: 100%;
  display: block;
  padding: 0.5em 1em;
  background: #fff;
  border: 1px solid #333;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-submit:hover {
  background: #ccc;
}
.form-error {
  color: red;
  font-weight: 500;
  padding: 0 1em;
}
</style>
