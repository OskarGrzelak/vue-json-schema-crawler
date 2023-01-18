<script setup>
import { onMounted, ref, computed } from "vue";

const props = defineProps({
  jsonSchema: {
    type: Object,
    default() {
      return null;
    },
  },
});

const nodes = ref([]);
const selectedNodes = ref([]);
const level = ref(0);

const path = computed(() =>
  selectedNodes.value
    ? selectedNodes.value.reduce((acc, curr) => {
        return acc + `.properties.${curr}`;
      }, "json")
    : ""
);

const getProperties = (json, nodes) => {
  let obj = json.properties;
  if (!nodes.length) return obj;
  for (var i = 0, n = nodes.length; i < n; ++i) {
    const property = nodes[i];
    if ("properties" in obj[property]) {
      obj = obj[property].properties;
    } else {
      return;
    }
  }
  level.value += 1;
  return obj;
};

const goToStart = () => {
  selectedNodes.value = [];
  level.value = 0;

  const properties = getProperties(props.jsonSchema, selectedNodes.value);
  nodes.value = properties ? Object.keys(properties) : [];
};

const goBackTo = (index) => {
  const selectedArr = selectedNodes.value.slice(0, index + 1);
  selectedNodes.value = selectedArr;
  level.value = index;

  const properties = getProperties(props.jsonSchema, selectedNodes.value);
  nodes.value = properties ? Object.keys(properties) : [];
};

const selectProperty = (property) => {
  const selectedArr = selectedNodes.value || [];
  selectedArr[level.value] = property;
  selectedNodes.value = selectedArr;

  const properties = getProperties(props.jsonSchema, selectedNodes.value);
  nodes.value = properties ? Object.keys(properties) : [];
};

onMounted(() => {
  let nodesArr = [];
  for (let property in props.jsonSchema.properties) {
    nodesArr.push(property);
  }

  nodes.value = nodesArr;
});
</script>

<template>
  <div class="crawler">
    <div class="crawler-group">
      <div class="crawler-heading">Selected path:</div>
      <span>
        <button @click="goToStart" class="crawler-button">Root</button>
        <span v-if="selectedNodes.length">&rArr;</span>
      </span>
      <span v-for="(property, index) in selectedNodes" :key="property">
        <button @click="goBackTo(index)" class="crawler-button">
          {{ property }}
        </button>
        <span v-if="index < selectedNodes.length - 1">&rArr;</span>
      </span>
    </div>
    <div class="crawler-group" v-if="nodes.length">
      <div class="crawler-heading">Available properties:</div>
      <button
        v-for="property in nodes"
        :key="property"
        @click="selectProperty(property)"
        class="crawler-button"
      >
        {{ property }}
      </button>
    </div>
    <div class="crawler-group" v-else>
      <div class="crawler-heading">
        Property "{{ selectedNodes[selectedNodes.length - 1] }}" is a last node
        on that path
      </div>
      <p class="crawler-path"><span>Path:</span> {{ path }}</p>
    </div>
  </div>
</template>

<style scoped>
.crawler {
  padding: 50px 0;
}

.crawler-group:not(:last-child) {
  margin-bottom: 20px;
}

.crawler-heading {
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.3em 0.8em;
  margin-bottom: 10px;
}
.crawler-button {
  padding: 0.3em 0.8em;
  background: #fff;
  border: 1px solid #333;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.2s;
}

.crawler-button:hover {
  background: #ccc;
}

.crawler-path {
  padding: 0.3em 0.8em;
}

.crawler-path span {
  font-weight: 500;
}
</style>
