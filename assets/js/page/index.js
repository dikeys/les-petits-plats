import * as tag from "../utils/tagSearch";
import selector from "./selector";
import * as recipeFactory from "../factory/recipeFactory";
import { ajaxGet } from "../utils/fetchFunc";
import * as optionFactory from "../factory/searchFactory";
import *  as filterCard from '../utils/filterCardWithTag'
import * as mainSearch from "../utils/mainSearchBar"


async function init() {
  
  let recipes = await ajaxGet("../assets/js/data/recipes.json");
  recipeFactory.createRecipesCard(recipes);
  filterCard.filterRecipesCard(recipes, selector.inputSearch);
  optionFactory.displayDataListOption(recipes);
  //   utils.getFilterRecipesCard(recipes,selector.inputSearch)

  tag.displayTagList(selector.inputSearch);
  tag.addTagButton(selector.tagContainer, recipes)
  // tag.hideTagList(selector.inputSearch);
  tag.filterTagList(selector.inputSearch);
  mainSearch.displayRecipeMainsearchBar(recipes)
 
  

}

init();
