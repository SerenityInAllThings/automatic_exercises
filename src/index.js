#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { generate } = require('./generator')
const argv = yargs(hideBin(process.argv)).argv

const run = () => {
  try {
    const { config } = argv
    if (!config) {
      console.error('Please provide the -config file pointing to a configuration file')
      return
    }
    generate(config)
  } catch (err) {
    if (err instanceof Error)
      console.error(err.message)
    else
      console.error(`Unexpected error: ${err} + ${JSON.stringify(err)}`, err)
  }
}

run()