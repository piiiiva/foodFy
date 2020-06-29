const Recipe = require('../models/Recipe')

module.exports = {
    index(req, res) {
       
            Recipe.all(function(recipes) {
                return res.render('foodfy/recipes/index', { recipes })
            })    
    },
    about(req, res) {
        return res.render('foodFy/recipes/about')
    },
    recipes(req, res) {
        Recipe.all(function(recipes) {
            return res.render('foodfy/recipes/recipes', { recipes })
        })
    },
    show(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Nenhuma receita encontrada!')
            
            return res.render('foodFy/recipes/recipe', { recipe })     
        })
    },
    search(req, res) {
        const { filter } = req.query

        if ( filter ) {
            Recipe.findBy(filter, function(recipes) {
                console.log(recipes)
                return res.render('foodFy/recipes/search', { filter, recipes })
            })
        } else {
            Recipe.all(function(recipes) {
                return res.render('foodFy/recipes/search', { recipes })
            })    
        }
    }
}