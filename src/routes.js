const express = require('express')
const routes = express.Router()
const foodFy = require('./app/controllers/foodFy')
const recipesAdmin = require('./app/controllers/recipesAdmin')
const chefsAdmin = require('./app/controllers/chefsAdmin')


routes.get('/', foodFy.index)
routes.get('/about', foodFy.about)
routes.get('/recipes', foodFy.recipes)
routes.get('/recipes/:index', foodFy.show)

routes.get('/admin/recipes', recipesAdmin.index)
routes.get('/admin/recipes/create', recipesAdmin.create)
routes.get('/admin/recipes/:id', recipesAdmin.show)
routes.get('/admin/recipes/:id/edit', recipesAdmin.edit)
routes.post('/admin/recipes', recipesAdmin.post)
routes.put('/admin/recipes/:id', recipesAdmin.put)
routes.delete('/admin/recipes', recipesAdmin.delete)

routes.get('/admin/chefs', chefsAdmin.index)
routes.get('/admin/chefs/create', chefsAdmin.create)
routes.post('/admin/chefs', chefsAdmin.post)
routes.get('/admin/chefs/:id', chefsAdmin.show)
routes.get('/admin/chefs/:id/edit', chefsAdmin.edit)
routes.put('/admin/chefs/:id', chefsAdmin.put)
routes.delete('/admin/chefs', chefsAdmin.delete)

module.exports = routes