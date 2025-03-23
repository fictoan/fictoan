# Setup guide

The turborepo has been set up with the essential files from both projects. To complete the setup:

## 1. Install dependencies

From the root of the turborepo, run:

```bash
yarn install
```

## 2. Test the basic workflow

1. Run the docs site:
   ```bash
   yarn dev
   ```

2. Build the component library and update it in the docs:
   ```bash
   yarn rebuild
   ```

## What's been set up

- Essential files from both projects have been copied to the packages directory
- The docs package.json has been updated to use the workspace version of fictoan-react
- A script has been created to build the library and copy it to the docs `node_modules`

## Troubleshooting

If you encounter any issues:

1. Check that the workspace dependencies are resolving correctly
2. Ensure the copy script is finding the right paths for the library files
3. If needed, copy any additional files or scripts that weren't included in the initial setup
