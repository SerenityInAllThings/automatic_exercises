const fs = require('fs')
const path = require('path')

const forEachStudent = (argv, testFolder, callback) => {
  const students = getStudents(argv, testFolder)
  if (!students || students.length === 0)
    test.skip('skip', () => console.log(`No entries found for ${testFolder}`));

  students.forEach(student => {
    const studentFile = getStudentFile(student, testFolder)
    const entry = require(studentFile)
    callback(entry, student)
  })
}

const getStudents = (argv, testFolder) => {
  const [_, __, ___, student] = argv
  if (!student)
    return getAllStudents(testFolder)
  else if (studentFileExists(student, testFolder))
    return [student]
  else 
    throw new Error(`Student ${student} file is missing. Create '${student}.js' file`)
}

const getStudentFile = (student, testFolder) => path.join(testFolder, student)

const studentFileExists = (student, testFolder) => {
  const folderFiles = getAllFolderFiles(testFolder)
  const studentFile = getStudentFile(student, testFolder)
  return folderFiles.includes(studentFile.replace("./", "").concat(".js"))
}

const getAllStudents = (testFolder) => {
  const ignoredFiles = ['readme', 'testutils', '.test.js']
  const folderFiles = getAllFolderFiles(testFolder)
  const entries = folderFiles
    .filter(file => !ignoredFiles.some(ignored => file.toLowerCase().includes(ignored)))
    .filter(file => file.endsWith('.js'))
  const students = entries.map(entry => entry.replace('.js', ''))
  return students
}

const getAllFolderFiles = (testFolder) => fs.readdirSync(testFolder)

module.exports.forEachStudent = forEachStudent