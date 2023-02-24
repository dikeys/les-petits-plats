import * as recipeFactory from "../factory/recipeFactory"
import * as searchFactory from "../factory/searchFactory"


 function filterRecipesCard(data, inputSelectors) {
    let arrayRecipes = [];
    for (const inputSelector of inputSelectors) {
      inputSelector.addEventListener("input", e => {
        arrayRecipes = [];
        for (const recipe of data) {
          for (const ingredient of recipe.ingredients) {
            if (ingredient.ingredient.toLowerCase().includes(e.target.value.toLowerCase())) {
              arrayRecipes.push(recipe);
              break;
            }
          }
        }
        recipeFactory.createRecipesCard(arrayRecipes);
      });
    }
  }


  function searchIngredient(recipes,ingredient) {
    let matchingRecipes = [];

    for (let recipe of recipes) {
      for (let ing of recipe.ingredients) {
        if (ing.ingredient.toLowerCase().includes(ingredient.toLowerCase())) {
          matchingRecipes.push(recipe);
          break;
        }
      }
    }
  
   return matchingRecipes

  }
  export {filterRecipesCard, searchIngredient}