const express = require('express')
const routes = express.Router()
const foodFy = require('./controllers/foodFy')
const recipesAdmin = require('./controllers/recipesAdmin')
const recipes = require('./data')


routes.get('/', function(req, res){
    return res.render('foodFy/index', { recipes })
})

routes.get('/about', foodFy.about)
routes.get('/recipes', foodFy.recipes)
routes.get('/recipes/:index', foodFy.show)


routes.get("/admin/recipes", recipesAdmin.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipesAdmin.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipesAdmin.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipesAdmin.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipesAdmin.post); // Cadastrar nova receita

// routes.put("/admin/recipes", recipesAdmin.put); // Editar uma receita
// routes.delete("/admin/recipes", recipesAdmin.delete); // Deletar uma receita

module.exports = routes