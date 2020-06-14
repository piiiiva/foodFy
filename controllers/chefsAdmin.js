
const data = require('../data.json')


exports.index = function (req, res) {
    return res.render('admin/chefs/index')
}

exports.create = (req, res) => {
    return res.render('admin/chefs/create')
}

exports.show = (req, res) => {
    return res.render('admin/chefs/chef', { recipes: data.recipes })
}