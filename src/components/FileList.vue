<template>
  <div class="file-list">
    <h2>Files</h2>
    <ul v-if="files.length">
      <li v-for="file in files" :key="file._id">
        <router-link :to="{ name: 'file-viewer', params: { id: file._id } }">
          {{ file.name }}
        </router-link>
      </li>
    </ul>
    <p v-else>No files uploaded yet.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const files = ref([]);

const loadFiles = async () => {
  try {
    const result = await api.fetchFiles();
    files.value = result;
  } catch (error) {
    console.error('Error fetching files:', error);
  }
};

onMounted(loadFiles);

defineExpose({ loadFiles });
</script>

<style scoped>
.file-list {
  margin: 20px 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>