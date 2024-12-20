<template>
  <div class="file-viewer">
    <h2>File Details</h2>
    <div v-if="file">
      <h3>{{ file.name }}</h3>
      <p><strong>Size:</strong> {{ file.size }} bytes</p>
      <p><strong>Type:</strong> {{ file.type }}</p>
      <p><strong>Uploaded On:</strong> {{ new Date(file.createdAt).toLocaleString() }}</p>
      <div class="actions">
        <a :href="`http://localhost:5000/${file.path}`" target="_blank" class="download-link">Download File</a>
        <button @click="deleteFile" class="delete-button">Delete File</button>
        <button @click="goBack" class="back-button">Back to List</button>
      </div>
    </div>
    <div v-else>
      <p>Loading file details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const props = defineProps({
  fileId: {
    type: String,
    required: true
  }
});

const router = useRouter();
const file = ref(null);

const fetchFileDetails = async () => {
  try {
    const response = await api.getFileDetails(props.fileId);
    file.value = response;
  } catch (error) {
    console.error('Error fetching file details:', error);
  }
};

const deleteFile = async () => {
  if (confirm('Are you sure you want to delete this file?')) {
    try {
      await api.deleteFile(props.fileId);
      router.push({ name: 'dashboard' });
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
};

const goBack = () => {
  router.push({ name: 'dashboard' });
};

onMounted(() => {
  if (props.fileId) {
    fetchFileDetails();
  }
});
</script>

<style scoped>
.file-viewer {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.download-link,
.back-button,
.delete-button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}

.download-link {
  background-color: #4CAF50;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
}

.back-button {
  background-color: #42b983;
  color: white;
  border: none;
}

.download-link:hover {
  background-color: #45a049;
}

.delete-button:hover {
  background-color: #da190b;
}

.back-button:hover {
  background-color: #3aa876;
}
</style>