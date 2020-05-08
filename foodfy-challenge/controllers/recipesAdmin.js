const recipes = require('../data')
const fs = require('fs')
const data = require('../data.json')

exports.index = function (req, res) {
    return res.render('admin/index', { recipes })
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

    data.recipes.push({
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!!!")
    })

    return res.redirect('/admin/recipes')
}

exports.show = function(req, res){
    const recipeIndex = req.params.id
    const foundRecipe = recipes[recipeIndex]

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        id: recipeIndex,
        ...foundRecipe
    }

    return res.render('admin/recipe', { recipe })
}

exports.edit = function(req, res) {
    const recipeIndex = req.params.id
    const foundRecipe = recipes[recipeIndex]

    if (!foundRecipe) return res.send('Receita não encontrada!')

    const recipe = {
        id: recipeIndex,
        ...foundRecipe
    }

    return res.render('admin/edit', { recipe })
}