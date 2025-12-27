// REACT CORE ==========================================================================================================
import React, { useRef, useState } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { ColourPropTypes } from "$components/Element/constants";
import { Div } from "../../Element/Tags";
import { FormItem } from "../FormItem/FormItem";
import { Badge } from "../../Badge/Badge";
import { Text } from "../../Typography/Text";

// STYLES ==============================================================================================================
import "./file-upload.css";

// TYPES ===============================================================================================================
import { InputLabelCustomProps } from "../InputLabel/InputLabel";

export type FileUploadElementType = HTMLInputElement;
export type FileUploadProps = InputLabelCustomProps & {
    id?: string;
    name?: string;
    accept?: string;
    allowMultipleFiles?: boolean;
    capture?: "user" | "environment";
    height?: string;
    onChange?: (files: File[]) => void;
    instructionMainText?: string;
    instructionSubText?: string;
    badgeBgColour?: ColourPropTypes;
    badgeBgColor?: ColourPropTypes;
    badgeTextColour?: ColourPropTypes;
    badgeTextColor?: ColourPropTypes;
    helpText?: string;
    errorText?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    className?: string;
    "aria-label"?: string;
    "aria-invalid"?: boolean;
};

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FileUpload = React.forwardRef(
    (
        {
            "aria-label": ariaLabel,
            "aria-invalid": ariaInvalid,
            label,
            helpText,
            errorText,
            required,
            accept,
            allowMultipleFiles = false,
            capture,
            height = "120px",
            onChange,
            className = "",
            instructionMainText = "Drag and drop or click to upload",
            instructionSubText = "You can add multiple files",
            invalid,
            id,
            name,
            badgeBgColour,
            badgeTextColour,
            ...props
        }: FileUploadProps,
        ref: React.Ref<FileUploadElementType>
    ) => {
        const [files, setFiles] = useState<File[]>([]);
        const [isDragging, setIsDragging] = useState(false);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
        };

        const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const droppedFiles = Array.from(e.dataTransfer.files);
            handleFiles(droppedFiles);
        };

        const handleFiles = (newFiles: File[]) => {
            if (!allowMultipleFiles) {
                const fileToAdd = newFiles[0];
                setFiles([fileToAdd]);
                onChange?.([fileToAdd]);
            } else {
                setFiles(prevFiles => [...prevFiles, ...newFiles]);
                onChange?.([...files, ...newFiles]);
            }
        };

        const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const selectedFiles = Array.from(e.target.files);
                handleFiles(selectedFiles);
            }
        };

        const removeFile = (indexToRemove: number) => {
            const updatedFiles = files.filter((_, index) => index !== indexToRemove);
            setFiles(updatedFiles);
            onChange?.(updatedFiles);
        };

        const openFileDialog = () => {
            fileInputRef.current?.click();
        };

        return (
            <FormItem
                label={label}
                htmlFor={id}
                helpText={helpText}
                errorText={errorText}
                required={required}
            >
                <Div
                    data-file-upload-area
                    ref={ref as React.Ref<HTMLDivElement>}
                    className={[
                        "file-upload-wrapper",
                        isDragging ? "dragging" : "",
                        className
                    ].filter(Boolean).join(" ")}
                    aria-label={ariaLabel || label}
                    aria-invalid={ariaInvalid || invalid || undefined}
                    aria-required={required}
                >
                    <Div
                        className="file-upload-area"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={openFileDialog}
                        style={{ height }}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            id={id}
                            name={name}
                            onChange={handleFileInput}
                            multiple={allowMultipleFiles}
                            accept={accept}
                            capture={capture}
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
                                    size="small" shape="rounded"
                                    hasDelete
                                    onDelete={() => removeFile(index)}
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
    }
);
FileUpload.displayName = "FileUpload";
