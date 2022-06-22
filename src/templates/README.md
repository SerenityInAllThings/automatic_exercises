# {{projectName}}

## Running

To run all entries, use: `npm run test` or `yarn test`

To run a specific exercise, specify it as an argument 
- `yarn test {{baseFolderName}}/{{chapterPrefix}}3/10/1/` will run exercise 1 of chapter 3.10.
- `yarn test {{baseFolderName}}/{{chapterPrefix}}4/` will run all chapter 4 exercises entries.
- `yarn test {{baseFolderName}}/{{chapterPrefix}}4/ peterson` will run all of Peterson's chapter 4 exercise entries.


## Contribution guidelines

The related code must be placed at `{{baseFolderName}}/{{chapterPrefix}}:chapter:/:subchapter:/:exercise:/:student:.js` mind that everything between `:` is to be replaced.

Examples:
  - Peterson's entry for exercise 1 from chapter 3.9. 
      - `:chapter` is 3
      - `:subchapter` is 9
      - `:exercise` is 1
      - `:student` is Peterson

    so it would be placed at `{{baseFolderName}}/{{chapterPrefix}}3/9/1/peterson.js`

  - Lucas's entry for exercise 7 from chapter 4.12. 
      - `:chapter` is 4
      - `:subchapter` is 12
      - `:exercise` is 7
      - `:student` is Lucas

    so it would be placed at `{{baseFolderName}}/{{chapterPrefix}}4/12/7/lucas.js`




These files must export the exercise entries through functions. 
```
const doSomething = () => {}

module.exports.ex_1 = doSomething
```

The exported name should not be the same as the function name. 

The expected export names should be provided by the README.md file.

Many exercises require multiple entries to complete. These should be exported separately 
```
const doSomething = () => {}
const doSomethingElse = () => {}

module.exports.ex_1a = doSomething
module.exports.ex_1a = doSomethingElse
```