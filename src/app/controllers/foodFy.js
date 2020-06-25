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
        Recipe.all(function(recipes) {
            return res.render('foodfy/recipes', { recipes })
        })
    },
    show(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Nenhuma receita encontrada!')
            
            return res.render('foodFy/recipe', { recipe })        
        })
    },
}