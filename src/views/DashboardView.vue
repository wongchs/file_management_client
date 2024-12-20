<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">File Management Dashboard</h1>
    <FileUpload @file-uploaded="refreshFileList" />
    <FileList ref="fileList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FileUpload from '../components/FileUpload.vue'
import FileList from '../components/FileList.vue'

const fileList = ref(null)

const refreshFileList = () => {
  fileList.value.loadFiles()
}
</script>