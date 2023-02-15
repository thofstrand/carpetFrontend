<template>
  <div>
    <div class="title">
      <h1>Carpet Search</h1>
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

.panel {
  position: absolute;
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
