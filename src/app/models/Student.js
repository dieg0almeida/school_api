const db = require('../../config/db');

module.exports = {
    all(){
        return db.query("SELECT * FROM students ORDER BY name")
    },
    create(student){
        const query = "INSERT INTO students (name) VALUES ($1) RETURNING *";
        const values = [
            student.name
        ]

        return db.query(query, values);
    },
    findById(student_id){
        const query = `SELECT * FROM students WHERE id = ${student_id}`;

        return db.query(query);
    },
    update(student, student_id){
        const query = "UPDATE students SET name = $1 WHERE id=$2";
        const values = [
            student.name,
            student_id
        ]

        return db.query(query, values);
    },
    destroy(student_id){
        const query = `DELETE FROM students WHERE id = ${student_id}`;

        return db.query(query);
    },
    findByName(student_name){
        const query = `SELECT * FROM students WHERE name ilike '%${student_name}%'`;

        return db.query(query);
    }
}