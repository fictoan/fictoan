# Product requirements document: Props configurator refactoring

## 1. Overview

    This document outlines a full-scale refactoring of the props configurator system. The new approach moves away from manual configuration and toward an automated, type-safe, and scalable solution where the component's source code is the **single source of truth**.

    The core of this new architecture is a build script that uses `react-docgen-typescript` to automatically extract prop information directly from the `fictoan-react` component source files. This generated metadata is then consumed by a generic UI component in the docs, which intelligently renders the appropriate controls. Manual configuration is reduced to optional, minimal "enhancement" files for UI polish, especially for complex or aliased types.

## 2. The problem

    The existing system is unsustainable. It suffers from:
    -   **Manual syncing:** Prop definitions are manually duplicated in the docs, leading to them being constantly out of sync with the actual components.
    -   **High maintenance:** The core configurator is a monolithic 560+ line file with scattered, hardcoded logic for each component, making it brittle and difficult to extend.
    -   **Lack of type safety:** The system is written in JavaScript, offering no protection against typos or incorrect prop configurations.
    -   **Poor developer experience:** Adding or updating a component's documentation is a complex, error-prone process that involves modifying core logic.

## 3. The new architecture: A two-part system

    The new system is split into two parts: the source of truth (`fictoan-react`) and the consumer (`fictoan-docs`).

### Part 1: `fictoan-react` (the source of truth)

    This package is responsible for generating a canonical definition of all its component props.

