
const data = require('../../../data.json')

exports.index = (req, res) => {
    return res.render('foodFy/index', { recipes: data.recipes })
}

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