import * as tag from "../utils/tagSearch";
import selector from "./selector";
import * as recipeFactory from "../factory/recipeFactory";
import { ajaxGet } from "../utils/fetchFunc";
import * as optionFactory from "../factory/tagFactory";
import * as filterCard from "../utils/filterCardWithTag";
import * as mainSearch from "../utils/mainSearchBar";

async function init() {
  let recipes = await ajaxGet("../assets/js/data/recipes.json");
  console.time('createRecipesCard')
  recipeFactory.createRecipesCard(recipes);
  console.timeEnd('createRecipesCard')
  filterCard.filterRecipesCard(recipes, selector.inputSearch);
  optionFactory.displayDataListOption(recipes);
  tag.displayTagList(selector.inputSearch);
  tag.addTagButton(selector.tagContainer, recipes);
  tag.hideTagList(selector.inputSearch);
  tag.filterTagList(selector.inputSearch);
  mainSearch.displayRecipeMainsearchBar(recipes);
  tag.searchBytag(recipes)

}

init();
