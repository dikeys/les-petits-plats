import * as utils from "../utils/displayDataList";
import selector from "./selector";
import * as recipeFactory from "../factory/recipeFactory";
import { ajaxGet } from "../utils/requestFunc";
import * as optionFactory from "../factory/searchFunc";

async function init() {
  let recipes = await ajaxGet("../assets/js/data/recipes.json");
  recipeFactory.createRecipesCard(recipes);
  recipeFactory.getFilterRecipesCard(recipes,selector.inputSearch)
  optionFactory.displaySearchOption(recipes);
//   utils.getFilterRecipesCard(recipes,selector.inputSearch)
  utils.displayDataList(selector.inputSearch);
  utils.hideDataList(selector.inputSearch);
  utils.filterSearch(selector.inputSearch);

}

init();
