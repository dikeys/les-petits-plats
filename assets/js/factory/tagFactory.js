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

  arrays.forEach((arrayOption, i) => {
    createOption(arrayOption, selectors[i]);
  });
}

function createOption(arrayOption, selector) {
  selector.innerHTML = "";
  arrayOption.forEach((optionData) => {
    let option = document.createElement("option");
    option.classList.add("search__data-list__option");
    option.value = optionData;
    option.textContent = optionData;
    selector.appendChild(option);
  });
}

function arrayUstensils(recipeArray) {
  let listAppliance = recipeArray.map((recipes) => recipes.appliance);
  return removeDuplicates(listAppliance);
}

function arrayIngredient(recipeArray) {
  let array = [];
  recipeArray.forEach((recipes) => {
    recipes.ingredients.forEach((recipe) => {
      array.push(recipe.ingredient);
    });
  });
  return removeDuplicates(array);
}

function arrayAppliance(recipeArray) {
  let listUstensils = [];
  recipeArray.forEach((recipes) => {
    recipes.ustensils.forEach((recipe) => {
      listUstensils.push(recipe);
    });
  });
  return removeDuplicates(listUstensils);
}

function removeDuplicates(array) {
  let uniqueArray = new Set(array.map((item) => item.toLowerCase()));
  let result = Array.from(uniqueArray).map((item) =>
    array.find((arrItem) => arrItem.toLowerCase() === item)
  );
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
