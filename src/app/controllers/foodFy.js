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
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes) {
                const pagination = {
                    total: Math.ceil(Number(recipes[0].total / limit)),
                    page
                }

                return res.render('foodFy/recipes/search', { filter, recipes, pagination })
            }
        }

        Recipe.paginate(params)
    }
}