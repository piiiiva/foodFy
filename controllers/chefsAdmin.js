
exports.index = function (req, res) {
    return res.render('admin/chefs/index')
}

exports.create = (req, res) => {
    return res.render('admin/chefs/create')
}

