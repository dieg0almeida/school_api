const db = require('../../config/db');

module.exports = {
    all(){
        return db.query("SELECT * FROM subjects ORDER BY description")
    },
    create(subject){
        const query = "INSERT INTO subjects (description, menu) VALUES ($1, $2) RETURNING *";
        const values = [
            subject.description,
            subject.menu
        ]

        return db.query(query, values);
    },
    findById(subject_id){
        const query = `SELECT * FROM subjects WHERE id = ${subject_id}`;

        return db.query(query);
    },
    update(subject, subject_id){
        const query = "UPDATE subjects SET description = $1, menu = $2 WHERE id=$3";
        const values = [
            subject.description,
            subject.menu,
            subject_id
        ];
        
        return db.query(query, values);
    },
    destroy(subject_id){
        const query = `DELETE FROM subjects WHERE id = ${subject_id}`;

        return db.query(query);
    },
    findByName(subejct_name){
        const query = `SELECT * FROM subjects WHERE description ilike '%${subejct_name}%'`;

        return db.query(query);
    }
}