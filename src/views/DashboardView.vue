<template>
  <div class="dashboard">
    <h1>File Management Dashboard</h1>
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