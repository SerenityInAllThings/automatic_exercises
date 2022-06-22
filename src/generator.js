const { getMethods } = require('./fileHandler')
const { 
  getPackageJSONFile, 
  getJestConfigFile, 
  getReadMeFile, 
  getChapterReadMeFile, 
  getTopicReadMeFile, 
  getExerciseReadMeFile, 
  getTestUtilsFile,
  getExerciseTestFile
} = require('./templates')

const generate = async (configPath) => {
  const { makeDirectory, writeFile, getConfigurationFile } = getMethods(configPath)
  const { project: {
    name: projectName,
    baseFolderName,
    chapterPrefix,
    exerciseIdPrefix
  }, chapters } = getConfigurationFile()

  const createChapter = async ({ name: chapterName, topics }) => {
    const chapterFolder = `${baseFolderName}/${chapterPrefix+chapterName}`

    const createTopic = async ({name: topicName, exercises}) => {
      const topicFolder = `${chapterFolder}/${topicName}`

      const createExercise = async ([ exerciseName, ids ]) => {
        const exerciseFolder = `${topicFolder}/${exerciseName}`
        await makeDirectory(exerciseFolder)
        const prefixedIds = ids.map(id => exerciseIdPrefix+id)
        const exerciseFilesCreation = [
          writeFile(`${exerciseFolder}/README.md`, await getExerciseReadMeFile(exerciseName, prefixedIds, chapterName, topicName)),
          writeFile(`${exerciseFolder}/exercise.test.js`, await getExerciseTestFile(exerciseName, prefixedIds, chapterName, topicName)),
        ]
        await Promise.all(exerciseFilesCreation)
      }

      await makeDirectory(topicFolder)
      const topicFilesCreation = [
        writeFile(`${topicFolder}/README.md`, await getTopicReadMeFile(topicName, Object.keys(exercises))),
        ...Object.entries(exercises).map(createExercise)
      ]
      await Promise.all(topicFilesCreation)
    }

    await makeDirectory(chapterFolder)
    const chapterFilesCreation = [
      writeFile(`${chapterFolder}/README.md`, await getChapterReadMeFile(chapterName, topics)),
      ...topics.map(topic => createTopic(topic)),
    ]

    await Promise.all(chapterFilesCreation)
  }
  
  await makeDirectory('/')
  const firstCreations = [
    writeFile('/package.json', await getPackageJSONFile(projectName)),
    writeFile('/jest.config.js', await getJestConfigFile()),
    writeFile('/README.md', await getReadMeFile(projectName, baseFolderName, chapterPrefix)),
    makeDirectory(baseFolderName)
  ]
  await Promise.all(firstCreations)
  await makeDirectory(`${baseFolderName}/utils`)
  await writeFile(`${baseFolderName}/utils/testUtils.js`, await getTestUtilsFile())

  const chapterCreations = chapters.map(createChapter)
  await Promise.all(chapterCreations)
}

module.exports.generate = generate