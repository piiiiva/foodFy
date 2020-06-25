const Recipe = require('../models/Recipe')
const data = require('../../../data.json')

module.exports = {
    index(req, res) {
        Recipe.all(function(recipes) {
            return res.render('foodfy/index', { recipes })
        })
    },
    about(req, res) {
        return res.render('foodFy/about')
    },
    recipes(req, res) {
        return res.render('foodFy/recipes', { recipes: data.recipes })
    },
    show(req, res) {
        const recipeIndex = req.params.index
    
        return res.render('foodFy/recipe', { recipe: data.recipes[recipeIndex] })
    },
}