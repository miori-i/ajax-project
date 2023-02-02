var allRecipes = [];

// get list of recipes that its mealType is lunch
var xhrLunch = new XMLHttpRequest();
xhrLunch.open('GET', 'https://api.edamam.com/api/recipes/v2?type=public&app_id=976754e0&app_key=591921aed583d2650315dfbe121daa37&mealType=Lunch&random=true');
xhrLunch.setRequestHeader('token', 'abc123');
xhrLunch.responseType = 'json';
xhrLunch.addEventListener('error', loadingFailed);
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

          // Hide the loading spinner
          var $loadingSpinner = document.querySelector('.spinner-wrapper');
          $loadingSpinner.className = 'spinner-wrapper hidden';

          for (var i = 0; i < xhrDinner.response.hits.length; i++) {
            allRecipes.push(xhrDinner.response.hits[i]);
          }

          // Show no results message for the resulting data was empty or not found
          if (allRecipes.length === 0) {
            var $noResultsMessage = document.querySelector('.no-results-message');
            $noResultsMessage.className = 'no-results-message';

          } else {
            // Use a loop to create a DOM tree for each recipe in the data model and append it to the page
            for (var k = 0; k < allRecipes.length; k++) {
              var $containerForRecipes = document.querySelector('.container-for-recipes');
              $containerForRecipes.appendChild(renderRecipe(allRecipes[k]));
            }

            // Listen for clicks on the parent element of all rendered recipes in all recipes view
            $containerForRecipes.addEventListener('click', function (event) {
              if (event.target.getAttribute('class') === 'recipe-image' || event.target.getAttribute('class') === 'recipe-time' || event.target.getAttribute('class') === 'recipe-calories' || event.target.getAttribute('class') === 'recipe-cousine' || event.target.getAttribute('class') === 'recipe-wrapper' || event.target.getAttribute('class') === 'column-half timer-icon-wrapper' || event.target.getAttribute('class') === 'recipe-number-of-ingredients' || event.target.getAttribute('class') === 'recipe-name' || event.target.getAttribute('class') === 'fa-regular fa-clock fa-sm') {
                var recipeLabel = event.target.closest('li').getAttribute('recipe-label');
                for (var i = 0; i < allRecipes.length; i++) {
                  if (allRecipes[i].recipe.label === recipeLabel) {
                    data.details = allRecipes[i];
                  }
                }
                viewSwapping('recipe-details');
                enterValuesForRecipeDetails(data.details);
              }
            });

            // Listen for "change" events on the drop - down boxes
            var $selectTypeOfCuisine = document.getElementById('type-of-cuisine');
            $selectTypeOfCuisine.addEventListener('change', filterTypeOfCuisine);
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

function loadingFailed(res) {
  // Hide the loading spinner
  var $loadingSpinner = document.querySelector('.spinner-wrapper');
  $loadingSpinner.className = 'spinner-wrapper hidden';

  // Show the network error(includes a limit error) message
  if (res.currentTarget.status === 0) {
    var $networkError = document.querySelector('.network-error-message.hidden');
    $networkError.className = 'network-error-message';
  }
}

function renderRecipe(object) {
  var $recipeWrapper = document.createElement('li');
  $recipeWrapper.setAttribute('class', 'recipe-wrapper');
  $recipeWrapper.setAttribute('recipe-label', object.recipe.label);

  // row 1: image
  var $row1 = document.createElement('div');
  $row1.setAttribute('class', 'row recipe-image-wrapper');
  $recipeWrapper.appendChild($row1);

  var $columnFull1 = document.createElement('div');
  $columnFull1.setAttribute('class', 'column-full');
  $row1.appendChild($columnFull1);

  var $image = document.createElement('img');
  $image.setAttribute('src', object.recipe.images.REGULAR.url);
  $image.setAttribute('alt', 'a pic of ' + object.recipe.label);
  $image.setAttribute('class', 'recipe-image');
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
  $timerIcon.setAttribute('class', 'fa-regular fa-clock');
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
  data.view = dataView; // Set view in data to show the same view as before erfreshing.

  if (dataView === 'home') {
    $views[0].className = 'view';
    $views[1].className = 'view hidden';
    $views[2].className = 'view hidden';
    $views[3].className = 'view hidden';
    $navber.style.borderBottom = '';
    // Clear the values up when user leave all recipes view.
    data.details = null;
    // Reset the star icon
    $starIcon.className = 'fa-regular fa-star';

  } else if (dataView === 'all-recipes') {
    $views[0].className = 'view hidden';
    $views[1].className = 'view';
    $views[2].className = 'view hidden';
    $views[3].className = 'view hidden';
    $navber.style.borderBottom = 'solid 0.5px black';
    data.details = null;
    $starIcon.className = 'fa-regular fa-star';

  } else if (dataView === 'recipe-details') {
    $views[0].className = 'view hidden';
    $views[1].className = 'view hidden';
    $views[2].className = 'view';
    $views[3].className = 'view hidden';
    $navber.style.borderBottom = 'solid 0.5px black';
    // Keep star icon yellow if the recipe was saved in favorites list
    for (var i = 0; i < data.favorites.length; i++) {
      if (data.details.recipe.label === data.favorites[i].recipe.label) {
        $starIcon.className = 'fa-solid fa-star';
      }
    }
    // Reset domtree and the number of comment up and show correct domtree and #
    var $commentList = document.getElementById('comment-list');
    while ($commentList.firstChild) {
      $commentList.removeChild($commentList.firstChild);
    }
    var $numberOfComments = document.querySelector('.number-of-comments');
    $numberOfComments.textContent = '0 comments';
    showCommentsForCorrectRecipe();

  } else if (dataView === 'favorites') {
    $views[0].className = 'view hidden';
    $views[1].className = 'view hidden';
    $views[2].className = 'view hidden';
    $views[3].className = 'view';
    $navber.style.borderBottom = 'solid 0.5px black';
    data.details = null;
    $starIcon.className = 'fa-regular fa-star';
    // Hide "No recipes have been added in favorites." if favorites array is not empty
    if (data.favorites.length > 0) {
      var $noRecipeInFavorites = document.querySelector('.no-recipes-in-favirites');
      $noRecipeInFavorites.className = 'no-recipes-in-favirites hidden';
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  showCommentsForCorrectRecipe();

  // refreshing the pages shows the same view as before refreshing
  viewSwapping(data.view);
  enterValuesForRecipeDetails(data.details);
});

function enterValuesForRecipeDetails(object) {

  if (object === null) {
    return;
  }
  var $recipeDetailsMin = document.querySelector('.recipe-details-min');
  $recipeDetailsMin.textContent = object.recipe.totalTime + ' min';

  var $recipeDetailsCal = document.querySelector('.recipe-details-cal');
  $recipeDetailsCal.textContent = Math.round(object.recipe.calories) + ' calories';

  var $recipeDetailsType = document.querySelector('.recipe-details-type');
  $recipeDetailsType.textContent = object.recipe.cuisineType;
  $recipeDetailsType.textContent = $recipeDetailsType.textContent.charAt(0).toUpperCase() + $recipeDetailsType.textContent.slice(1);

  var $recipeDetailsTitle = document.querySelector('.recipe-details-title');
  $recipeDetailsTitle.textContent = object.recipe.label;

  var $imageForRecipeDetails = document.querySelector('.image-for-recipe-details');
  $imageForRecipeDetails.setAttribute('src', object.recipe.images.REGULAR.url);
  $imageForRecipeDetails.setAttribute('alt', 'a pic of ' + object.recipe.label);

  var $ingredientsList = document.querySelector('.ingredients-list');
  for (var n = 0; n < object.recipe.ingredientLines.length; n++) {
    var $ingredientsListItem = document.createElement('li');
    var $ingredient = document.createElement('p');
    $ingredient.textContent = object.recipe.ingredientLines[n];
    $ingredientsListItem.appendChild($ingredient);
    $ingredientsList.appendChild($ingredientsListItem);
  }

  var $originalUrl = document.querySelector('.original-url');
  $originalUrl.setAttribute('href', object.recipe.url);
  $originalUrl.textContent = object.recipe.source;

  var $fat = document.querySelector('.fat');
  $fat.textContent = Math.round(object.recipe.totalNutrients.FAT.quantity) + object.recipe.totalNutrients.FAT.unit;

  var $saturated = document.querySelector('.saturated');
  $saturated.textContent = Math.round(object.recipe.totalNutrients.FASAT.quantity) + object.recipe.totalNutrients.FASAT.unit;

  var $trans = document.querySelector('.trans');
  $trans.textContent = Math.round(object.recipe.totalNutrients.FATRN.quantity) + object.recipe.totalNutrients.FATRN.unit;

  var $monounsaturated = document.querySelector('.monounsaturated');
  $monounsaturated.textContent = Math.round(object.recipe.totalNutrients.FAMS.quantity) + object.recipe.totalNutrients.FAMS.unit;

  var $polyunsaturated = document.querySelector('.polyunsaturated');
  $polyunsaturated.textContent = Math.round(object.recipe.totalNutrients.FAPU.quantity) + object.recipe.totalNutrients.FAPU.unit;

  var $carbs = document.querySelector('.carbs');
  $carbs.textContent = Math.round(object.recipe.totalNutrients.CHOCDF.quantity) + object.recipe.totalNutrients.CHOCDF.unit;

  var $carbsNet = document.querySelector('.carbsNet');
  $carbsNet.textContent = Math.round(object.recipe.totalNutrients['CHOCDF.net'].quantity) + object.recipe.totalNutrients['CHOCDF.net'].unit;

  var $fiber = document.querySelector('.fiber');
  $fiber.textContent = Math.round(object.recipe.totalNutrients.FIBTG.quantity) + object.recipe.totalNutrients.FIBTG.unit;

  var $sugars = document.querySelector('.sugars');
  $sugars.textContent = Math.round(object.recipe.totalNutrients.SUGAR.quantity) + object.recipe.totalNutrients.SUGAR.unit;

  var $sugarsAdded = document.querySelector('.sugarsAdded');
  $sugarsAdded.textContent = Math.round(object.recipe.totalNutrients['SUGAR.added'].quantity) + object.recipe.totalNutrients['SUGAR.added'].unit;

  var $protein = document.querySelector('.protein');
  $protein.textContent = Math.round(object.recipe.totalNutrients.PROCNT.quantity) + object.recipe.totalNutrients.PROCNT.unit;

  var $cholesterol = document.querySelector('.cholesterol');
  $cholesterol.textContent = Math.round(object.recipe.totalNutrients.CHOLE.quantity) + object.recipe.totalNutrients.CHOLE.unit;

  var $sodium = document.querySelector('.sodium');
  $sodium.textContent = Math.round(object.recipe.totalNutrients.NA.quantity) + object.recipe.totalNutrients.NA.unit;

  var $calcium = document.querySelector('.calcium');
  $calcium.textContent = Math.round(object.recipe.totalNutrients.CA.quantity) + object.recipe.totalNutrients.CA.unit;

  var $magnesium = document.querySelector('.magnesium');
  $magnesium.textContent = Math.round(object.recipe.totalNutrients.MG.quantity) + object.recipe.totalNutrients.MG.unit;

  var $potassium = document.querySelector('.potassium');
  $potassium.textContent = Math.round(object.recipe.totalNutrients.K.quantity) + object.recipe.totalNutrients.K.unit;

  var $iron = document.querySelector('.iron');
  $iron.textContent = Math.round(object.recipe.totalNutrients.FE.quantity) + object.recipe.totalNutrients.FE.unit;

  var $zinc = document.querySelector('.zinc');
  $zinc.textContent = Math.round(object.recipe.totalNutrients.ZN.quantity) + object.recipe.totalNutrients.ZN.unit;

  var $phosphorus = document.querySelector('.phosphorus');
  $phosphorus.textContent = Math.round(object.recipe.totalNutrients.P.quantity) + object.recipe.totalNutrients.P.unit;

  var $vitaminA = document.querySelector('.vitaminA');
  $vitaminA.textContent = Math.round(object.recipe.totalNutrients.VITA_RAE.quantity) + object.recipe.totalNutrients.VITA_RAE.unit;

  var $vitaminC = document.querySelector('.vitaminC');
  $vitaminC.textContent = Math.round(object.recipe.totalNutrients.VITC.quantity) + object.recipe.totalNutrients.VITC.unit;

  var $thiaminB1 = document.querySelector('.thiaminB1');
  $thiaminB1.textContent = Math.round(object.recipe.totalNutrients.THIA.quantity) + object.recipe.totalNutrients.THIA.unit;

  var $riboflavinB2 = document.querySelector('.riboflavinB2');
  $riboflavinB2.textContent = Math.round(object.recipe.totalNutrients.RIBF.quantity) + object.recipe.totalNutrients.RIBF.unit;

  var $niacinB3 = document.querySelector('.niacinB3');
  $niacinB3.textContent = Math.round(object.recipe.totalNutrients.NIA.quantity) + object.recipe.totalNutrients.NIA.unit;

  var $vitaminB6 = document.querySelector('.vitaminB6');
  $vitaminB6.textContent = Math.round(object.recipe.totalNutrients.VITB6A.quantity) + object.recipe.totalNutrients.VITB6A.unit;

  var $folateEquivalentTotal = document.querySelector('.folateEquivalentTotal');
  $folateEquivalentTotal.textContent = Math.round(object.recipe.totalNutrients.FOLDFE.quantity) + object.recipe.totalNutrients.FOLDFE.unit;

  var $folateFood = document.querySelector('.folateFood');
  $folateFood.textContent = Math.round(object.recipe.totalNutrients.FOLFD.quantity) + object.recipe.totalNutrients.FOLFD.unit;

  var $folicAcid = document.querySelector('.folateFood');
  $folicAcid.textContent = Math.round(object.recipe.totalNutrients.FOLAC.quantity) + object.recipe.totalNutrients.FOLAC.unit;

  var $vitaminB12 = document.querySelector('.vitaminB12');
  $vitaminB12.textContent = Math.round(object.recipe.totalNutrients.VITB12.quantity) + object.recipe.totalNutrients.VITB12.unit;

  var $vitaminD = document.querySelector('.vitaminD');
  $vitaminD.textContent = Math.round(object.recipe.totalNutrients.VITD.quantity) + object.recipe.totalNutrients.VITD.unit;

  var $vitaminE = document.querySelector('.vitaminE');
  $vitaminE.textContent = Math.round(object.recipe.totalNutrients.TOCPHA.quantity) + object.recipe.totalNutrients.TOCPHA.unit;

  var $vitaminK = document.querySelector('.vitaminK');
  $vitaminK.textContent = Math.round(object.recipe.totalNutrients.VITK1.quantity) + object.recipe.totalNutrients.VITK1.unit;

  var $sugarAlcohols = document.querySelector('.sugarAlcohols');
  $sugarAlcohols.textContent = Math.round(object.recipe.totalNutrients['Sugar.alcohol'].quantity) + object.recipe.totalNutrients['Sugar.alcohol'].unit;

  var $water = document.querySelector('.water');
  $water.textContent = Math.round(object.recipe.totalNutrients.WATER.quantity) + object.recipe.totalNutrients.WATER.unit;
}

// Listen for clicks on the star icon to save the recipe to favorites list
var $starIcon = document.querySelector('.fa-regular.fa-star');
$starIcon.addEventListener('click', function () {
  $starIcon.className = 'fa-solid fa-star';
  // Add the current recipe to the favorites list if it haven't saved yet
  var alreadyInFavoritesList = null;
  for (var i = 0; i < data.favorites.length; i++) {
    if (data.details.recipe.label === data.favorites[i].recipe.label) {
      alreadyInFavoritesList = 'yes';
      break;
    } else {
      alreadyInFavoritesList = 'no';
    }
  }
  if (alreadyInFavoritesList === 'no' || alreadyInFavoritesList === null) {
    data.favorites.push(data.details);
    var $containerForFavorites = document.querySelector('.container-for-favorites');
    $containerForFavorites.appendChild(renderRecipe(data.details));
  }
});

// Use a loop to create a DOM tree for each recipe of favorites list and append it to the page
var $containerForFavorites = document.querySelector('.container-for-favorites');
for (var n = 0; n < data.favorites.length; n++) {
  $containerForFavorites.appendChild(renderRecipe(data.favorites[n]));
}

// Listen for clicks on the parent element of all rendered recipes in favorites view to see the details of the clicked recipe
$containerForFavorites.addEventListener('click', viewRecipeDetails);

function viewRecipeDetails(event) {
  if (event.target.getAttribute('class') === 'recipe-image' || event.target.getAttribute('class') === 'recipe-time' || event.target.getAttribute('class') === 'recipe-calories' || event.target.getAttribute('class') === 'recipe-cousine' || event.target.getAttribute('class') === 'recipe-wrapper' || event.target.getAttribute('class') === 'column-half timer-icon-wrapper' || event.target.getAttribute('class') === 'recipe-number-of-ingredients' || event.target.getAttribute('class') === 'recipe-name' || event.target.getAttribute('class') === 'fa-regular fa-clock fa-sm') {

    var recipeLabel = event.target.closest('li').getAttribute('recipe-label');
    for (var i = 0; i < data.favorites.length; i++) {
      if (data.favorites[i].recipe.label === recipeLabel) {
        data.details = data.favorites[i];
      }
    }
    viewSwapping('recipe-details');
    enterValuesForRecipeDetails(data.details);
  }
}

// Listen for 'submit' events on the comment form
var $form = document.querySelector('.comment-form');
$form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Check is the conversation object for the resipe exists alread
  var exist = null;
  if (data.conversation.length === 0) {
    exist = 'no';
  }
  for (var i = 0; i < data.conversation.length; i++) {
    if (data.details.recipe.label === data.conversation[i].label) {
      exist = 'yes';
      break;
    } else {
      exist = 'no';
    }
  }

  // If the conversation object exists for the recipe and put the form's input values into a new object.
  if (exist === 'yes') {

    // Create new comment object and put the form's input
    var newComment = {};
    newComment.name = $form.elements.name.value;
    newComment.comment = $form.elements.comment.value;

    // Append the new object to comments in the data model
    data.conversation[i].comments.push(newComment);

    // Creates a new DOM tree for it and adds it to the page
    var newDOMtree = renderComment(newComment);
    var $commentList = document.querySelector('#comment-list');
    $commentList.appendChild(newDOMtree);

    // Add underline of the comment that was last before adding new commnet
    var $commentWrappers = document.querySelectorAll('.comment-wrapper');
    $commentWrappers[$commentWrappers.length - 2].style.border = '';

    // Remove underline of the last comment
    $commentWrappers = document.querySelectorAll('.comment-wrapper');
    $commentWrappers[$commentWrappers.length - 1].style.border = 'none';

  }

  if (exist === 'no') {
  // If the conversation object doesn't exist for the recipe and create new object.
    var conversationObject = {};
    conversationObject.label = data.details.recipe.label;
    conversationObject.comments = [];
    data.conversation.push(conversationObject);

    // Put the form's input values into a new object.
    newComment = {};
    newComment.name = $form.elements.name.value;
    newComment.comment = $form.elements.comment.value;

    // Append the new object to comments in the data model
    data.conversation[data.conversation.length - 1].comments.push(newComment);

    // Creates a new DOM tree for the coment and adds it to the page
    newDOMtree = renderComment(newComment);
    $commentList = document.querySelector('#comment-list');
    $commentList.appendChild(newDOMtree);

    // Remove underline of the last comment
    $commentWrappers = document.querySelectorAll('.comment-wrapper');
    $commentWrappers[$commentWrappers.length - 1].style.border = 'none';

  }

  // Updata the number of comments
  for (var n = 0; n < data.conversation.length; n++) {
    if (data.details.recipe.label === data.conversation[n].label) {
      var $numberOfComments = document.querySelector('.number-of-comments');
      $numberOfComments.textContent = data.conversation[n].comments.length + ' comments';
    }
  }

  // Reset the form inputs.
  $form.reset();
});

