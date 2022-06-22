const { forEachStudent } = require("../../../utils/testUtils")

forEachStudent(process.argv, __dirname, (entry, student) => {
  {{#each ids}}
  
    describe(`${student} entry on {{id}} from chapter {{chapterName}} - {{topicName}}`, () => {
      it("should run fine", () => {
        entry.{{id}}()
      })

      describe("error handling", () => {
        entry.{{id}}()
      })
    })
  {{/each}}
})
