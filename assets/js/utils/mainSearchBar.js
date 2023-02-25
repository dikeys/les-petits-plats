import { selector } from "./selector";
import * as recipeFactory from "../factory/recipeFactory";
import * as optionFactory from "../factory/tagFactory";
import * as tagSearch from "../utils/tagSearch";

function searchRecipe(recipes, searchTerm) {
  return recipes.filter(recipe => {
    const search = recipe.name.toLowerCase() + recipe.description.toLowerCase() +
      recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).join('');
    return search.includes(searchTerm.toLowerCase());
  });
}

export function displayRecipeMainsearchBar(recipes) {
  selector.mainSearch.addEventListener("input", e => {
    const recipesArray = searchRecipe(recipes, e.target.value);
    recipeFactory.createRecipesCard(recipesArray);
    optionFactory.displayDataListOption(recipesArray);
    tagSearch.addTagButton(selector.tagContainer, recipesArray);
  });
}
