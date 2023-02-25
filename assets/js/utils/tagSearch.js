import * as tagFactory from "../factory/tagFactory";
import * as recipeFactory from "../factory/recipeFactory";
import { selector } from "./selector";

export function displayTagList(inputSelectors) {
  inputSelectors.forEach(input => {
    input.addEventListener("focusin", e => {
      e.target.placeholder = `Rechercher un ${e.target.dataset.name.toLowerCase()}`;
      e.target.nextElementSibling.classList.add("search__data-list");
      e.target.previousElementSibling.classList.add("search__sort-img__active");
    });
  });
}

export function hideTagList(inputSelectors) {
  inputSelectors.forEach(input => {
    input.addEventListener("focusout", e => {
      if (
        [selector.sectionSearch, selector.recipeSection, selector.headerSection, selector.divTag].includes(e.explicitOriginalTarget)
      ) {
        e.target.placeholder = e.target.dataset.name;
        e.target.nextElementSibling.classList.remove("search__data-list");
        e.target.previousElementSibling.classList.remove("search__sort-img__active");
      }
    });
  });
}

export function hideTagListAfterChose(selectors) {
  selectors.forEach(selector => {
    selector.nextElementSibling.classList.remove("search__data-list");
    selector.previousElementSibling.classList.remove("search__sort-img__active");
  });
}

export function filterTagList(inputSelectors) {
  inputSelectors.forEach(inputSelector => {
    inputSelector.addEventListener("input", e => {
      const text = e.target.value.toLowerCase();
      const options = Array.from(e.target.nextElementSibling.options);
      options.forEach(option => {
        option.style.display = option.value.toLowerCase().includes(text)
          ? "block"
          : "none";
      });
    });
  });
}

export function addTagButton(tagButtonContainer, recipeData) {
  const arrayTag = Array.from(document.querySelectorAll(".search__data-list__option"));
  arrayTag.forEach(tag => {
    tag.addEventListener("click", e => {
      hideTagListAfterChose(selector.inputSearch);

      document.querySelector(".recipe").style.top = "450px";
      const tagExists = Array.from(tagButtonContainer.children).some(tagExist => tagExist.textContent === e.target.value);
      if (!tagExists) {
        tagFactory.createButtonTag(e.target.value, e.target.parentNode.classList[0], tagButtonContainer);
        const recipes = searchRecipesByKeywords(recipeData, tagButtonContainer.childNodes);
        recipeFactory.createRecipesCard(recipes);
        tagFactory.displayDataListOption(recipes);
        removeTagButton(tagButtonContainer.childNodes, recipeData);
      }
    });
  });
}

function removeTagButton(tagsSelectors, recipeData) {
  tagsSelectors.forEach(tag => {
    tag.firstElementChild.addEventListener("click", e => {
      e.target.parentNode.remove();
      if (tagsSelectors.length < 1) {
        document.querySelector(".recipe").style.top = "400px";
      }
      const recipes = searchRecipesByKeywords(recipeData, tagsSelectors);
      recipeFactory.createRecipesCard(recipes);
      tagFactory.displayDataListOption(recipes);
    });
  });
}



function searchRecipesByKeywords(data, keywords) {
  const results = [];

  data.forEach((recipe) => {
    const recipeKeywords = [];
    recipe.ingredients.forEach((ingredient) => {
      recipeKeywords.push(ingredient.ingredient);
    });
    recipeKeywords.push(recipe.appliance);
    recipe.ustensils.forEach((utensil) => {
      recipeKeywords.push(utensil);
    });

    let match = true;
  
    keywords.forEach((keyword) => {
      let keywordFound = false;

      recipeKeywords.forEach((recipeKeyword) => {
        if (recipeKeyword.toLowerCase().includes(keyword.textContent.toLowerCase())) {
          keywordFound = true;
          return;
        }
      });

      if (!keywordFound) {
        match = false;
        return;
      }
    });

    if (match) {
      results.push(recipe);
    }
  });

  return results;
}

export function searchBytag(recipes) {
  Array.from(document.querySelectorAll(".search__input")).forEach(inputs => {
    inputs.addEventListener("focusin", e => {
      addTagButton(selector.tagContainer, recipes);
    });
  });
}