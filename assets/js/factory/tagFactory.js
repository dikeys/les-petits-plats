export function createButtonTag(text, color, container){
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