1.  **Automated prop extraction script:**

    -   A new `build:props-metadata` script will be added to `fictoan-react/package.json`.
    -   This script will use `react-docgen-typescript` to statically analyze all components in `src/components/`.
    -   It will extract the prop name, TypeScript type, default value, and description (from its TSDoc comment `/** ... */`).
    -   A lenient `propFilter` is used to exclude props from `node_modules`, and a post-processing step ensures only relevant props (declared within the component's directory) are included.

2.  **The metadata artifact (`props-metadata.json`):**

    -   The script will generate a single `dist/props-metadata.json` file. This file is a build artifact, versioned and published alongside the library's code.
    -   This file becomes the **unquestionable source of truth** for the props of every component in the library.

    *Example `props-metadata.json` structure:*
    ```json
    {
        "Badge": {
            "displayName": "Badge",
            "description": "A small inline element to highlight information.",
            "props": {
                "size": {
                    "type": { "name": "SpacingTypes" },
                    "required": false,
                    "description": "Defines the size of the badge.",
                    "defaultValue": { "value": "medium" }
                },
                "shape": {
                    "type": { "name": "ShapeTypes" },
                    "required": false,
                    "description": "Defines the visual shape of the badge."
                },
                "withDelete": {
                    "type": { "name": "boolean" },
                    "required": false,
                    "description": "If true, a delete icon is shown."
                }
            }
        },
        "...": {}
    }
    ```

### Part 2: `fictoan-docs` (the consumer)

    The docs site consumes the metadata artifact and renders the interactive UI.

1.  **Generic `PropsConfigurator` component:**

    -   A new, simple, and generic `PropsConfigurator` component will be created.
    -   It will take a `componentName` as a prop.
    -   It will import the `props-metadata.json` from `fictoan-react/dist` and find the data for the requested component.
    -   It correctly handles `id` and `name` attributes for form elements, ensuring proper functionality and accessibility.
    -   It uses a higher-order function pattern for `onChange` handlers, aligning with `fictoan-react` conventions.

2.  **Convention over configuration (default controls):**

    -   The `PropsConfigurator` will render UI controls based on sensible defaults derived from the prop's type. **This requires zero configuration for basic types.**
        -   `boolean` -> Renders a `<Checkbox>`.
        -   `'a' | 'b' | 'c'` (string literal union) -> Renders a `<RadioTabGroup>`.
        -   `string` -> Renders an `<InputField>`.
        -   `number` -> Renders an `<InputField type="number">`.
        -   Props from `fictoan-react/src/components/Element/constants.ts` (common props) are automatically hidden.

3.  **Optional UI enhancements (`props.enhancements.ts`):**

    -   To polish the UI, a component's docs page can include an optional `props.enhancements.ts` file.
    -   This file **only provides overrides and UI hints**. It does not redefine props.
    -   **Crucially, this file is used to provide explicit `options` for aliased types like `SpacingTypes` and `ShapeTypes`**, allowing them to be rendered as `RadioTabGroup` controls.
    -   **Possible enhancements:**
        -   `label`: Provide a more user-friendly label (e.g., `withDelete` -> "Show delete button").
        -   `control`: Override the default control (e.g., render a `boolean` as a `Switch` instead of a `Checkbox`).
        -   `group`: Group related props into fieldsets (e.g., "Appearance", "Behavior").
        -   `hidden`: Hide a prop from the UI entirely.
        -   `options`: Explicitly define options for `RadioTabGroup` or `ListBox` when the type is an alias (e.g., `SpacingTypes`).

4.  **Stale enhancement detection:**

    -   The `PropsConfigurator` will perform a diff between the canonical `props-metadata.json` and the local enhancement file.
    -   If an enhancement is defined for a prop that no longer exists in the source of truth, a prominent warning will be displayed in the UI, ensuring the docs never become stale.

## 4. Implementation plan

### Phase 1: Metadata generation

-   **Goal:** Prove the automated extraction works and correctly resolves types.
-   **Tasks:**
    1.  Add `react-docgen-typescript` to `fictoan-react`.
    2.  Create the `build:props-metadata` script, ensuring it uses the correct `tsconfigPath` and a lenient `propFilter` with post-processing.
    3.  Run the script on pilot components (`Badge`, `Button`, `Callout`) and verify the generated `props-metadata.json` is accurate, including aliased types like `SpacingTypes` and `ShapeTypes`.
    4.  Ensure TSDoc comments are correctly parsed as descriptions.

### Phase 2: Core `PropsConfigurator` UI

-   **Goal:** Build the new UI renderer with robust control handling.
-   **Tasks:**
    1.  Create the new generic `PropsConfigurator` component in `fictoan-docs`.
    2.  Implement the logic to read `props-metadata.json`.
    3.  Implement the default control rendering logic (boolean -> checkbox, string literal union -> radio, string -> input, etc.).
    4.  Ensure all form controls (`Checkbox`, `RadioTabGroup`, `InputField`) have correct `id` and `name` attributes.
    5.  Implement the higher-order function pattern for `onChange` handlers.
    6.  Update the `Badge` and `Button` docs pages to use the new configurator, rendering the default (un-enhanced) UI.

### Phase 3: Enhancement layer and migration

-   **Goal:** Add UI polishing capabilities and migrate more components.
-   **Tasks:**
    1.  Implement the system for reading `props.enhancements.ts` and merging the hints with the default props.
    2.  Implement the stale enhancement warning system.
    3.  Create enhancement files for the pilot components to polish their UI (add labels, groups, and **explicit `options` for aliased types like `size` and `shape`**).
    4.  Implement filtering of common props from `Element/constants.ts`.
    5.  Migrate a few more complex components to the new system.

### Phase 4: Full migration and cleanup

-   **Goal:** Complete the migration and deprecate the old system.
-   **Tasks:**
    1.  Migrate all remaining components to the new system.
    2.  Write clear documentation for the new, simplified workflow.
    3.  Delete the old `propsConfigurator.js` and `masterPropsConfig.js` files.
    4.  Ensure all component doc pages have been updated.

## 5. Success metrics

-   The `props-metadata.json` artifact is generated automatically and serves as the single source of truth.
-   The core `PropsConfigurator` component contains zero component-specific logic.
-   Adding a new component's docs requires **zero** changes to the core configurator.
-   Prop changes in `fictoan-react` are automatically reflected in the docs after a build.
-   The old system is 100% removed from the codebase.
-   Developer warnings are shown for stale/invalid enhancement configurations.

## 6. Risks and mitigation

-   **Risk:** `react-docgen-typescript` may struggle with very complex or abstract prop types.
    -   **Mitigation:** We have addressed this by using the `props.enhancements.ts` file to explicitly define options for aliased types, providing a robust fallback when automatic resolution is insufficient.
-   **Risk:** The new build step could slow down the development workflow.
    -   **Mitigation:** The script will be integrated into the `dev` command with a watch mode, ensuring it runs quickly on file changes and does not block development.