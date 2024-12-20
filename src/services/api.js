import axios from "axios";

const API_URL = "http://localhost:5000/api/files";

export default {
  fetchFiles: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching files:", error);
      throw error;
    }
  },

  uploadFile: async (formData) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  getFileDetails: async (fileId) => {
    if (!fileId) {
      throw new Error("File ID is required");
    }
    try {
      const response = await axios.get(`${API_URL}/${fileId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting file details:", error);
      throw error;
    }
  },

  deleteFile: async (fileId) => {
    try {
      const response = await axios.delete(`${API_URL}/${fileId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  },
  
  updateDescription: async (fileId, description) => {
    try {
      const response = await axios.put(`${API_URL}/${fileId}/description`, {
        description,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating description:", error);
      throw error;
    }
  },
};
