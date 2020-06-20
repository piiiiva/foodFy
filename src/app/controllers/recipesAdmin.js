// const recipes = require('../data')
// const fs = require('fs')
// const data = require('../../../data.json')
const Recipe = require('../models/Recipe')
const { date } = require('../../lib/utils')

module.exports ={
    index(req, res) {
        Recipe.all(function(recipes) {
            return res.render('admin/recipes/index', { recipes })
        })
    },    
    create(req, res) {
        return res.render('admin/recipes/create')
    },    
    post(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == "")
                return res.send ("Por favor preencha todos o campos")
        }
    
        const { title, image, ingredients, preparations, information } = req.body
        
        const ingredientsTrim = ingredients.map(ingredient => ingredient.trim())
        const preparationsTrim = preparations.map(preparation => preparation.trim())
    
        function isEmpty (value) {
            newArray = value.filter(function(item){
                return item != ""
            })
            return newArray
        }
    
        const serializedReqBody = {
            ... req.body,
            title: title.trim(),
            image: image.trim(),
            ingredients: isEmpty(ingredientsTrim), 
            preparations: isEmpty(preparationsTrim), 
            information: information.trim()
        }
     
        Recipe.create(serializedReqBody, function(recipe) {
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },    
    show(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Nenhuma receita encontrada!')
    
            return res.render('admin/recipes/recipe', { recipe })        
        })
    },
    edit(req, res) {
        const recipeIndex = req.params.id
        const foundRecipe = data.recipes[recipeIndex]
    
        if (!foundRecipe) return res.send('Receita não encontrada!')
    
        const recipe = {
            id: recipeIndex,
            ...foundRecipe
        }
    
        return res.render('admin/recipes/edit', { recipe })
    },    
    put(req, res) {
        const recipeIndex = req.params.id
        const foundRecipe = data.recipes[recipeIndex]
    
        if (!foundRecipe) return res.send('Receita não encontrada!')
    
        const { title, image, author, ingredients, preparations, information } = req.body
    
        const ingredientsReplaced = ingredients.map(ingredient =>
            ingredient.trim() 
        )
    
        const preparationsReplaced = preparations.map(preparation =>
            preparation.trim() 
        )
    
        function isEmpty (value) {
            newArray = value.filter(function(item){
                return item != ""
            })
            return newArray
        }
    
        const recipes = {
            title,
            image,
            author,
            ingredients: isEmpty(ingredientsReplaced), 
            preparations: isEmpty(preparationsReplaced), 
            information: information.trim()
        }
    
        data.recipes[recipeIndex] = recipes
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("Write file error!!!")
        })
    
        return res.redirect(`/admin/recipes/${recipeIndex}`)
    },    
    delete(req, res) {
        const { id } = req.body
    
        const filteredRecipes = data.recipes.filter(function(recipe){
            return data.recipes.indexOf(recipe) != id
        })
    
        data.recipes = filteredRecipes
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("Write file error!!!")
        })
    
        return res.redirect('/admin/recipes')
    }
}
