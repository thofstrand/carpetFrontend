<template>
  <div>
    <div class="title">
      <h1>Carpet Search</h1>
    </div>
    <div class="searchResultsContainer">
      <div class="searchResults" v-for="result in searchResults" :key="result.id">
        <img :src="imagePreview" alt="Preview image" class="preview-image">

      </div>

    </div>
    <div class="panel">
      <label for="image-upload">Upload an image:</label>
      <input id="image-upload" type="file" accept="image/*" v-on:change="previewImage">
      <div v-if="imagePreview">
        <img :src="imagePreview" alt="Preview image" class="preview-image">
      </div>
      
    </div>
  </div>
  
  
  
  
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const imagePreview = ref(null);
    const searchResults = "C:\\Users\\keerp\\Pictures\\bST.PNG"

    const previewImage = (event) => {
      const fileInput = event.target;
      if (fileInput.files && fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          imagePreview.value = reader.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      } else {
        imagePreview.value = null;
      }
    };

    return {
      imagePreview,
      previewImage,
      searchResults
    };
  },
};
</script>

<style>
.title{
  padding: 0px;
  padding-left: 350px;
  color:#020000;
  text-align:center;
}

.searchResultsContainer {
  position: absolute;
  top: 30px;
  left: 30%;
  width: calc(65% - 20px);
  margin: 20px;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  padding: 0;
  margin: 0;
  list-style: none;
}

.searchResults {
  max-width: 100%;
  max-height: 300px;
  margin-top: 30px;
}

.panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 350px;
  height: 100%;
  background-color: #79acf8;
  padding: 20px;
  box-sizing: border-box;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  margin-top: 30px;
}
</style>
