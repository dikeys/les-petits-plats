
export function displayDataList(inputSelectors) {
  inputSelectors.forEach(input => {
    input.addEventListener("focusin", e => {
      e.target.placeholder = "Rechercher un" + e.target.id;
      e.target.nextElementSibling.classList.add("search__data-list");
    });
  });
}

export function hideDataList(inputSelectors) {
  inputSelectors.forEach(input => {
    input.addEventListener("focusout", e => {
      e.target.placeholder = e.target.id;
      e.target.nextElementSibling.classList.remove("search__data-list");
    });
  });
}

export function filterSearch(inputSelectors) {
  inputSelectors.forEach(inputSelector => {
    inputSelector.addEventListener("input", e => {
      let text = e.target.value.toLowerCase();
      let options = e.target.nextElementSibling.options;
      Array.from(options).forEach(option => {
        option.style.display = option.value.toLowerCase().includes(text)
          ? "block"
          : "none";
      });
    });
  });
}


