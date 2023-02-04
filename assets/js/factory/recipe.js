import { ajaxGet } from "../utils/requestFunc";
import selector from "./const";
async function createRecipesCard() {
  let sectionRecipe = selector.recipeSection;
  console.log(sectionRecipe);
  let recipes = await ajaxGet("../assets/js/data/recipes.json");
  for (let recipe of recipes) {
   
    let article = document.createElement("article");
    article.classList.add("card");
    let pCardheader = document.createElement("p");
    pCardheader.classList.add("card__header");
    let divContent = document.createElement("div");
    divContent.classList.add("card__content");
    let recipeName = document.createElement("h3");
    recipeName.textContent = recipe.name;
    let time = document.createElement("p");
    time.textContent = recipe.time + "min";
    let listIngredient = createIngredientList(recipe.ingredients);
    let description = document.createElement("p");
    description.classList.add("card__ingredient");
    description.textContent = recipe.description;
    
    
    divContent.appendChild(recipeName);
    divContent.appendChild(time);
    divContent.appendChild(listIngredient);
    divContent.appendChild(description);
    article.appendChild(pCardheader);
    article.appendChild(divContent);
    sectionRecipe.appendChild(article);
  }

  function createIngredientList(ingredientsList) {
    let divContainer = document.createElement("div");
    for (let ingredients of ingredientsList) {
      let pIngredient = document.createElement("p");
      pIngredient.textContent =
        ingredients.ingredient + " : " + ingredients.quantity + ingredients.unit || ""
          
      divContainer.appendChild(pIngredient);
    }
    return divContainer;
  }
}

createRecipesCard();

{
  /* <article class="card">
<p class="card__header"></p>
<div class="card__content">
  <h3>Limonade de coco</h3>
  <p>10 min</p>
  <div>
    <p class="card__ingredient">lait de coco : 400ml</p>
    <p class="card__ingredient">Jus de citron : 2</p>
    <p class="card__ingredient">Créme de coco : 4 cuillières</p>
    <p class="card__ingredient">Sucre : 20g</p>
    <p class="card__ingredient">Glaçons : 2</p>
  </div>
  <p>Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et
    le sucre. Mixer jusqu'à avoir la consistence désirée.</p>
</div>
</article> */
}
