import { selector } from "./selector";
import * as recipeFactory from "../factory/recipeFactory";
import * as optionFactory from "../factory/searchFactory";
import * as tagSearch from "../utils/tagSearch"

function searchRecipe(recipes, searchTerm) {
  let results = [];

  for (const recipe of recipes) {
    let search = recipe.name.toLowerCase() + recipe.description.toLowerCase();
    for (const ingredient of recipe.ingredients) {
      search += ingredient.ingredient.toLowerCase();
    }
    if (search.includes(searchTerm.toLowerCase())) {
      results.push(recipe);
    }
  }
  return results;
}

export function displayRecipeMainsearchBar(recipes) {
  selector.mainSearch.addEventListener("input", e => {
    const recipesArray = searchRecipe(recipes, e.target.value)
    recipeFactory.createRecipesCard(recipesArray)
    optionFactory.displayDataListOption(recipesArray)
    tagSearch.addTagButton(selector.tagContainer, recipesArray)
   
  });
}
