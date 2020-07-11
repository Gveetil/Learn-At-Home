const db = require("../models");

// Teacher Controller 
module.exports = {
  // Returns a map of all Classes and Subjects taught by a teacher
  getTeacherClassSubjects: async function (request, response) {
    try {
      const query = `SELECT 
                        S.id SubjectId, S.name SubjectName, 
                        C.id ClassId, C.name ClassName
                      FROM TeacherClassSubjects TCS 
                      INNER JOIN Subjects S 
                        ON TCS.SubjectId = S.id
                      INNER JOIN Class C 
                        ON TCS.ClassId = C.id
                      WHERE TCS.TeacherId = ?`;
      const result = await db.sequelize.query(query, {
        replacements: [request.user.id],
        type: db.sequelize.QueryTypes.SELECT
      });

      return response.json(result);

    } catch (error) {
      console.log(error);
      return response.status(500).send(error.message);
    }
  },
};
