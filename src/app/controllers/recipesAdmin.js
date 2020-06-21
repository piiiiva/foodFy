const Recipe = require('../models/Recipe')

module.exports ={
    index(req, res) {
        Recipe.all(function(recipes) {
            return res.render('admin/recipes/index', { recipes })
        })
    },    
    create(req, res) {
        Recipe.chefSelectOptions(function(options) {
            return res.render('admin/recipes/create', { chefOptions: options })
        })
    },    
    post(req, res) {
        const keys = Object.keys(req.body)
        console.log(req.body)
        for (key of keys) {
            if (req.body[key] == "")
                return res.send ("Por favor preencha todos o campos")
        }
     
        const { title, image, ingredients, preparations, information } = req.body
        
        const ingredientsTrim = ingredients.map(ingredient => ingredient.trim())
        const preparationsTrim = preparations.map(preparation => preparation.trim())
    
        function isEmpty (value) {
            newArray = value.filter(function(item){
                return item != ""
            })
            return newArray
        }
    
        const serializedReqBody = {
            ... req.body,
            title: title.trim(),
            image: image.trim(),
            ingredients: isEmpty(ingredientsTrim), 
            preparations: isEmpty(preparationsTrim), 
            information: information.trim()
        }
     
        Recipe.create(serializedReqBody, function(recipe) {
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },    
    show(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Nenhuma receita encontrada!')
    
            return res.render('admin/recipes/recipe', { recipe })        
        })
    },
    edit(req, res) {
        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Nenhuma receita encontrada!')
    
            Recipe.chefSelectOptions(function(options){
                console.log(recipe)
                return res.render('admin/recipes/edit', { recipe, chefOptions: options })        
            })
        })
    },    
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == "")
                return res.send ("Por favor preencha todos o campos")
        }
    
        const { title, image, ingredients, preparations, information } = req.body
        
        const ingredientsTrim = ingredients.map(ingredient => ingredient.trim())
        const preparationsTrim = preparations.map(preparation => preparation.trim())
    
        function isEmpty (value) {
            newArray = value.filter(function(item){
                return item != ""
            })
            return newArray
        }
    
        const serializedReqBody = {
            ... req.body,
            title: title.trim(),
            image: image.trim(),
            ingredients: isEmpty(ingredientsTrim), 
            preparations: isEmpty(preparationsTrim), 
            information: information.trim()
        }
     
        Recipe.update(serializedReqBody, function() {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },   
    delete(req, res) {
        Recipe.delete(req.body.id, function() {
            return res.redirect('/admin/recipes')
        })
    }
}
