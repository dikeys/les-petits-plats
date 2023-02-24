import selector from "./const";

async function displayDataListOption(recipeArray) {
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
  selector.innerHTML = ""
  for (let optionData of arrayOption) {
    let option = document.createElement("option");
    option.classList.add("search__data-list__option");
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
  let uniqueArray = new Set();
  for (let item of array) {
    uniqueArray.add(item.toLowerCase());
  }
  let result = [];
  for (let item of uniqueArray) {
    let match = array.find(arrItem => arrItem.toLowerCase() === item);
    result.push(match || item);
  }
  return result;
}


function createButtonTag(text, color, container){
  let imgClose = document.createElement("img")
  imgClose.src = "../assets/img/close.svg";
  imgClose.classList.add("tag-list__close")
  let button = document.createElement("button")
  button.classList.add("btn", "btn--rounded-sm", "btn--color-white", "btn--mr-2", "btn--flex",color )
  button.textContent = text
  button.appendChild(imgClose)
  container.appendChild(button)
  return container
}
export { displayDataListOption, createButtonTag };
