const cards = document.querySelectorAll(".card")
const infoDetails = document.querySelectorAll(".info-details")
const button = document.querySelectorAll('.show-button')

for (let card of cards) {
    card.addEventListener("click", function() {
        const recipeId = card.getAttribute("id")
        // newId = String.prototype.trim(recipeId)


        window.location.href = `/recipes/${recipeId}`
    })
}

button.addEventListener("click", function(){
    

})