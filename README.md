# Automatic exercises

This is intended to be a CLI to help me setup programming exercises repositories.

## Developing

Run npm link to be able to run the CLI command `npm link`

## Running

The project exposes the CLI command `generate-exercises`

## Future things

- Currently running the project does not copy the testUtils file to the resulting project.
- Maybe add a test for each exercise id to check if it is defined. Maybe something like:
```
it('should export exercise entry', () => {
  expect(entry.ex_a).toBeDefined();
})
```