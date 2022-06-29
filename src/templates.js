const fs = require('fs')
const path = require('path')
const Handlebars = require("handlebars");

const readTemplate = (templateName) => {
  const templatePath = path.join(__dirname, 'templates', templateName)
  return fs.promises.readFile(templatePath, { encoding: 'utf-8' })
}

const fillTemplate = async (templateName, values) => {
  const templateText = await readTemplate(templateName)
  const template = Handlebars.compile(templateText)
  const filled = template(values)
  return filled
}

const getPackageJSONFile = (projectName) => 
  fillTemplate('package.json', { projectName })

const getJestConfigFile = () =>
  readTemplate('jest.config.js')

const getReadMeFile = (projectName, baseFolderName, chapterPrefix) =>
  fillTemplate('README.md', { projectName, baseFolderName, chapterPrefix })

const getChapterReadMeFile = (name, topics, description = "") =>
  fillTemplate('chapters/README.md', { name, topics, description })

const getTopicReadMeFile = (name, exercises, chapterName) =>
  fillTemplate('chapters/topic/README.md', { name, exercises, chapterName })

const getExerciseReadMeFile = (name, exercises, chapterName, topicName) =>
  fillTemplate('chapters/topic/exercise/README.md', { name, exercises, chapterName, topicName })

const getExerciseTestFile = (name, ids, chapterName, topicName) =>
  fillTemplate('chapters/topic/exercise/exercise.test.js', { ids: ids.map(id => ({ id, topicName, chapterName, name })) })

const getTestUtilsFile = () => readTemplate('testUtils.js')

module.exports.getPackageJSONFile = getPackageJSONFile
module.exports.getJestConfigFile = getJestConfigFile
module.exports.getReadMeFile = getReadMeFile
module.exports.getChapterReadMeFile = getChapterReadMeFile
module.exports.getTopicReadMeFile = getTopicReadMeFile
module.exports.getExerciseReadMeFile = getExerciseReadMeFile
module.exports.getTestUtilsFile = getTestUtilsFile
module.exports.getExerciseTestFile = getExerciseTestFile