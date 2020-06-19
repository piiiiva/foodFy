// const recipes = require('../data')
// const fs = require('fs')
// const data = require('../../../data.json')
const Recipe = require('../models/Recipe')
const { date } = require('../../lib/utils')

exports.index = function (req, res) {
    Recipe.all(function(chefs) {
        return res.render('admin/recipes/index', { chefs })
    })

    // res.render('admin/recipes/index', { recipes: data.recipes })

}

exports.create = function (req, res) {
    return res.render('admin/recipes/create')
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "")
            return res.send ("Por favor preencha todos o campos")
    }

    console.log(req.body)
    Recipe.create(req.body, function(recipe) {
        return res.redirect(`/admin/recipes/${recipe.id}`)
    })

    
    // const { title, image, author, ingredients, preparations, information } = req.body
    
    // const ingredientsReplaced = ingredients.map(ingredient =>
    //     ingredient.trim() 
    //     // ingredient.replace(/\s{2,}/g, ' ')
    // )

    // const preparationsReplaced = preparations.map(preparation =>
    //     preparation.trim() 
    // )

    // function isEmpty (value) {
    //     newArray = value.filter(function(item){
    //         return item != ""
    //     })
    //     return newArray
    // }

}

exports.show = function(req, res){
    const recipeIndex = req.params.id
    const foundRecipe = data.recipes[recipeIndex]

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        id: recipeIndex,
        ...foundRecipe
    }

    return res.render('admin/recipes/recipe', { recipe })
}

exports.edit = function(req, res) {
    const recipeIndex = req.params.id
    const foundRecipe = data.recipes[recipeIndex]

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        id: recipeIndex,
        ...foundRecipe
    }

    return res.render('admin/recipes/edit', { recipe })
}

exports.put = function (req, res) {
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
}

exports.delete = function (req, res) {
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