const recipes = require('../data')

exports.index = function (req, res) {
    return res.render('admin/index', { recipes })
}

exports.create = function (req, res) {
    return res.redirect('admin/index')
}


exports.show = function(req, res){
    const recipeIndex = req.params.id

    return res.render('admin/recipe', { recipe: recipes[recipeIndex] })
}

exports.edit = function(req, res) {
    const recipeIndex = req.params.id

    return res.render('admin/edit', { recipe: recipes[recipeIndex] })
}