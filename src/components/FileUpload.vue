<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4 text-gray-700">Upload File</h2>
    <form @submit.prevent="uploadFile" class="space-y-4">
      <div class="flex items-center justify-center w-full">
        <label class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
          <div class="flex flex-col items-center justify-center pt-7">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
              viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd" />
            </svg>
            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
              Select a file
            </p>
          </div>
          <input type="file" class="opacity-0" @change="onFileChange" />
        </label>
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
        Upload
      </button>
    </form>
    <div v-if="uploadStatus" class="mt-4 text-center p-3 rounded-md" :class="{
      'bg-green-50 text-green-700': isSuccess,
      'bg-red-50 text-red-700': isError
    }">
      {{ uploadStatus }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '../services/api';

const emit = defineEmits(['file-uploaded']);
const selectedFile = ref(null);
const uploadStatus = ref('');

const isSuccess = computed(() => uploadStatus.value.includes('successfully'));
const isError = computed(() => uploadStatus.value.includes('Error') || uploadStatus.value.includes('Please'));

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
