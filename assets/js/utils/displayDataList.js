
export function displayDataList(inputSelectors){
    inputSelectors.forEach(input => {
        input.addEventListener("focusin", (e)=>{        
            e.target.nextElementSibling.style.display = "block"
        })
    });

}

export function hideDataList(inputSelectors){
    inputSelectors.forEach(input => {
        input.addEventListener("focusout", (e)=>{        
            e.target.nextElementSibling.style.display = "none"
        })
    });

}