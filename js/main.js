var allRecipes = [];

// get list of recipes that its mealType is lunch
var xhrLunch = new XMLHttpRequest();
xhrLunch.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&app_id=976754e0&app_key=591921aed583d2650315dfbe121daa37&mealType=Lunch&random=true');
xhrLunch.setRequestHeader('token', 'abc123');
xhrLunch.responseType = 'json';
xhrLunch.addEventListener('load', function () {
  for (var i = 0; i < xhrLunch.response.hits.length; i++) {
    allRecipes.push(xhrLunch.response.hits[i]);
  }

  // get list of recipes that its mealType is Breakfast
  var xhrBreakfast = new XMLHttpRequest();
  xhrBreakfast.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&app_id=976754e0&app_key=591921aed583d2650315dfbe121daa37&mealType=Breakfast&random=true');
  xhrBreakfast.setRequestHeader('token', 'abc123');
  xhrBreakfast.responseType = 'json';
  xhrBreakfast.addEventListener('load', function () {
    for (var i = 0; i < xhrBreakfast.response.hits.length; i++) {
      allRecipes.push(xhrBreakfast.response.hits[i]);
    }

    // get list of recipes that its mealType is Snack
    var xhrSnack = new XMLHttpRequest();
    xhrSnack.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&app_id=976754e0&app_key=591921aed583d2650315dfbe121daa37&mealType=Snack&random=true');
    xhrSnack.setRequestHeader('token', 'abc123');
    xhrSnack.responseType = 'json';
    xhrSnack.addEventListener('load', function () {

      for (var i = 0; i < xhrSnack.response.hits.length; i++) {
        allRecipes.push(xhrSnack.response.hits[i]);
      }

      // get list of recipes that its mealType is Teatime
      var xhrTeatime = new XMLHttpRequest();
      xhrTeatime.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&app_id=976754e0&app_key=591921aed583d2650315dfbe121daa37&mealType=Teatime&random=true');
      xhrTeatime.setRequestHeader('token', 'abc123');
      xhrTeatime.responseType = 'json';
      xhrTeatime.addEventListener('load', function () {

        for (var i = 0; i < xhrTeatime.response.hits.length; i++) {
          allRecipes.push(xhrTeatime.response.hits[i]);
        }

        // get list of recipes that its mealType is Dinner
        var xhrDinner = new XMLHttpRequest();
        xhrDinner.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&app_id=976754e0&app_key=591921aed583d2650315dfbe121daa37&mealType=Dinner&random=true');
        xhrDinner.setRequestHeader('token', 'abc123');
        xhrDinner.responseType = 'json';
        xhrDinner.addEventListener('load', function () {

          for (var i = 0; i < xhrDinner.response.hits.length; i++) {
            allRecipes.push(xhrDinner.response.hits[i]);
          }

          // Use a loop to create a DOM tree for each recipe in the data model and append it to the page
          for (var k = 0; k < allRecipes.length; k++) {
            var $containerForRecipes = document.querySelector('.container-for-recipes');
            $containerForRecipes.appendChild(renderRecipe(allRecipes[k]));
          }

        });
        xhrDinner.send();
      });
      xhrTeatime.send();
    });
    xhrSnack.send();
  });
  xhrBreakfast.send();
});
xhrLunch.send();

