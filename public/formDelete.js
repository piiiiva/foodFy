const formDelete = document.querySelector("#form-delete")

formDelete.addEventListener("submit", function(event){
    const confirmation = confirm("Deseja deletar a receita?")
    if (!confirmation) {
        event.preventDefault()
    }
})