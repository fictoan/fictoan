# Setup guide

The turborepo has been set up with the essential files from both projects. To complete the setup:

## 1. Install dependencies

From the root of the turborepo, run:

```bash
pnpm install
```

## 2. Test the basic workflow

1. Run the docs site:
   ```bash
   pnpm dev
   ```

2. Build the component library and update it in the docs:
   ```bash
   pnpm rebuild
   ```

## What's been set up

- Essential files from both projects have been copied to the packages directory
- The docs package.json uses `workspace:*` to reference the local fictoan-react
- pnpm workspaces handle linking between packages automatically

## Troubleshooting

If you encounter any issues:

1. Check that the workspace dependencies are resolving correctly
2. Try `pnpm install` from the root to refresh workspace links
3. If needed, run `pnpm rebuild` to force a fresh build
