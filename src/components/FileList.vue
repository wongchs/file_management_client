<template>
  <div class="file-list">
    <h2>Files</h2>
    <ul v-if="files.length">
      <li v-for="file in files" :key="file._id" class="file-item">
        <router-link :to="{ name: 'file-viewer', params: { id: file._id } }">
          {{ file.name }}
        </router-link>
        <button @click="deleteFile(file._id)" class="delete-btn">Delete</button>
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

const deleteFile = async (fileId) => {
  if (confirm('Are you sure you want to delete this file?')) {
    try {
      await api.deleteFile(fileId);
      await loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
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

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #da190b;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>