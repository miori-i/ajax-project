var allRecipes = [];

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&q=christmas&app_id=976754e0&app_key=591921aed583d2650315dfbe121daa37');
xhr.setRequestHeader('token', 'abc123');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  // console.log(xhr.response);

  for (var i = 0; i < xhr.response.hits.length; i++) {
    allRecipes.push(xhr.response.hits[i]);
  }

});
xhr.send();

// console.log('allRecipes:', allRecipes);
