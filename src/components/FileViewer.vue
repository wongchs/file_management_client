<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">File Details</h2>
      <template v-if="file">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-700">{{ file.name }}</h3>
          <div class="space-y-2">
            <p class="text-gray-600"><span class="font-medium">Size:</span> {{ file.size }} bytes</p>
            <p class="text-gray-600"><span class="font-medium">Type:</span> {{ file.type }}</p>
            <p class="text-gray-600">
              <span class="font-medium">Uploaded On:</span>
              {{ new Date(file.createdAt).toLocaleString() }}
            </p>
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <div v-if="!isEditing" class="flex justify-between items-start">
                <p class="text-gray-600 whitespace-pre-wrap">{{ file.description || 'No description' }}</p>
                <button @click="startEditing" class="ml-2 text-blue-500 hover:text-blue-700">
                  Edit
                </button>
              </div>
              <div v-else class="space-y-2">
                <textarea v-model="editedDescription"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3" maxlength="500"></textarea>
                <div class="flex space-x-2">
                  <button @click="saveDescription"
                    class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
                    Save
                  </button>
                  <button @click="cancelEditing"
                    class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex space-x-4 mt-6">
            <a :href="`http://localhost:5000/${file.path}`" target="_blank"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Download File
            </a>
            <button @click="deleteFile"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
              Delete File
            </button>
            <button @click="goBack"
              class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
              Back to List
            </button>
          </div>
        </div>
      </template>
      <div v-else class="text-gray-500 text-center py-4">
        Loading file details...
      </div>
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
const isEditing = ref(false);
const editedDescription = ref('');

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

const startEditing = () => {
  editedDescription.value = file.value.description || '';
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  editedDescription.value = '';
};

const saveDescription = async () => {
  try {
    const updatedFile = await api.updateDescription(props.fileId, editedDescription.value);
    file.value = updatedFile;
    isEditing.value = false;
  } catch (error) {
    console.error('Error updating description:', error);
  }
};

onMounted(() => {
  if (props.fileId) {
    fetchFileDetails();
  }
});
</script>
