const Student = require('../models/Student');
const Assignment = require('../models/Assignment');

module.exports = {
  async index(req, res) {
    try {
      const results = await Student.all();
      const students = results.rows;

      return res.json({ students });
    } catch (error) {

      return res.json({ message: "Algum erro ocorreu!" });
    }
  },
  async post(req, res) {

    try {
      const keys = Object.keys(req.body);
      var check = false;

      for (key of keys) {
        if (req.body[key] == "") {
          return res.json({
            message: "Preencha todos os campos!"
          });
        }

        if (key == "name" && req.body[key].lenght > 50) {
          return res.json({
            message: "O nome deve conter até 50 caracteres!"
          });
        }

        if (key == "name") {
          check = true;
        }
      }

      if (!check) {
        return res.json({
          message: "O parâmetro nome deve ser informado!"
        });
      }

      var results = await Student.create(req.body);
      const student = results.rows[0];

      return res.json({
        message: "Aluno cadastrado com sucesso",
        student
      });
    } catch (error) {

      return res.json({ message: "Algum erro ocorreu!" });
    }
  },
  async put(req, res) {
    try {
      const keys = Object.keys(req.body);
      const student_id = req.params.id;
      var check = false;

      for (key of keys) {
        if (req.body[key] == "") {
          return res.json({
            message: "Preencha todos os campos!"
          });
        }

        if (key == "name" && req.body[key].lenght > 50) {
          return res.json({
            message: "O nome deve conter até 50 caracteres!"
          });
        }

        if (key == "name") {
          check = true;
        }
      }

      if (!check) {
        return res.json({
          message: "O parâmetro nome deve ser informado!"
        });
      }

      var results = await Student.findById(student_id);
      if (results.rows.length == 0) {
        return res.json({
          message: `Aluno não encontrado!`
        });
      }

      await Student.update(req.body, student_id);

      return res.json({
        message: `Aluno ${student_id} atualizado com sucesso`
      });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!" });
    }
  },
  async show(req, res) {
    try {
      const student_id = req.params.id;

      const results = await Student.findById(student_id);
      const student = results.rows[0];

      return res.json({
        student
      });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!" });
    }
  },
  async search(req, res) {
    try {

      const results = await Student.findByName(req.body.name);
      const students = results.rows;

      return res.json({
        students
      });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!" });
    }
  },
  async delete(req, res) {
    try {
      const student_id = req.params.id;

      var results = await Student.findById(student_id);
      if (results.rows.length == 0) {
        return res.json({
          message: `Aluno não encontrado!`
        });
      }

      results = await Assignment.findByStudentId(student_id);
      if (results.rows.length > 0) {
        return res.json({
          message: `Não foi possível exluir o aluno pois ele está matriculado em algun(s) curso(s)!`
        });
      }


      await Student.destroy(student_id);

      return res.json({
        message: `Aluno ${student_id} excluido com sucesso`
      });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!" });
    }
  }
}