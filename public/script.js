const cards = document.querySelectorAll(".card")
const currentPage = location.pathname

for (let card of cards) {
    card.addEventListener("click", function() {
        const cardId = card.getAttribute("id")
        
        if (currentPage.includes("admin")) {
            if (currentPage.includes("chefs")) {
                window.location.href = `/admin/chefs/${cardId}`
            } else {
                window.location.href = `/admin/recipes/${cardId}`
            }
        } else
        window.location.href = `/recipes/${cardId}`
    })
}

// const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .header-container nav a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("menu-active")        
    }    
}

