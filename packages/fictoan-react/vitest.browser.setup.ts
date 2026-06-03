import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Raw import — Vite returns the file contents as a string, bypassing the CSS
// pipeline. TS doesn't know the `?raw` suffix, hence the ambient declaration.
declare module "*.css?raw" {
    const css: string;
    export default css;
}
import distCss from "./dist/index.css?raw";

// Load the BUILT, @layer-wrapped stylesheet exactly as consumers ship it, so the
// browser tier verifies the real cascade / container-query / color-mix behaviour.
//
// IMPORTANT: cascade/layout specs use RAW MARKUP that mirrors what a component
// emits (e.g. `<div data-badge className="bg-green">`) rather than importing the
// component. In browser mode Vite still injects a component's own source CSS when
// it's imported — UNLAYERED — which would beat these layered dist rules and
// invalidate the test. The jsdom tier already verifies components emit the right
// classes/attributes; this tier verifies the shipped CSS does the right thing
// with them. Behaviour specs (e.g. the Popover lifecycle) do import components —
// the extra source CSS is harmless to those assertions.
const style = document.createElement("style");
style.textContent = distCss;
document.head.appendChild(style);

afterEach(() => {
    cleanup();
});
