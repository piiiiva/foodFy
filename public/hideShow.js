const details = document.querySelectorAll(".details")

for (const card of details) {
    const button = card.querySelector('.info-button')
    const infoDetails = card.querySelector(".info-details")

    button.addEventListener('click', () => {
        button.innerHTML = button.innerHTML == 'ESCONDER' ? 'MOSTRAR' : 'ESCONDER'
        
        infoDetails.classList.toggle("show-info")
    })
}