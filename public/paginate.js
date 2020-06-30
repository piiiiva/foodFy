function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {

            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination) {
    const filter = pagination.dataset.filter
    const page = Number(pagination.dataset.page)
    const total = Number(pagination.dataset.total)
    const pages = paginate(page, total)

    let elements = ""

    for (const page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="/recipes/search?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="/recipes/search?page=${page}">${page}</a>`
            }
        }
        
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}


// Show active page
const currentPageOfPagination = location.href
const paginationMenuItems = document.querySelectorAll('.pagination a')
 
for (paginationItem of paginationMenuItems) {  
    if (currentPageOfPagination.includes(paginationItem.getAttribute("href"))) {
        paginationItem.classList.add("pagination-menu-active")        
    } 
}
