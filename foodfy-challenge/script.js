const modalOverlay = document.querySelector(".modal-overlay")
const cards = document.querySelectorAll(".cards")

for (let card of cards) {
    card.addEventListener("click", function(){
        modalOverlay.classList.add('active')
    })
}



if (document.querySelector(".close-modal") != null) {
    modalOverlay.querySelector(".close-modal").addEventListener("click", function(){
        modalOverlay.classList.remove("active")
    })
}