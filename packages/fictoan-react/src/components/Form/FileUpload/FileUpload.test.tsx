// LOCAL COMPONENTS ====================================================================================================
import { FileUpload } from "./FileUpload";

// TESTS ===============================================================================================================
import "../../../../vitest-matchers";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// FileUpload keeps the picked files itself unless a parent passes `files`,
// and tells the parent about every change through onChange. These pin the
// three contracts a form relies on: `disabled` really disables, a cancelled
// picker is not a pick, and a controlled list is the parent's to clear.

const pdf = (name : string) => new File([ "x" ], name, { type : "application/pdf" });

const input = () => document.querySelector<HTMLInputElement>("input[type=file]")!;

// jsdom's File exposes name through a prototype getter, which the asymmetric
// matchers don't see, so compare the names the last call carried
const names = (onChange : ReturnType<typeof vi.fn>) =>
    (onChange.mock.lastCall?.[0] as File[]).map(file => file.name);

describe("FileUpload — uncontrolled", () => {
    it("shows a picked file and reports it", async () => {
        const onChange = vi.fn();
        render(<FileUpload label="Resume" onChange={onChange} />);

        await userEvent.upload(input(), pdf("cv.pdf"));

        expect(screen.getByText("cv.pdf")).toBeInTheDocument();
        expect(names(onChange)).toEqual([ "cv.pdf" ]);
    });

    it("drops the file when its badge's cross is used", async () => {
        const onChange = vi.fn();
        render(<FileUpload label="Resume" onChange={onChange} />);

        await userEvent.upload(input(), pdf("cv.pdf"));
        await userEvent.click(screen.getByLabelText("Remove cv.pdf"));

        expect(screen.queryByText("cv.pdf")).not.toBeInTheDocument();
        expect(onChange).toHaveBeenLastCalledWith([]);
    });

    it("ignores a cancelled picker (an empty file list)", () => {
        const onChange = vi.fn();
        render(<FileUpload label="Resume" onChange={onChange} />);

        fireEvent.change(input(), { target : { files : [] } });

        expect(onChange).not.toHaveBeenCalled();
        expect(document.querySelector(".uploaded-files")).toBeNull();
    });
});

describe("FileUpload — disabled", () => {
    it("disables the input and marks the wrapper", () => {
        render(<FileUpload label="Resume" disabled />);

        expect(input()).toBeDisabled();
        expect(document.querySelector("[data-file-upload-area]")).toHaveClass("disabled");
        expect(document.querySelector("[data-file-upload-area]")).toHaveAttribute("aria-disabled", "true");
    });

    it("neither opens the picker on click nor takes a drop", () => {
        const onChange = vi.fn();
        render(<FileUpload label="Resume" disabled onChange={onChange} />);
        const click = vi.spyOn(input(), "click");

        fireEvent.click(document.querySelector(".file-upload-area")!);
        fireEvent.drop(document.querySelector(".file-upload-area")!, {
            dataTransfer : { files : [ pdf("cv.pdf") ] },
        });

        expect(click).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
        expect(screen.queryByText("cv.pdf")).not.toBeInTheDocument();
    });

    it("shows a controlled file without a remove cross", () => {
        render(<FileUpload label="Resume" disabled files={[ pdf("cv.pdf") ]} />);

        expect(screen.getByText("cv.pdf")).toBeInTheDocument();
        expect(screen.queryByLabelText("Remove cv.pdf")).not.toBeInTheDocument();
    });
});

describe("FileUpload — controlled", () => {
    it("renders the parent's list and follows it", () => {
        const { rerender } = render(<FileUpload label="Resume" files={[ pdf("cv.pdf") ]} />);
        expect(screen.getByText("cv.pdf")).toBeInTheDocument();

        rerender(<FileUpload label="Resume" files={[]} />);
        expect(screen.queryByText("cv.pdf")).not.toBeInTheDocument();
    });

    it("reports a pick but leaves the list to the parent", async () => {
        const onChange = vi.fn();
        render(<FileUpload label="Resume" files={[]} onChange={onChange} />);

        await userEvent.upload(input(), pdf("cv.pdf"));

        expect(names(onChange)).toEqual([ "cv.pdf" ]);
        expect(screen.queryByText("cv.pdf")).not.toBeInTheDocument();
    });

    it("adds to the parent's list in multiple mode", async () => {
        const onChange = vi.fn();
        render(<FileUpload label="Resume" allowMultipleFiles files={[ pdf("one.pdf") ]} onChange={onChange} />);

        await userEvent.upload(input(), pdf("two.pdf"));

        expect(names(onChange)).toEqual([ "one.pdf", "two.pdf" ]);
    });
});
