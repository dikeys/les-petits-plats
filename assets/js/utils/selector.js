const selector = {
    mainSearch : document.querySelector(".header__searchbar"),
    tagContainer : document.getElementById("tag-list"),
    ingredientTag : document.getElementById("list-ingredient"),
    getAllTagOptions : document.querySelectorAll(".search__data-list__option"),
    inputSearch : document.querySelectorAll(".search__input"),
    sectionSearch : document.querySelector("section.search"),
    headerSection : document.querySelector("header.search"),
    recipeSection : document.querySelector("section.recipe"),
    containerSection : document.querySelector("section.search__container"),
    divTag : document.querySelector("div#tag-list")
}

export {selector}