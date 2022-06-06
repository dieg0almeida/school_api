const db = require('../../config/db');

module.exports = {
    all() {
        return db.query(`SELECT
        student_subject.*,
        students.name as student_name,
        subjects.description as subject_description
        FROM
        student_subject 
        JOIN students ON student_subject.student_id = students.id
        JOIN subjects ON student_subject.subject_id = subjects.id `);
    },
    create(student_id, subject_id) {
        const query = "INSERT INTO student_subject (student_id, subject_id) VALUES ($1, $2) RETURNING *";
        const values = [
            student_id,
            subject_id
        ];
        return db.query(query, values);
    },
    findById(assignment_id) {
        return db.query(`SELECT * FROM student_subject WHERE id = ${assignment_id}`);
    },
    findByStudentId(student_id) {
        return db.query(`SELECT * FROM student_subject WHERE student_id = ${student_id}`);
    },
    findBySubjectId(subject_id) {
        return db.query(`SELECT * FROM student_subject WHERE subject_id = ${subject_id}`);
    },
    destroy(assignment_id) {
        const query = `DELETE FROM student_subject WHERE id = ${assignment_id}`;

        return db.query(query);
    }
}