# Clean code rules

## Intentional naming
- Use fully descriptive names for variables and functions.
- Start with a verb in every function and flag variables (like `is`, `has`, `can`...).  
- Avoid magic numbers and strings by declaring named constants.

## Avoid complexity
- Divide complex instructions into steps.
- Use early return guards for invalid or trivial cases.
- Extract inner blocks of conditional or repetitive code.
  
## Short functions or methods
- Keep them small and focused.
- Keep parameters to a minimum.
- Separate pure functions from functions with side effects.

## Structure the data
- Prefer structures over primitives.
- Prefer composition over inheritance.
- Place validations near the definitions.

## More cohesion, less coupling
- Place together things that change together.
- Show behavior, hide implementation details.
- Wrap external dependencies with adapters.

## Dependencies
- Keep dependencies to a minimum.
- One and only one direction of dependencies.
- One and only one level of dependencies (don't talk to strangers).

## Principles
- YAGNI: You ain't gonna need it (do the minimum).
- KISS: Keep it simple, stupid (do the simplest thing that could work).
- DRY: Don't repeat yourself (do the same thing once, use it everywhere).
