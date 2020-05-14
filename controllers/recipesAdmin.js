// const recipes = require('../data')
const fs = require('fs')
const data = require('../data.json')

exports.index = function (req, res) {
    return res.render('admin/index', { recipes: data.recipes })
}

exports.create = function (req, res) {
    return res.render('admin/create')
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "")
            return "Por favor preencha todos o campos"
    }

    const { title, image, author, ingredients, preparations, information } = req.body
    
    const ingredientsReplaced = ingredients.map(ingredient =>
        ingredient.trim() 
        // ingredient.replace(/\s{2,}/g, ' ')
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

    data.recipes.push({
        title, 
        image, 
        author, 
        ingredients: isEmpty(ingredientsReplaced), 
        preparations: isEmpty(preparationsReplaced), 
        information: information.trim()
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!!!")
    })

    return res.redirect('/admin/recipes')
}

exports.show = function(req, res){
    const recipeIndex = req.params.id
    const foundRecipe = data.recipes[recipeIndex]

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        id: recipeIndex,
        ...foundRecipe
    }

    return res.render('admin/recipe', { recipe })
}

exports.edit = function(req, res) {
    const recipeIndex = req.params.id
    const foundRecipe = data.recipes[recipeIndex]

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        id: recipeIndex,
        ...foundRecipe
    }

    return res.render('admin/edit', { recipe })
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