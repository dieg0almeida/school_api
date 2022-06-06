const Subject = require('../models/Subject');
const Assignment = require('../models/Assignment');

module.exports = {
  async index(req, res) {
    try {
      const results = await Subject.all();
      const subjects = results.rows;

      return res.json({ subjects });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!"});
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

        if (key == "description" && req.body[key].lenght > 50) {
          return res.json({
            message: "A descrição deve conter até 50 caracteres!"
          });
        }

        if (key == "description" || key == "menu") {
            check++;
        }
      }

      if (check != 2) {
        return res.json({
          message: "Todos os parâmentros devem ser informados!"
        });
      }

      var results = await Subject.create(req.body);
      const subject = results.rows[0];

      return res.json({
        message: "Curso cadastrado com sucesso",
        subject
      });
    } catch (error) {

      return res.json({ message: "Algum erro ocorreu!"});
    }
  },
  async put(req, res) {
    try {
      const keys = Object.keys(req.body);
      const subject_id = req.params.id;
      var check = 0;

      for (key of keys) {
        if (req.body[key] == "") {
          return res.json({
            message: "Preencha todos os campos!"
          });
        }

        if (key == "description" && req.body[key].lenght > 50) {
          return res.json({
            message: "A descrição deve conter até 50 caracteres!"
          });
        }

        if (key == "description" || key == "menu") {
            check++;
        }
      }

      if (check != 2) {
        return res.json({
          message: "Todos os parâmentros devem ser informados!"
        });
      }

      var results = await Subject.findById(subject_id);
      if(results.rows.length == 0){
        return res.json({
          message: `Curso não encontrado!`
        });
      }


      await Subject.update(req.body, subject_id);

      return res.json({
        message: `Curso ${subject_id} atualizado com sucesso`
      });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!"});
    }
  },
  async show(req, res) {
    try {
      const subject_id = req.params.id;

      const results = await Subject.findById(subject_id);
      const subject = results.rows[0];

      return res.json({
        subject
      });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!"});
    }
  },
  async search(req, res){
    try {

      const results = await Subject.findByName(req.body.description);
      const subjects = results.rows;

      return res.json({
        subjects
      });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!"});
    }
  },
  async delete(req, res) {
    try {
      const subject_id = req.params.id;

      var results = await Subject.findById(subject_id);
      if(results.rows.length == 0){
        return res.json({
          message: `Curso não encontrado!`
        });
      }

      results = await Assignment.findBySubjectId(subject_id);

      if(results.rows.length > 0){
        return res.json({
          message: `Não é possível excluir, o curso possui aluno(s) matriculado(s)!`
        });
      }




      await Subject.destroy(subject_id);

      return res.json({
        message: `Curso ${subject_id} excluido com sucesso`
      });
    } catch (error) {
      return res.json({ message: "Algum erro ocorreu!"});
    }
  }


}