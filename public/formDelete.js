const formDelete = document.querySelector("#form-delete")

formDelete.addEventListener("submit", function(event){
    const confirmation = confirm("Você realmente deseja deletar?")
    if (!confirmation) {
        event.preventDefault()
    }
})