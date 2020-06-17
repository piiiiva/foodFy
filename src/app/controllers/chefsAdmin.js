const Chef = require('../models/Chef')

module.exports = {
    index(req, res) {
        return res.render('admin/chefs/index')
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
            console.log(req.body)
            return res.redirect('/admin/chefs')
        })
    },
    show(req, res) {
        return res.render('admin/chefs/chef', { recipes: data.recipes })
    },
}