// Render function for each comment
function renderComment(object) {
  var $commentWrapper = document.createElement('li');
  $commentWrapper.setAttribute('class', 'comment-wrapper');

  var $nameOfcomment = document.createElement('p');
  $nameOfcomment.setAttribute('class', 'name-of-comment');
  $nameOfcomment.textContent = object.name;
  $commentWrapper.appendChild($nameOfcomment);

  var $textOfComment = document.createElement('p');
  $textOfComment.setAttribute('class', 'text-of-comment');
  $textOfComment.textContent = object.comment;
  $commentWrapper.appendChild($textOfComment);

  return $commentWrapper;
}

// Use a loop to create a DOM tree for each comment pbject in the data model and append it to the page.
function showCommentsForCorrectRecipe() {
  if (data.details !== null) {
    for (var i = 0; i < data.conversation.length; i++) {
      if (data.details.recipe.label === data.conversation[i].label) {
        for (var k = 0; k < data.conversation[i].comments.length; k++) {
          var domTree = renderComment(data.conversation[i].comments[k]);
          var $commentList = document.querySelector('#comment-list');
          $commentList.appendChild(domTree);
        }
        // Updata the number of comments
        var $numberOfComments = document.querySelector('.number-of-comments');
        $numberOfComments.textContent = data.conversation[i].comments.length + ' comments';

        // Remove the underline of the last comment
        var $commentWrappers = document.querySelectorAll('.comment-wrapper');
        $commentWrappers[$commentWrappers.length - 1].style.border = 'none';
      }
    }
  }
}

