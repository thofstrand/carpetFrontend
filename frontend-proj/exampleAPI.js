var axios = require('axios');
var config = {
method: 'get',
url: 'http://52.36.76.233/api/images/MostSimilarImages',
headers: {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'},
};
axios(config)
.then(function (response) {
console.log(JSON.stringify(response.data));
})
.catch(function (error) {
console.log(error);
});