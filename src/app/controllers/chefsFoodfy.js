const Chef = require('../models/Chef')

module.exports = {
    index(req, res) {
        Chef.all(function(chefs) {
            return res.render('foodFy/chefs/index', { chefs })
        })
    }
}