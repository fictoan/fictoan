// Code sample 01 ==============================================================
export const sampleGridRow = `<Row layout="grid">
    
</Row>`;

// Code sample 01 ==============================================================
export const sampleFlexboxRow = `<Row layout="flexbox">
    
</Row>`;


//  Code sample 01 =============================================================
export const sampleRowAndPortion1 = `<Row>
    <Portion desktopSpan="12">
        Some content
    </Portion>
</Row>`;



//  Code sample 01 =============================================================
export const sampleRowAndPortion2 = `<Row>
    <Portion desktopSpan="12">
        Some content
    </Portion>
    
    <Portion desktopSpan="12">
        Some content
    </Portion>
</Row>`;


//  Code sample 01 =============================================================
export const sampleRowAndPortion3 = `<Row>
    <Portion desktopSpan="12"></Portion>
    
    <Portion desktopSpan="12"></Portion>
    
    <Portion desktopSpan="8"></Portion>
    
    <Portion desktopSpan="8"></Portion>
    
    <Portion desktopSpan="8"></Portion>
    
    <Portion desktopSpan="4"></Portion>
    
    <Portion desktopSpan="6"></Portion>
    
    <Portion desktopSpan="14"></Portion>
    
    <Portion desktopSpan="13"></Portion>
    
    <Portion desktopSpan="7"></Portion>
    
    <Portion desktopSpan="6"></Portion>
</Row>`;


//  Code sample 01 =============================================================
export const sampleRowAndPortion4 = `<Row>
    <Portion desktopSpan="12"></Portion>
    
    <Portion desktopSpan="12"></Portion>
</Row>
    
<Row>
    <Portion desktopSpan="8"></Portion>
    
    <Portion desktopSpan="8"></Portion>
    
    <Portion desktopSpan="8"></Portion>
</Row>
    
<Row>
    <Portion desktopSpan="5"></Portion>
    
    <Portion desktopSpan="13"></Portion>
    
    <Portion desktopSpan="6"></Portion>
</Row>`;

//  Code sample 02 =============================================================
export const sampleNamedPortions = `<Row>
    <Portion desktopSpan="2" />

    <Portion desktopSpan="five-sixth" />

    <Portion desktopSpan="9" />

    <Portion desktopSpan="eleven-twelfth" />
</Row>`;

//  Code sample 03a ============================================================
export const sampleResonsiveness = `<Row>
    <Portion desktopSpan="one-sixth" tabletLandscapeSpan="8" tabletPortraitSpan="half" mobileSpan="two-third" />
</Row>`;

//  Code sample 03b ============================================================
export const sampleTurnOffResponsiveness = `<Row retainLayoutOnTabletLandscape /> // Portions don’t change on tablet landscape
    
<Row retainLayoutOnTabPT /> // Portions don’t change on tablet portrait
    
<Row retainLayoutOnMobile /> // Portions don’t change on mobile
    
<Row retainLayoutAlways /> // Portions don’t change widths across devices`;

// =============================================================================
// SIDE PADDING  ===============================================================
//  Code sample 04a ============================================================
export const sampleContentPadding = `<Row />  // Full-width content, this is the default
<Row horizontalPadding="nano" />
<Row horizontalPadding="micro" />
<Row horizontalPadding="tiny" />
<Row horizontalPadding="small" />
<Row horizontalPadding="medium" />
<Row horizontalPadding="huge" />
<Row horizontalPadding="huge" />`;


// =============================================================================
// GUTTER SIZING  ==============================================================
export const sampleGutters = `<Row gutters="none" />
<Row gutters="nano" />
<Row gutters="micro" />
<Row gutters="tiny" />
<Row gutters="small" />
<Row gutters="medium" /> // Default behaviour
<Row gutters="large" />
<Row gutters="huge" />`;
