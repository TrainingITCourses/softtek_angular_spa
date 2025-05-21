# Test rules

- We will use `node:test` for testing, without any external libraries.
- Test will be written in TypeScript 
- Tests are located at the `/test` directory (sibling of `/src`).
- Test files should be named with the pattern `*.test.ts`.  
- Source code is imported with relative full paths, ending in `.ts`.
- The script `npm test` should run the all the tests in the `/test` directory.
- Do not change the source code to make the tests pass.

## Generative process

1. Start with a single JSDoc comment at the top of the test file that describes the complete behavior using Gherkin syntax:
   - One `Given` statement for the context
   - Multiple `When`/`Then` pairs for each scenario
   - Each `When`/`Then` pair should be indented to show it's part of the same context
2. Generate scaffold with `describe` and `test` code using the exact Gherkin text:
   - Use the `Given` statement as the main `describe` block
   - Use each `When` statement as a nested `describe` block
   - Use each `Then` statement as a `test` block
   - Preserve the exact wording from the Gherkin syntax
3. Implement the test following the AAA pattern.

## Test Structure

- Follow the Gherkin syntax for writing tests.
 - **Given** a specific context in a main `describe` block
 - **When** a specific action is taken in a nested `describe` block or a `beforeEach` block
 - **Then** a specific outcome is observed in `test` block
- Follow the AAA pattern adding comments to each step:
  - **Arrange**: Prepare the necessary preconditions and inputs.
  - **Act**: Execute the function or method under test.
  - **Assert**: Verify that the action taken has the expected outcome.

## Test Naming

- Use `actual` and `expected` as prefix for actual and expected values. 
- Doubles should be suffixed with `Spy`, `Mock` or `Stub`.

## Best Practices

- Keep test coverage focused on feature requirements
- Use consistent naming conventions
- Include both happy path and error cases
- Consider edge cases and boundary conditions
- Use appropriate test doubles
- Group related tests logically
- Include cleanup steps where needed 