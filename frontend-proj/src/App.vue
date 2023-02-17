<template>
  <div>
    <div class="title">
      <h1>Carpet Search</h1>
    </div>
    <div class="searchResultsContainer">
      <div class="searchResults" v-for="(result, index) in searchResults" :key="index">
        <img :src="result.imgUrl" alt="Result image" class="result-image" @click="result.showHotelName = !result.showHotelName">
        <div class="hotel-name" v-show="result.showHotelName">{{ result.hotelName }}</div>

      </div>

    </div>
    <div class="panel">
      <label for="image-upload">Upload an image:</label>
      <input id="image-upload" type="file" accept="image/*" v-on:change="previewImage">
      <button @click="makeApiRequest">Fetch Data</button>
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
    const searchResults = ref([]);

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

    const makeApiRequest = () => {
      if (!imagePreview.value) {
        // The image preview is not set or is invalid, so we can't make the API request
        console.log('Image Preview value incorrect');
        return;
      }

      var axios = require('axios');
      var config = {
        method: 'get',
        url: '/api/images/MostSimilarImages',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      axios(config)
        .then(function (response) {
          searchResults.value = response.data
          console.log(searchResults.value)

        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      imagePreview,
      previewImage,
      makeApiRequest,
      searchResults,
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

.result-image {
  width: 150px;
  height: 150px;
}

.hotel-name {
  text-align: center;
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
