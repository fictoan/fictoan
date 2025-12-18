// REACT CORE ==========================================================================================================
import React, { useMemo } from "react";

// LOCAL COMPONENTS ====================================================================================================
import { Element } from "$element";

// UTILS ===============================================================================================================
import { separateFictoanFromHTMLProps } from "$utils/propSeparation";

// INPUT ===============================================================================================================
import { BaseInputComponent } from "../BaseInputComponent/BaseInputComponent";
import { BaseInputComponentProps } from "../BaseInputComponent/constants";

// STYLES ==============================================================================================================
import "./switch.css";

export type SwitchElementType = HTMLInputElement;
export type SwitchProps = Omit<BaseInputComponentProps<SwitchElementType>,
    "as" | "onChange" | "value"> & {
        checked        ? : boolean;
        onChange       ? : (checked: boolean) => void;
        defaultChecked ? : boolean;
};

// COMPONENT ///////////////////////////////////////////////////////////////////////////////////////////////////////////
export const Switch = React.forwardRef(
    ({ id, name, onChange, checked, defaultChecked, ...props }: SwitchProps, ref: React.Ref<SwitchElementType>) => {
        // Use ID as default for name and value if they’re not provided
        const derivedName  = useMemo(() => name || id, [ name, id ]);

        // Handle the change event to return boolean instead of event
        const handleChange = (value: string) => {
            // Since we’re dealing with a checkbox, the value parameter isn’t relevant
            // Instead, we need to check the current checked state
            const isChecked = !checked;
            onChange?.(isChecked);
        };

        // Separate Fictoan props from HTML props
        const { fictoanProps, htmlProps } = separateFictoanFromHTMLProps({ ...props });
        const finalSize = fictoanProps.size || "medium";

        return (
            <BaseInputComponent<SwitchElementType>
                as="input"
                type="checkbox"
                id={id}
                name={derivedName}
                checked={checked}
                defaultChecked={defaultChecked}
                onValueChange={handleChange}
                size={finalSize}
                {...htmlProps}
            >
                <Element<SwitchElementType>
                    as="div"
                    data-switch
                    ref={ref}
                    className={`size-${finalSize}`}
                />
            </BaseInputComponent>
        );
    },
);
Switch.displayName = "Switch";