// Filter recipes by cuisine type and show them by using a loop to create a DOM tree for each recipe in the data model and append it to the page
function filterTypeOfCuisine(event) {
  // value = selected type pf cuisine
  var value = event.currentTarget.value;

  // Clear domtree up
  var $containerForRecipes = document.querySelector('.container-for-recipes');
  while ($containerForRecipes.firstChild) {
    $containerForRecipes.removeChild($containerForRecipes.firstChild);
  }

  if (value === 'american') {
    // Show the macching recipes by using a loop to create a DOM tree for each recipe in the data model and append it to the page
    for (var i = 0; i < allRecipes.length; i++) {
      for (var n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'american') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    // Show message if there is no matching recipe
    var hasChiledelement = $containerForRecipes.hasChildNodes(); // Check if there is child element of the recipe container
    if (hasChiledelement === false) {
      var $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no American recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'asian') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'asian') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Asian recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'british') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'british') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no British recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'caribbean') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'caribbean') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Caribbean recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'central-europe') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'central europe') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Central Europe recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'chinese') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'chinese') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Chinese recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'eastern-europe') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'eastern europe') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Eastern Europe recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'french') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'french') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no French recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'greek') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'greek') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Greek recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'indian') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'indian') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Indian recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'italian') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'italian') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Italian recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'japanese') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'japanese') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Japanese recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'korean') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'korean') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Korean recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'kosher') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'kosher') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Kosher recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'mediterranean') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'mediterranean') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Mediterranean recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'mexican') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'mexican') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Mexican recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'middle-eastern') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'middle eastern') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Middle Eastern recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'nordic') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'nordic') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no Nordic recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'south-american') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'south american') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no South American recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'south-east-asian') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'south east asian') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no South East Asian recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'world') {
    for (i = 0; i < allRecipes.length; i++) {
      for (n = 0; n < allRecipes[i].recipe.cuisineType.length; n++) {
        if (allRecipes[i].recipe.cuisineType[n] === 'world') {
          $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
        }
      }
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no World recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }

  } else if (value === 'cuisine-type') {
    for (i = 0; i < allRecipes.length; i++) {
      $containerForRecipes.appendChild(renderRecipe(allRecipes[i]));
    }
    hasChiledelement = $containerForRecipes.hasChildNodes();
    if (hasChiledelement === false) {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = 'There is no recipe.';
    } else {
      $noRecipeMessage = document.querySelector('.no-recipe-message');
      $noRecipeMessage.textContent = ' ';
    }
  }

}