function renderRecipe(object) {
  var $recipeWrapper = document.createElement('div');
  $recipeWrapper.setAttribute('class', 'recipe-wrapper');

  // row 1: image
  var $row1 = document.createElement('div');
  $row1.setAttribute('class', 'row recipe-image-wrapper');
  $recipeWrapper.appendChild($row1);

  var $columnFull1 = document.createElement('div');
  $columnFull1.setAttribute('class', 'column-full');
  $row1.appendChild($columnFull1);

  var $image = document.createElement('img');
  $image.setAttribute('src', object.recipe.images.REGULAR.url);
  $image.setAttribute('alt', 'a picture of a recipe');
  $columnFull1.appendChild($image);

  // row 2: recipe name
  var $row2 = document.createElement('div');
  $row2.setAttribute('class', 'row recipe-text-wrapper');
  $recipeWrapper.appendChild($row2);

  var $columnFull2 = document.createElement('div');
  $columnFull2.setAttribute('class', 'column-full');
  $row2.appendChild($columnFull2);

  var $recipeName = document.createElement('p');
  $recipeName.setAttribute('class', 'recipe-name');
  $recipeName.textContent = object.recipe.label;
  $columnFull2.appendChild($recipeName);
  // resize($recipeName, $columnFull2);

  // row 3: recipe tiem & calories
  var $row3 = document.createElement('div');
  $row3.setAttribute('class', 'row recipe-text-wrapper');
  $recipeWrapper.appendChild($row3);

  var $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half timer-icon-wrapper');
  $row3.appendChild($columnHalf1);

  var $recipeTime = document.createElement('p');
  $recipeTime.setAttribute('class', 'recipe-time');
  $recipeTime.textContent = object.recipe.totalTime + ' min';
  $columnHalf1.appendChild($recipeTime);

  var $timerIcon = document.createElement('i');
  $timerIcon.setAttribute('class', 'fa-regular fa-clock fa-sm');
  $columnHalf1.appendChild($timerIcon);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row3.appendChild($columnHalf2);

  var $recipeCalories = document.createElement('p');
  $recipeCalories.setAttribute('class', 'recipe-calories');
  $recipeCalories.textContent = Math.round(object.recipe.calories) + ' calories';
  $columnHalf2.appendChild($recipeCalories);

  // row 4: number of recipe ingredients & type of cousine
  var $row4 = document.createElement('div');
  $row4.setAttribute('class', 'row recipe-text-wrapper');
  $recipeWrapper.appendChild($row4);

  var $columnHalf3 = document.createElement('div');
  $columnHalf3.setAttribute('class', 'column-half');
  $row4.appendChild($columnHalf3);

  var $recipeIngredients = document.createElement('p');
  $recipeIngredients.setAttribute('class', 'recipe-number-of-ingredients');
  $recipeIngredients.textContent = object.recipe.ingredients.length + ' ingredients';
  $columnHalf3.appendChild($recipeIngredients);

  var $columnHalf4 = document.createElement('div');
  $columnHalf4.setAttribute('class', 'column-half');
  $row4.appendChild($columnHalf4);

  var $recipeCousine = document.createElement('p');
  $recipeCousine.setAttribute('class', 'recipe-cousine');
  $recipeCousine.textContent = object.recipe.cuisineType;
  $recipeCousine.textContent = $recipeCousine.textContent.charAt(0).toUpperCase() + $recipeCousine.textContent.slice(1);
  $columnHalf4.appendChild($recipeCousine);

  return $recipeWrapper;
}

// Add a click event to A tages on navber
document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return null;
  }
  // Decides which page will be shown with the info by clicking
  viewSwapping(event.target.name);
});

// Add a click event to a button "see recipes→"
var $seeRecipesButton = document.querySelector('.see-recipes-button');
$seeRecipesButton.addEventListener('click', function () {
  viewSwapping('all-recipes');
});

// View swapping function
var $views = document.querySelectorAll('.view');
var $navber = document.querySelector('.navber');
function viewSwapping(dataView) {
  data.view = dataView;
  if (dataView === 'home') {
    $views[0].className = 'view';
    $views[1].className = 'view hidden';
    // $views[2].className = 'view hidden'; -- for favorites view add this later
    $navber.style.borderBottom = 'none';

  } else if (dataView === 'all-recipes') {
    $views[0].className = 'view hidden';
    $views[1].className = 'view';
    // $views[2].className = 'view hidden'; -- for favorites view add this later
    $navber.style.borderBottom = 'solid 0.5px black';
  }
  // else if (dataView === 'favorites') {
  //   $views[0].className = 'view hidden';
  //   $views[1].className = 'view hidden';
  //   $views[2].className = 'view'; -- for favorites view add this later
  //   $navber.style.borderBottom = 'solid 0.5px black';
  // }
}

document.addEventListener('DOMContentLoaded', function () {
  // refreshing the pages shows the same view as before refreshing
  viewSwapping(data.view);
});
