const express = require('express')
const routes = express.Router()
const foodFy = require('./controllers/foodFy')
const admin = require('./controllers/admin')
const recipes = require('./data')


routes.get('/', function(req, res){
    return res.render('foodFy/index', { recipes })
})

routes.get('/about', foodFy.about)
routes.get('/recipes', foodFy.recipes)
routes.get('/recipes/:index', foodFy.show)


routes.get("/admin/recipes", admin.index); // Mostrar a lista de receitas
// routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
// routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
// routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

// routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
// routes.put("/admin/recipes", recipes.put); // Editar uma receita
// routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

module.exports = routes