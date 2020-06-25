const Chef = require('../models/Chef')

module.exports = {
    index(req, res) {
        Chef.all(function(chefs) {
            return res.render('foodFy/chefs/index', { chefs })
        })
    },
    show(req, res) {
        Chef.find(req.params.id, function(chef) {
            if(!chef) return res.send('Nenhum chef encontrado!')

            Chef.findRecipesByChef(req.params.id, function(recipes) {

                return res.render('foodFy/chefs/chef', { chef, recipes })
            })
        })
    }
}