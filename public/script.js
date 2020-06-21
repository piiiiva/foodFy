const recipeCards = document.querySelectorAll(".recipe_card")
const chefCards = document.querySelectorAll(".chef_card")


for (let recipeCard of recipeCards) {
    const currentPage = location.pathname

    recipeCard.addEventListener("click", function() {
        const cardId = recipeCard.getAttribute("id")
        
        if (currentPage.includes("admin")) {
            window.location.href = `/admin/recipes/${cardId}`
        } else
            window.location.href = `/recipes/${cardId}`
    })
}

for (let chefCard of chefCards) {
    const currentPage = location.pathname

    chefCard.addEventListener("click", function() {
        const cardId = chefCard.getAttribute("id")
        
        if (currentPage.includes("admin")) {
            window.location.href = `/admin/chefs/${cardId}`
        } else
            window.location.href = `/chefs/${cardId}`
    })
}





// const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .header-container nav a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("menu-active")        
    }    
}

