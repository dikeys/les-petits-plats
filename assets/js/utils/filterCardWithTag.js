import * as recipeFactory from "../factory/recipeFactory";
import * as searchFactory from "../factory/tagFactory";

function filterRecipesCard(data, inputSelectors) {
  let arrayRecipes = [];
  for (const inputSelector of inputSelectors) {
    inputSelector.addEventListener("input", e => {
      arrayRecipes = [];
      for (const recipe of data) {
        for (const ingredient of recipe.ingredients) {
          if (
            ingredient.ingredient
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            arrayRecipes.push(recipe);
            break;
          }
        }
      }
      recipeFactory.createRecipesCard(arrayRecipes);
    });
  }
}

export { filterRecipesCard };
