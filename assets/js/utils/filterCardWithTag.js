import * as recipeFactory from "../factory/recipeFactory";
import * as searchFactory from "../factory/tagFactory";

function filterRecipesCard(data, inputSelectors) {
  inputSelectors.forEach(inputSelector => {
    inputSelector.addEventListener("input", e => {
      const filterText = e.target.value.toLowerCase();
      const filteredRecipes = [];
      data.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          if (ingredient.ingredient.toLowerCase().includes(filterText)) {
            filteredRecipes.push(recipe);
          }
        });
      });
      recipeFactory.createRecipesCard(filteredRecipes);
    });
  });
}

export { filterRecipesCard };
