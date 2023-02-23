import { ajaxGet } from "../utils/fetchFunc";
import selector from "./const";

async function createRecipesCard(recipeArray) {
  selector.recipeSection.innerHTML = "";
  for (let recipe of recipeArray) {
    let a = document.createElement("a")
    a.href = ""
    a.classList.add("card");
    let article = document.createElement("article");
   
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
    a.appendChild(article)
    selector.recipeSection.appendChild(a);
  }


}

function addIngredientList(ingredientsList) {
  let divContainer = document.createElement("ul");
  divContainer.classList.add("card__content__ingredient");
  for (let ingredients of ingredientsList) {
    let pIngredient = document.createElement("li");

    pIngredient.textContent = ingredients.ingredient + " : " + ingredients.quantity + (ingredients.unit ? ingredients.unit : "");

    divContainer.appendChild(pIngredient);
  }
  return divContainer;
}
export { createRecipesCard };
