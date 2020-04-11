const cards = document.querySelectorAll(".card")


for (let card of cards) {
    card.addEventListener("click", function() {
        const recipeId = card.getAttribute("id")
        // newId = String.prototype.trim(recipeId)


        window.location.href = `/recipes/${recipeId}`
    })
}



