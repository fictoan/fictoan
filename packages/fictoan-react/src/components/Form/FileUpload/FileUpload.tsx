// REACT CORE ==========================================================================================================
import React, { useRef, useState } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { ColourPropTypes, CommonProps, SpacingTypes } from "$components/Element/constants";
import { Div } from "../../Element/Tags";

// UTILS ===============================================================================================================
import { separateWrapperProps } from "$utils/propSeparation";

// STYLES ==============================================================================================================
import "./file-upload.css";

// OTHER ===============================================================================================================
import { Badge } from "../../Badge/Badge";
import { FormItem, deriveAriaIds } from "../FormItem/FormItem";
import { InputLabelCustomProps } from "../InputLabel/InputLabel";
import { Text } from "../../Typography/Text";

export type FileUploadElementType = HTMLInputElement;
export type FileUploadProps = InputLabelCustomProps & CommonProps & {
    id                  ? : string;
    name                ? : string;
    accept              ? : string;
    allowMultipleFiles  ? : boolean;
    capture             ? : "user" | "environment";
    height              ? : string;
    onChange            ? : (files : File[]) => void;
    // Controlled mode: the files to show as badges. When set, the component
    // renders this list and never its own, so a parent can clear it (after a
    // save, on cancel) or seed it. Leave it out for the uncontrolled default,
    // where the component keeps the picked files itself.
    files               ? : File[];
    instructionMainText ? : string;
    instructionSubText  ? : string;
    badgeBgColour       ? : ColourPropTypes;
    badgeBgColor        ? : ColourPropTypes;
    badgeTextColour     ? : ColourPropTypes;
    badgeTextColor      ? : ColourPropTypes;
    helpText            ? : string;
    errorText           ? : string;
    required            ? : boolean;
    disabled            ? : boolean;
    invalid             ? : boolean;
    className           ? : string;
    size                ? : Exclude<SpacingTypes, "nano" | "huge">;
    "aria-label"? : string;
    "aria-invalid"? : boolean;
};

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FileUpload = React.forwardRef(
    (
        {
            "aria-label"   : ariaLabel,
            "aria-invalid" : ariaInvalid,
            label,
            helpText,
            errorText,
            required,
            accept,
            allowMultipleFiles = false,
            capture,
            height = "120px",
            onChange,
            files : controlledFiles,
            disabled = false,
            className = "",
            instructionMainText = "Drag and drop or click to upload",
            instructionSubText = "You can add multiple files",
            invalid,
            id,
            name,
            badgeBgColour,
            badgeTextColour,
            size,
            ...props
        } : FileUploadProps,
        ref : React.Ref<FileUploadElementType>,
    ) => {
        // Uncontrolled by default; a `files` prop takes over the list and the
        // internal state is left alone
        const [ internalFiles, setInternalFiles ] = useState<File[]>([]);
        const isControlled = controlledFiles !== undefined;
        const files = isControlled ? controlledFiles : internalFiles;

        const [ isDragging, setIsDragging ] = useState(false);
        const fileInputRef = useRef<HTMLInputElement>(null);

        // Every change to the list goes through here, so the callback always
        // carries the list the badges will show
        const commitFiles = (next : File[]) => {
            if (!isControlled) setInternalFiles(next);
            onChange?.(next);
        };

        const handleDragOver = (e : React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (disabled) return;
            setIsDragging(true);
        };

        const handleDragLeave = (e : React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
        };

        const handleDrop = (e : React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            if (disabled) return;
            handleFiles(Array.from(e.dataTransfer.files));
        };

        // A cancelled picker fires a change with an empty list; it is not a
        // pick, so neither the badges nor the callback see it
        const handleFiles = (newFiles : File[]) => {
            if (disabled || newFiles.length === 0) return;
            commitFiles(allowMultipleFiles ? [ ...files, ...newFiles ] : [ newFiles[0] ]);
        };

        const handleFileInput = (e : React.ChangeEvent<HTMLInputElement>) => {
            handleFiles(Array.from(e.target.files ?? []));
        };

        const removeFile = (indexToRemove : number) => {
            if (disabled) return;
            commitFiles(files.filter((_, index) => index !== indexToRemove));
        };

        const openFileDialog = () => {
            if (disabled) return;
            fileInputRef.current?.click();
        };

        // Separate wrapper-level props (margin, padding, etc.) from component-specific props
        const { wrapperProps } = separateWrapperProps(props);

        const reactId = React.useId();
        const finalId = id || `file-upload-${reactId.replace(/:/g, "")}`;
        const { describedBy } = deriveAriaIds(finalId, helpText, errorText);

        return (
            <FormItem
                label={label}
                htmlFor={finalId}
                helpText={helpText}
                errorText={errorText}
                required={required}
                size={size}
                {...wrapperProps}
            >
                <Div
                    data-file-upload-area
                    ref={ref as React.Ref<HTMLDivElement>}
                    className={[
                        "file-upload-wrapper",
                        isDragging ? "dragging" : "",
                        disabled ? "disabled" : "",
                        className,
                    ].filter(Boolean).join(" ")}
                    aria-label={ariaLabel || label}
                    aria-invalid={ariaInvalid || invalid || Boolean(errorText) || undefined}
                    aria-required={required}
                    aria-disabled={disabled || undefined}
                    aria-describedby={describedBy}
                >
                    <Div
                        className="file-upload-area"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={openFileDialog}
                        style={{height}}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            id={finalId}
                            name={name}
                            onChange={handleFileInput}
                            multiple={allowMultipleFiles}
                            accept={accept}
                            capture={capture}
                            disabled={disabled}
                            className="file-input"
                        />

                        {instructionMainText &&
                            <Div className="file-upload-content">
                                <Text>{instructionMainText}</Text>
                                {instructionSubText && (
                                    <Text isSubtext>{instructionSubText}</Text>
                                )}
                            </Div>
                        }
                    </Div>

                    {files.length > 0 && (
                        <Div className="uploaded-files">
                            {files.map((file, index) => (
                                <Badge
                                    key={`${file.name}-${index}`}
                                    size="small"
                                    shape="rounded"
                                    // No cross while disabled: the list can't change
                                    {...(disabled ? {} : {
                                        actionIcon      : "cross" as const,
                                        onActionClick   : () => removeFile(index),
                                        actionAriaLabel : `Remove ${file.name}`,
                                    })}
                                    bgColour={badgeBgColour}
                                    textColour={badgeTextColour}
                                >
                                    {file.name}
                                </Badge>
                            ))}
                        </Div>
                    )}
                </Div>
            </FormItem>
        );
    },
);
FileUpload.displayName = "FileUpload";
