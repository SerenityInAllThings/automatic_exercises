const fs = require('fs')
const path = require('path')

const getConfigurationFile = (config) => {
  const configPath = path.isAbsolute(config) 
    ? config 
    : path.join(process.cwd(), config)
    try {
      const file = fs.readFileSync(config, { encoding: 'utf-8' })
      const conf = JSON.parse(file)
      validateConfigurationFile(conf)
      return conf
    } catch(err) {
      if (err.code === 'ENOENT')
        throw new Error(`Configuration file '${configPath}' not found`)
      else if (err instanceof SyntaxError)
        throw new Error(`Configuration file needs to be JSON formatted file`)
    }
}

const validateConfigurationFile = (config) => {
  const throwMissingKeyError = (key) => { throw new Error(`Missing '${key}' configuration file key`) }

  if (!config) throw new Error("Missing configuration file")
  const { project, chapters, destination } = config
  if (!project) throwMissingKeyError('project')
  const { name: projectName, baseFolderName, chapterPrefix, exerciseIdPrefix } = project
  if (!projectName) throwMissingKeyError('project.name')
  if (!baseFolderName) throwMissingKeyError('project.baseFolderName')
  if (!chapterPrefix) throwMissingKeyError('project.chapterPrefix')
  if (!exerciseIdPrefix) throwMissingKeyError('project.exerciseIdPrefix')

  if (!chapters) throwMissingKeyError('chapters')
  chapters.forEach(({name: chapterName, topics}, chapterIndex) => {
    if (!chapterName) throwMissingKeyError(`chapters[${chapterIndex}].name`)
    if (!topics || topics.length === 0) throwMissingKeyError(`chapters[${chapterIndex}].topics`)

    topics.forEach(({name: topicName, exercises}, topicIndex) => {
      if (!topicName) throwMissingKeyError(`chapters[${chapterIndex}].topics[${topicIndex}].name`)
      if (!exercises) throwMissingKeyError(`chapters[${chapterIndex}].topics[${topicIndex}].exercises`)
      
      Object.entries(exercises).forEach(([exerciseName, ids]) => {
        if (!exerciseName) throwMissingKeyError(`chapters[${chapterIndex}].topics[${topicIndex}].exercises missing name`)
        if (!ids || ids.length === 0) throwMissingKeyError(`chapters[${chapterIndex}].topics[${topicIndex}].exercises.${key} ids`)
      })
    })
  })

  if (!destination) throwMissingKeyError(`chapters[${chapterIndex}].topics[${topicIndex}].exercises.${key} ids`)
}

const getMethods = (configPath) => {
  const configuration = getConfigurationFile(configPath)
  const { destination } = configuration
  const baseProjectPath = path.isAbsolute(destination) 
    ? destination 
    : path.join(process.cwd(), destination)

  return {
    getConfigurationFile: () => configuration,
    makeDirectory: (relativePath) => {
      const fullPath = path.join(baseProjectPath, relativePath)
      return fs.promises.mkdir(fullPath, { recursive: true })
    },
    writeFile: (relativePath, content) => {
      const fullPath = path.join(baseProjectPath, relativePath)
      return fs.promises.writeFile(fullPath, content, { encoding: 'utf-8' })
    }
  }
}

module.exports.getMethods = getMethods