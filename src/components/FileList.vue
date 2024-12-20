<template>
  <div class="mt-8">
    <h2 class="text-2xl font-semibold mb-4 text-gray-700">Files</h2>
    <ul v-if="files.length" class="bg-white rounded-lg shadow divide-y divide-gray-200">
      <li v-for="file in files" :key="file._id" class="flex justify-between items-center p-4 hover:bg-gray-50">
        <router-link :to="{ name: 'file-viewer', params: { id: file._id } }" class="text-blue-600 hover:text-blue-800">
          {{ file.name }}
        </router-link>
        <button @click="deleteFile(file._id)"
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors">
          Delete
        </button>
      </li>
    </ul>
    <p v-else class="text-gray-500 text-center py-4">No files uploaded yet.</p>
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
