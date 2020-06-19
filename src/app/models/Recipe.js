const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {

        const query = `
        SELECT * FROM recipes
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
            data.chef_id,
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
            SELECT * FROM recipes WHERE id = $1
        `
        
        db.query(query, [id], function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE recipes SET
               name=($1),
               avatar_url=($2)
            WHERE id = $3
        `

        const values = [
            data.name,
            data.avatar_url,
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

    }
}