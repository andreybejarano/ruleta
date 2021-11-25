const fs = require('fs');
const path = require('path');

async function run(req, res, next) {
  try {
    const availableStudentsFile = fs.readFileSync(path.resolve('./available_students.json'));
    const SeletedStudentsFile = fs.readFileSync(path.resolve('./selected_students.json'));
    if (availableStudentsFile.length === 0 || SeletedStudentsFile.length === 0)
      throw { status: 422, message: 'the available_students.json or selected_students.json file has to contain an Array of Strings' };
    let availableStudentsData = JSON.parse(availableStudentsFile);
    let studentsSelectedData = JSON.parse(SeletedStudentsFile);
    if (!Array.isArray(availableStudentsData) || availableStudentsData.length === 0)
      throw { status: 422, message: 'the available_students.json file has to contain an Array of Strings' };
    const random = Math.floor(Math.random() * availableStudentsData.length);
    const studentSelected = availableStudentsData[random];
    availableStudentsData = availableStudentsData.filter(student => student !== studentSelected);
    studentsSelectedData.push(studentSelected);
    fs.writeFileSync(
      path.resolve('./available_students.json'),
      JSON.stringify(availableStudentsData, null, 2),
      'utf8'
    );
    fs.writeFileSync(
      path.resolve('./selected_students.json'),
      JSON.stringify(studentsSelectedData, null, 2),
      'utf8'
    );
    return res.json({ studentSelected });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  run
}
