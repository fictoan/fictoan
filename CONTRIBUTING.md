# Contributing to Fictoan

Thank you for your interest in contributing to Fictoan! This document provides guidelines and instructions for contributing to the project.

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Fictoan/fictoan-turborepo.git
   cd fictoan-turborepo
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. The project uses Turborepo to manage the monorepo. Familiarize yourself with the packages:
   - `packages/fictoan-react`: The core React component library
   - `packages/fictoan-docs`: The documentation site

## Development Scripts

- `yarn dev`: Start development servers for all packages
- `yarn build`: Build all packages
- `scripts/rebuild.sh`: Rebuild the packages (useful when making changes across packages)

## Pull Request Process

1. Create a feature branch from the main branch with a descriptive name:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them with clear, descriptive messages

3. Before submitting a PR:
   - Ensure your code follows the existing style conventions
   - Add/update documentation if necessary
   - Make sure all tests pass

4. Submit a pull request to the main branch with:
   - A clear title and description
   - Reference to any related issues

5. PR Merging Strategy:
   - PRs require at least one review from a maintainer
   - We use squash merging to keep the commit history clean
   - Feature branches are deleted after merging

## Code Style and Conventions

- Follow existing patterns and conventions in the codebase
- Use TypeScript for all new components
- Keep CSS in separate files with the same name as the component
- Export components through index.tsx files

## Need Help?

Feel free to open an issue if you have any questions or need clarification on any part of the contribution process.