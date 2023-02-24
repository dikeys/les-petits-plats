import * as tagFactory from "../factory/tagFactory";
import * as tagOptionFactory from "../factory/SearchFactory";
import * as tagSearch from "../utils/filterCardWithTag";
import * as recipeFactory from "../factory/recipeFactory"
import { selector } from "./selector";

export function displayTagList(inputSelectors) {
  for (const input of inputSelectors) {
    input.addEventListener("focusin", e => {
      e.target.placeholder =
        "Rechercher un " + e.target.dataset.name.toLowerCase();
      e.target.nextElementSibling.classList.add("search__data-list");
      e.target.previousElementSibling.classList.add("search__sort-img__active");
    });
  }
}

export function hideTagList(inputSelectors) {
  for (const input of inputSelectors) {
    input.addEventListener("focusout", e => {
      
      if (e.explicitOriginalTarget === selector.sectionSearch 
        || e.explicitOriginalTarget === selector.recipeSection 
        || e.explicitOriginalTarget === selector.headerSection 
        || e.explicitOriginalTarget === selector.divTag 
        ) {
        e.target.placeholder = e.target.dataset.name;
        e.target.nextElementSibling.classList.remove("search__data-list");
        e.target.previousElementSibling.classList.remove(
          "search__sort-img__active"
        );
      }
    });
  }
}

export function hideTagListAfterChose(selectors) {
  for (const selector of selectors) {
    selector.nextElementSibling.classList.remove("search__data-list");
    selector.previousElementSibling.classList.remove("search__sort-img__active");
  }
}

export function filterTagList(inputSelectors) {
  for (const inputSelector of inputSelectors) {
    inputSelector.addEventListener("input", e => {
      let text = e.target.value.toLowerCase();
      let options = e.target.nextElementSibling.options;
      for (const option of options) {
        option.style.display = option.value
          .toLowerCase()
          .includes(text.toLowerCase())
          ? "block"
          : "none";
      }
    });
  }
}

function searchByTagUstensils(data, type, value) {
  let result = [];
  for (const recipe of data) {
    for (const ustensil of recipe.ustensils) {
      if (ustensil.toLowerCase().includes(value.toLowerCase())) {
        result.push(recipe);
        break;
      }
    }
  }
  return result;
}

export function addTagButton(tagButtonContainer, recipeData) {
  let arrayTag = document.querySelectorAll(".search__data-list__option");
  for (let tag of arrayTag) {
    tag.addEventListener("click", e => {
    
      hideTagListAfterChose(selector.inputSearch)
   
      document.querySelector(".recipe").style.top = "450px";
      let tagExists = false;
      if (tagButtonContainer && tagButtonContainer.children) {
        for (let tagExist of tagButtonContainer.children) {
          if (tagExist.textContent === e.target.value) {
            tagExists = true;
            break;
          }
        }
      }
      if (!tagExists) {
        tagFactory.createButtonTag(e.target.value,e.target.parentNode.classList[0],tagButtonContainer);
       let recipes =  searchRecipesByKeywords(recipeData, tagButtonContainer.children)
       recipeFactory.createRecipesCard(recipes)
       tagOptionFactory.displayDataListOption(recipes)
       removeTagButton(tagButtonContainer.children, recipeData)
      }
    });
  }
}

function removeTagButton(tagsSelectors,recipeData) {
  console.log(tagsSelectors)
  for (let tag of tagsSelectors) {
    tag.firstElementChild.addEventListener("click", e => {
      console.log(tagsSelectors.length)
     
     
      e.target.parentNode.remove()
      if(tagsSelectors.length <1){
        document.querySelector(".recipe").style.top = "400px";
      }
      console.log(tagsSelectors)
      let recipes =  searchRecipesByKeywords(recipeData, tagsSelectors)
      console.log(recipes)
       recipeFactory.createRecipesCard(recipes)
       tagOptionFactory.displayDataListOption(recipes)
      
    });
  }
}


function searchRecipesByKeywords(data, keywords) {
  const results = [];
  for (const recipe of data) {
    const recipeKeywords = [];
    for (const ingredient of recipe.ingredients) {
      recipeKeywords.push(ingredient.ingredient);
    }
    recipeKeywords.push(recipe.appliance);
    for (const utensil of recipe.ustensils) {
      recipeKeywords.push(utensil);
    }
    let match = true;
    for (const keyword of keywords) {
      let keywordFound = false;
      for (const recipeKeyword of recipeKeywords) {
        if (recipeKeyword.toLowerCase().includes(keyword.textContent.toLowerCase())) {
          keywordFound = true;
          break;
        }
      }
      if (!keywordFound) {
        match = false;
        break;
      }
    }
    if (match) {
      results.push(recipe);
    }
  }
  return results;
}

