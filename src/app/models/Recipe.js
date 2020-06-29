const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {

        const query = `
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
         `

        db.query(query, function(err, results) {
            if(err) throw `Database error! ${err}`
            
            callback(results.rows)
        })

    },
    create(data, callback) {
        const query = `
            INSERT INTO recipes (
               chef_id,
               image,
               title,
               ingredients,
               preparations,
               information,
               created_at 
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparations,
            data.information,
            date(Date.now()).iso
        ]
    
        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`
            
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        const query = `
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes 
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1
        `
        
        db.query(query, [id], function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        const query = `
            SELECT recipes.*, chefs.name AS chef_nameTeste
            FROM recipes 
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.title iLIKE '%${filter}%'
        `

        db.query(query, function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE recipes SET
               chef_id=($1), 
               image=($2),
               title=($3),
               ingredients=($4),
               preparations=($5),
               information=($6)
            WHERE id = $7
        `
 
        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparations,
            data.information,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`
            
            callback()
        })
    },
    delete(id, callback) {
        const query = `
            DELETE FROM recipes WHERE id = $1
        `

        db.query(query, [id], function(err, results) {
            if(err) `Database error! ${err}`

            return callback()
        })
    },
    chefSelectOptions(callback) {
        const query = `
            SELECT name, id FROM chefs
        `

        db.query(query, function(err, results) {
            if(err) throw `Database error ${err}`

            callback(results.rows)
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = ""
            
        if (filter) {
            filterQuery = `
                WHERE recipes.title iLIKE '%${filter}%'
            `
        }

        query = `
            SELECT recipes.*, chefs.name AS chef_nameTeste
            FROM recipes 
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `
        
        db.query(query, [limit, offset], function(err, results) {
            if (err) throw `Database Error ${err}`

            callback(results.rows)
        })
    }
}