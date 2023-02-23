import * as tagFactory from "../factory/tagFactory";
import * as searchFactory from "../factory/SearchFactory";
import * as tagSearch from "../utils/filterCardWithTag";

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
      console.log(e.target)
      e.target.placeholder = e.target.dataset.name;
      e.target.nextElementSibling.classList.remove("search__data-list");
      e.target.previousElementSibling.classList.remove("search__sort-img__active")
    });
  }
}

export function hideTagListAfterChose(selectors) {
  for (const selector of selectors) {
    console.log(selector);
  }
}

export function filterTagList(inputSelectors) {
  for (const inputSelector of inputSelectors) {
    inputSelector.addEventListener("input", e => {
      let text = e.target.value.toLowerCase();
      let options = e.target.nextElementSibling.options;
      for (const option of options) {
        option.style.display = option.value.toLowerCase().includes(text.toLowerCase())
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
  const arrayTag = document.querySelectorAll(".search__data-list__option");
  for (let tag of arrayTag) {

    tag.addEventListener("click", e => {
     e.target.parentNode.classList.remove("search__data-list")
     e.target.parentNode.parentElement.firstElementChild.classList.remove("search__sort-img__active")
     document.querySelector(".recipe").style.top = "450px"
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
        tagFactory.createButtonTag(e.target.value,e.target.parentNode.classList[0], tagButtonContainer);
        tagSearch.searchIngredient(recipeData, e.target.value);
        hideTagList(document.querySelectorAll(".search__input"))
      }
    });
  }
}

function removeTagButton(tagsSelectors) {
  for (tag of tagsSelectors) {
    tag.addEventListener("click", e => {
      console.log(e.target);
    });
  }
}
