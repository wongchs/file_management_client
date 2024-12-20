<template>
  <div class="file-upload">
    <h2>Upload File</h2>
    <form @submit.prevent="uploadFile">
      <input type="file" @change="onFileChange" />
      <button type="submit">Upload</button>
    </form>
    <p v-if="uploadStatus">{{ uploadStatus }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';

const emit = defineEmits(['file-uploaded']);
const selectedFile = ref(null);
const uploadStatus = ref('');

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    uploadStatus.value = 'Please select a file to upload.';
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    await api.uploadFile(formData);
    uploadStatus.value = 'File uploaded successfully!';
    selectedFile.value = null;
    emit('file-uploaded');
  } catch (error) {
    uploadStatus.value = 'Error uploading file: ' + error.message;
  }
};
</script>

<style scoped>
.file-upload {
  margin: 20px;
}

.file-upload h2 {
  margin-bottom: 10px;
}

.file-upload form {
  display: flex;
  flex-direction: column;
}

.file-upload input[type="file"] {
  margin-bottom: 10px;
}

.file-upload button {
  cursor: pointer;
}
</style>