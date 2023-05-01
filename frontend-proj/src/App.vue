<template>
  <div>
    <div class="title">
      <h1>Carpet Search</h1>
      
    <!--Search results from the api call -->
    </div>
    <div class="searchResultsContainer">
      <div class="searchResults" v-for="(result, index) in searchResults" :key="index">
        <img :src="result.imgUrl" alt="Result image" class="result-image" :class="{ selected: selectedHotel === result }" @click="selectedHotel = result">
      </div>

    </div>
    <!--Side panel with file upload and hotel info -->
    <div class="panel">
      <!--Image upload -->
  <label for="image-upload">Upload an image:</label>
  <div class="image-upload-container">
    <input id="image-upload" type="file" accept="image/*" v-on:change="previewImage">
    <div v-if="imagePreview">
      <img :src="imagePreview" alt="Preview image" class="preview-image">
      <br>
      <button class="fetch-data-button" @click="makeApiRequest">Fetch Data</button>
      
    </div>
  </div>
  <hr>
  <!--Selected hotel info -->
  <div class="hotel-info" v-if="selectedHotel">
    <h2>Selected Hotel</h2>
    <div class="hotel-name">{{ selectedHotel.hotelName }}</div>
    <div class="hotel-address">{{ selectedHotel.address }}</div>
    <div class="hotel-phone">{{ selectedHotel.phone }}</div>
    <div class="hotel-description">{{ selectedHotel.description }}</div>
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
    const selectedHotel = ref(null);
    const fetchDataButton = ref(null);

    //This image will show the user what they have uploaded
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
        method: 'POST',
        url: 'http://52.36.76.233/api/images/MostSimilarImages',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "imgEncoded": imagePreview.value,
          "numMatches": 500, //num images returned which are sent to results container
        },
      };
      axios(config)
        .then(function (response) {
          searchResults.value = response.data
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response.data)
        });
    };

    return {
      imagePreview,
      previewImage,
      makeApiRequest,
      searchResults,
      selectedHotel,
    };
  },
};
</script>


<style>

body {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

h1, h2 {
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-color);

}

label {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-color);
}

.title{
  padding: 0px;
  padding-left: 350px;
  color:#020000;
  text-align:center;
}

.result-image.selected {
  border-color: #1100ff;
}

.searchResultsContainer {
  position: absolute;
  top: 40px;
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
  border: 3px solid transparent;
  cursor: pointer;
}

.hotel-name {
  text-align: center;
  margin-top: 30px;
  cursor: pointer;
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
  z-index: 1;
  overflow-y: scroll;
}

.panel label {
  display: block;
  margin-bottom: 10px;
}

.panel input[type="file"] {
  margin-bottom: 20px;
}

.panel button {
  background-color: #3366ff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.panel button:hover {
  background-color: #0039e6;
}

.panel .preview-image {
  max-width: 100%;
  max-height: 300px;
  margin-top: 30px;
}

.panel .hotel-info {
  margin-top: 30px;
}

.panel .hotel-info h2 {
  margin-top: 0;
}

.panel .hotel-info > div {
  margin-bottom: 10px;
  text-align: left;
}

.panel .hotel-info .hotel-name {
  text-align: left;
}

.panel .hotel-info .hotel-description {
  margin-top: 20px;
  text-align: left;
}

.panel .hotel-info .hotel-description p {
  margin-bottom: 10px;
}


</style>
