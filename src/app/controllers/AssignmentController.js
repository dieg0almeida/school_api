const Assignment = require("../models/Assignment");

module.exports = {
  async index(req, res) {
    try {
      const results = await Assignment.all();
      const assignments = results.rows;

      return res.json({ assignments });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!" });
    }
  },
  async post(req, res) {
    try {
      const keys = Object.keys(req.body);
      var check = 0;

      for (key of keys) {
        if (req.body[key] == "") {
          return res.json({
            message: "Preencha todos os campos!"
          });
        }

        if (key == "student_id" || key == "subject_id") {
          check++;
        }
      }

      if (check != 2) {
        return res.json({
          message: "Todos os parâmetros devem ser informados!"
        });
      }

      var results = await Assignment.create(req.body.student_id, req.body.subject_id);
      const assignment = results.rows[0];

      return res.json({
        message: "Aluno matriculado com sucesso",
        assignment
      });
    } catch (error) {

      return res.json({ message: "Algum erro ocorreu!" });
    }
  },
  async delete(req, res) {
    try {
      const assignment_id = req.params.id;

      var results = await Assignment.findById(assignment_id);
      if (results.rows == 0) {
        return res.json({
          message: `Matrícula não encontrada!`
        });
      }


      await Assignment.destroy(assignment_id);

      return res.json({
        message: `Matrícula ${assignment_id} excluida com sucesso`
      });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!" });
    }
  }
}