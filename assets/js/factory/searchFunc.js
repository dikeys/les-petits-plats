import { ajaxGet } from "../utils/requestFunc";
import selector from "./const";

async function displaySearchOption(recipeArray) {
  const arrays = [
    arrayUstensils(recipeArray),
    arrayAppliance(recipeArray),
    arrayIngredient(recipeArray)
  ];
  const selectors = [
    selector.ustensilsDatalist,
    selector.applianceDatalist,
    selector.ingredientDatalist
  ];

  for (let i = 0; i < arrays.length; i++) {
    createOption(arrays[i], selectors[i]);
  }
}

function createOption(arrayOption, selector) {
  for (let optionData of arrayOption) {
    let option = document.createElement("option");
    option.classList.add("search__datalist__option");
    option.value = optionData;
    option.textContent = optionData;
    selector.appendChild(option);
  }
}

function arrayUstensils(recipeArray) {
  let listAppliance = [];
  for (let recipes of recipeArray) {
    listAppliance.push(recipes.appliance);
  }
 
  return removeDuplicates(listAppliance);
}

function arrayIngredient(recipeArray) {
  let array = [];
  for (let recipes of recipeArray) {
    for (let recipe of recipes.ingredients) {
      array.push(recipe.ingredient);
    }
  }
  return removeDuplicates(array);
}
function arrayAppliance(recipeArray) {
  let listUstensils = [];
  for (let recipes of recipeArray) {
    for (let recipe of recipes.ustensils) {
      listUstensils.push(recipe);
    }
  }
  return removeDuplicates(listUstensils);
}

function removeDuplicates(array) {
  return Array.from(
    new Set(array.map(item => item.toLowerCase()))
  ).map(item => {
    let match = array.find(arrItem => arrItem.toLowerCase() === item);
    return match || item;
  });
}

export { displaySearchOption };
