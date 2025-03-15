// Code sample 01 //////////////////////////////////////////////////////////////////////////////////////////////////////
export const sampleHeadings = `<Heading1>Heading 1</Heading1>
<Heading2>Heading 2</Heading2>
<Heading3>Heading 3</Heading3>
<Heading4>Heading 4</Heading4>
<Heading5>Heading 5</Heading5>
<Heading6>Heading 6</Heading6>`;


// Code sample 02 //////////////////////////////////////////////////////////////////////////////////////////////////////
export const sampleTextTheme = `/* FLUID TYPE =================================================== */
:root {
    --screen-width-min : 320;
    --screen-width-max : 1600;
    --font-size-min    : 16;
    --font-size-max    : 20;
    --scale-ratio-min  : 1.08;
    --scale-ratio-max  : 1.12;
}

:root {
    /* GENERICS ================================================= */
    --font-sans-serif                : sans-serif;
    --font-serif                     : serif;
    --font-mono                      : monospace;

    /* PARAGRAPHS =============================================== */
    --paragraph-font                 : var(--font-sans-serif);
    --paragraph-font-size            : var(--text-medium);
    --paragraph-line-height          : 1.2;
    --paragraph-font-weight          : 400;
    --paragraph-text-colour          : var(--grey);

    --paragraph-subtext-colour       : var(--slate-dark30);
    --paragraph-subtext-size         : calc(var(--paragraph-font-size) * 0.8);

    /* HEADINGS ================================================= */
    --heading-font                   : var(--font-sans-serif);
    --heading-text-colour            : var(--slate);
    --heading-font-weight            : 700;
    --heading-line-height            : 1;

    /* LINKS ==================================================== */
    --link-font                      : var(--paragraph-font);
    --link-text-default              : var(--blue);
    --link-text-hover                : var(--blue);

    /* SELECTION ================================================ */
    --text-selected                  : var(--white);
    --text-bg-selected               : var(--hue);`;


// Code sample 03 //////////////////////////////////////////////////////////////////////////////////////////////////////
export const sampleFontImport = `// fonts.css
@font-face {
    font-family : "IBM Plex Sans";
    src         : url("../assets/fonts/IBM-Plex-Sans/IBMPlexSans-Regular.woff2") format("woff2");
    font-weight : 400;
    font-style  : normal;
}

@font-face {
    font-family : "IBM Plex Sans";
    src         : url("../assets/fonts/IBM-Plex-Sans/IBMPlexSans-Bold.woff2") format("woff2");
    font-weight : 700;
    font-style  : normal;
}`;

// Code sample 04 //////////////////////////////////////////////////////////////////////////////////////////////////////
export const sampleTextSizing = `<Text size="nano">Nano text</Text>
<Text size="micro">Micro text</Text>
<Text size="tiny">Tiny text</Text>
<Text size="small">Small text</Text>
<Text size="medium">Medium text</Text>
<Text size="large">Large text</Text>
<Text size="huge">Huge text</Text>`;
