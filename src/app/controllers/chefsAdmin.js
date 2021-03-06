const Chef = require('../models/Chef')
const { date } = require('../../lib/utils')

module.exports = {
    index(req, res) {

        Chef.all(function(chefs) {
            return res.render('admin/chefs/index', { chefs })
        })
    },    
    create(req, res) {
        return res.render('admin/chefs/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        Chef.create(req.body, function() {
            return res.redirect('/admin/chefs')
        })
    },
    show(req, res) {
        Chef.find(req.params.id, function(chef) {
            if (!chef) return res.send('Nenhum chef encontrado!!!')

            Chef.findRecipesByChef(req.params.id, function(recipes) {
                return res.render('admin/chefs/chef', { chef, recipes })
            })
        })

    },
    edit(req, res) {
        Chef.find(req.params.id, function(chef) {
            
            if (!chef) return res.send('Nenhum chef encontrado!!!')

            return res.render('admin/chefs/edit', { chef })
        }) 
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }

        Chef.update(req.body, function() {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res) {
        Chef.delete(req.body.id, function() {
            return res.redirect('/admin/chefs')
        })
    }
}