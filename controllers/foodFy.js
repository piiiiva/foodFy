const recipes = require('../data')
const data = require('../data.json')

exports.about = function(req, res){
    return res.render('foodFy/about')
}

exports.recipes = function(req, res){
    return res.render('foodFy/recipes', { recipes: data.recipes })
}

exports.show = function(req, res){
    const recipeIndex = req.params.index

    return res.render('foodFy/recipe', { recipe: data.recipes[recipeIndex] })
}