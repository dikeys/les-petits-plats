import { ajaxGet } from "../utils/requestFunc";
import selector from "./const";

async function createRecipesCard(recipeArray) {
  selector.recipeSection.innerHTML = "";
  for (let recipe of recipeArray) {
    let article = document.createElement("article");
    article.classList.add("card");
    let pCardheader = document.createElement("p");
    pCardheader.classList.add("card__header");
    let divContent = document.createElement("div");
    divContent.classList.add("card__content");
    let recipeName = document.createElement("h3");
    recipeName.classList.add("card__content__heading");
    recipeName.textContent = recipe.name;
    let time = document.createElement("p");
    time.classList.add("card__content__time");
    time.textContent = recipe.time + "min";
    let imgTime = document.createElement("img");
    imgTime.src = "../assets/img/time.svg";
    imgTime.alt = "minuteur cuisine";
    imgTime.style.paddingRight = "5px";
    let listIngredient = addIngredientList(recipe.ingredients);
    let description = document.createElement("p");
    description.classList.add("card__content__instruction");
    description.textContent = recipe.description;

    time.insertAdjacentElement("afterbegin", imgTime);
    divContent.appendChild(recipeName);
    divContent.appendChild(time);
    divContent.appendChild(listIngredient);
    divContent.appendChild(description);
    article.appendChild(pCardheader);
    article.appendChild(divContent);
    selector.recipeSection.appendChild(article);
  }

  function addIngredientList(ingredientsList) {
    let divContainer = document.createElement("div");
    divContainer.classList.add("card__content__ingredient");
    for (let ingredients of ingredientsList) {
      let pIngredient = document.createElement("p");

      pIngredient.textContent =
        ingredients.ingredient +
          " : " +
          ingredients.quantity +
          ingredients.unit || "";

      divContainer.appendChild(pIngredient);
    }
    return divContainer;
  }
}

export function getFilterRecipesCard(data, inputSelectors) {
  let arrayRecipes = [];
  for (const inputSelector of inputSelectors) {
    inputSelector.addEventListener("input", e => {
      arrayRecipes = [];
      for (const recipe of data) {
        for (const ingredient of recipe.ingredients) {
          if (ingredient.ingredient.toLowerCase().includes(e.target.value.toLowerCase())) {
            arrayRecipes.push(recipe);
            break;
          }
        }
      }
      createRecipesCard(arrayRecipes);
    });
  }
}
export { createRecipesCard };
