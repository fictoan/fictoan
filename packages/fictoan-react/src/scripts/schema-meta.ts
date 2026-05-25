// Curated metadata for the Fictoan schema. Hand-authored — descriptions,
// canonical examples, and composition rules that the auto-extracted prop
// data can't capture. Components not listed here fall back to auto-only.

export interface ComponentMeta {
    description    : string;
    example        : string;
    composition  ? : {
        children ? : string;
        parent   ? : string;
        siblings ? : string;
    };
    tips         ? : string[];
}

export const componentMeta : Record<string, ComponentMeta> = {
    Row : {
        description : "The horizontal layout primitive. A 24-column CSS grid that caps at 2400px and centres automatically. Children are Portions. Acts as a CSS container, so Portion responsive variants react to the Row's actual rendered width, not the viewport.",
        example     : `<Row horizontalPadding="medium" gutters="medium">\n    <Portion desktopSpan="half">Left</Portion>\n    <Portion desktopSpan="half">Right</Portion>\n</Row>`,
        composition : { children : "Portion[]" },
        tips        : [
            "Use `gutters` for inter-column spacing; `horizontalPadding` for left/right padding inside the Row.",
            "Set `allowUltraWide` only when you explicitly need the Row to fill viewports beyond 2400px.",
            "Use `retainLayoutOnMobile` (or `retainLayoutAlways`) to prevent the grid from collapsing to a single column.",
            "A Row inside a narrow parent (sidebar, modal, etc.) collapses its Portions based on its OWN width, not the viewport.",
        ],
    },

    Portion : {
        description : "Child of Row. Declares a column span at one or more breakpoints. Uses fraction names ('half', 'one-third') or numbers ('1' through '24'). Breakpoints are now CONTAINER-relative: the parent Row's rendered width decides which span applies, not the viewport.",
        example     : `<Portion desktopSpan="half" mobileSpan="whole">\n    Content\n</Portion>`,
        composition : { parent : "Row" },
        tips        : [
            "Fraction names: one-twelfth, one-eighth, one-sixth, one-fourth, one-third, five-twelfth, half, seven-twelfth, two-third, three-fourth, five-sixth, seven-eighth, eleven-twelfth, whole.",
            "Numeric spans 1–24 give exact column counts.",
            "When the parent Row is ≤ 600px wide, every Portion collapses to span 24 unless `mobileSpan` is set or the Row has `retainLayoutOnMobile`.",
            "Breakpoints are container-relative (Row width), not viewport-relative. A Portion inside a sidebar will stack regardless of the screen size.",
        ],
    },

    Button : {
        description : "Clickable action element. Use `kind` for semantic emphasis; `variant` for status colour; `size` and `shape` for visual variants.",
        example     : `<Button kind="primary" size="medium">Click me</Button>`,
        tips        : [
            "kind='custom' lets you pair it with `bgColour`, `textColour`, `borderColour` for arbitrary colour combinations.",
            "Use `isLoading` to show a spinner and disable interaction.",
            "Wrap in next/link or react-router Link for navigation; don't reach for `href` here.",
        ],
    },

    Card : {
        description : "Generic surface container with shadow, border, and rounded shape. Use for grouping related content.",
        example     : `<Card padding="medium" shadow="soft" shape="rounded">\n    <Heading6>Title</Heading6>\n    <Text>Body</Text>\n</Card>`,
        tips        : [
            "Card supports the universal `padding`, `bgColour`, `shadow`, `shape` props directly — no Card-specific styling props.",
        ],
    },

    Heading1 : {
        description : "Page-level heading (h1). Use one per page. For lighter weights, set `weight` directly.",
        example     : `<Heading1 marginBottom="micro">Welcome</Heading1>`,
    },

    Text : {
        description : "Paragraph text (p). Universal text-styling props (textColour, weight) apply.",
        example     : `<Text textColour="grey-dark40">Body copy here.</Text>`,
    },

    InputField : {
        description : "Single-line text input with built-in label, helper text, validation, and icon slots.",
        example     : `<InputField\n    label="Email"\n    type="email"\n    value={email}\n    onChange={setEmail}\n    required\n/>`,
        tips        : [
            "Pass either an `onChange` that takes a value, or a standard React change event handler — both shapes are supported.",
            "Use `iconLeft` / `iconRight` for inline icons; `helperText` for descriptions below the field.",
            "For validation, pass `errorText` or `successText`.",
        ],
    },

    Select : {
        description : "Native HTML select with Fictoan styling. For combobox / searchable / multi-select, use ListBox.",
        example     : `<Select\n    label="Country"\n    options={[{ label: "India", value: "in" }]}\n    onChange={setCountry}\n/>`,
    },

    ListBox : {
        description : "Searchable, optionally multi-select combobox. Richer than Select but heavier — prefer Select when the option list is short.",
        example     : `<ListBox\n    label="Tags"\n    options={tagOptions}\n    allowMultiSelect\n    onChange={setTags}\n/>`,
    },

    Modal : {
        description : "Overlay dialog. Built on the native popover API; manages focus, backdrop, and ESC handling.",
        example     : `<Modal\n    id="confirm-modal"\n    openWhen={isOpen}\n    onClose={() => setIsOpen(false)}\n>\n    <Heading4>Confirm action</Heading4>\n    <Text>Are you sure?</Text>\n</Modal>`,
        tips        : [
            "Mount once near the root; toggle visibility with `openWhen`. Don't conditionally render the Modal itself.",
        ],
    },

    Drawer : {
        description : "Side-anchored overlay panel. Common for navigation, filters, settings.",
        example     : `<Drawer\n    id="filters"\n    openWhen={isOpen}\n    position="right"\n    size="medium"\n    onCloseCallback={() => setIsOpen(false)}\n>\n    Filter content\n</Drawer>`,
    },

    Tabs : {
        description : "Tabbed content switcher. Pass a tabs array with label + content for each tab.",
        example     : `<Tabs\n    tabs={[\n        { label: "Overview", content: <Overview /> },\n        { label: "Details",  content: <Details /> },\n    ]}\n/>`,
    },

    Callout : {
        description : "Inline emphasis box for notes, warnings, success/error messages.",
        example     : `<Callout kind="info">\n    Heads up — this affects all users.\n</Callout>`,
    },

    Notification : {
        description : "Persistent in-page notification. For transient stacked notifications, use Toast via ToastsProvider + useToasts.",
        example     : `<Notification kind="success" withDismissButton>\n    Saved.\n</Notification>`,
    },

    Badge : {
        description : "Small inline label for counts, statuses, tags.",
        example     : `<Badge bgColour="blue" textColour="white">New</Badge>`,
    },

    Form : {
        description : "Wrapper that establishes consistent vertical spacing between form children via inheritFormSpacing.",
        example     : `<Form>\n    <InputField label="Name" />\n    <InputField label="Email" />\n    <Button kind="primary">Submit</Button>\n</Form>`,
    },

    ThemeProvider : {
        description : "Root provider that supplies the theme context. Wrap your app once at the top level.",
        example     : `<ThemeProvider>\n    <App />\n</ThemeProvider>`,
        tips        : [
            "Pair with `useTheme()` inside descendants to read or change theme.",
        ],
    },
};
