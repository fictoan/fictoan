# Contributing to Fictoan

Thank you for wanting to contribute to Fictoan!

## Project setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Fictoan/fictoan-turborepo.git
   cd fictoan-turborepo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. The project uses Turborepo to manage the monorepo. There are two packages—
   - `packages/fictoan-react`: The core component library for React
   - `packages/fictoan-docs`: The documentation site, hosted at https://fictoan.io

## Development scripts

- `pnpm dev`: Start development servers for all packages, and this will run the `fictoan-docs` package on your local
- `pnpm build`: Build all packages
- `pnpm rebuild`: This builds the `fictoan-react` package, and copies the built files to the `node_modules` folder of the `fictoan-docs` package. This way, you can see the outcome of your component changes directly in the docs, and you can update the content there, too. You run this at the root itself, and the script handles everything.

## Pull request process

1. Create a feature branch from the main branch with a descriptive name:
   ```bash
   git switch -c your-feature-name
   ```

2. Make your changes and commit them with clear, descriptive messages

3. Before submitting a PR:
   - Ensure your code follows the existing style conventions
   - Add/update documentation if necessary
   - Make sure to update the version numbers
     - Bump the patch version for small fixes to existing components
     - Bump the minor version for adding new components or large component refactors
     - Bump major versions only for full library-wide refactors

4. Submit a pull request to the main branch with:
   - A clear title and description
   - Reference to any related issues

5. PR merging strategy:
   - PRs require at least one review from a maintainer
   - We use squash merging to keep the commit history clean
   - Feature branches are deleted after merging
- Note: pushing to `main` does not trigger NPM publish, only merging does. So you can use that to make changes just 
  to the Docs.

6. Once merged to `main`, a Github action handles publishing 

## Code style and conventions

- Follow existing patterns and conventions in the codebase
- Use TypeScript for all new components
- Keep CSS in separate files with the same name as the component
- Export components through barrel index files

## Need help?

Feel free to open an issue if you have any questions or need clarification on any part of the contribution process.
