const cards = document.querySelectorAll(".card")
const currentPage = location.pathname

for (let card of cards) {
    card.addEventListener("click", function() {
        const recipeId = card.getAttribute("id")
        
        if (currentPage.includes("admin")) {
            window.location.href = `/admin/recipes/${recipeId}`
        } else
        window.location.href = `/recipes/${recipeId}`
    })
}



