// CSS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LOCAL COMPONENTS ====================================================================================================
import "./components/Typography/typography.css";

// STYLES ==============================================================================================================
import "./styles/Normalize.css";
import "./styles/animations.css";
import "./styles/colours.css";
import "./styles/custom-colours.css";
import "./styles/globals.css";
import "./styles/reset.css";
import "./styles/theme.css";
import "./styles/utilities.css";

// COMPONENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////
export { Accordion, type AccordionProps } from "./components/Accordion";

export { Badge, type BadgeProps } from "./components/Badge";

export { Breadcrumbs, type BreadcrumbsProps } from "./components/Breadcrumbs";

export { Button, type ButtonProps } from "./components/Button";

export { Callout, type CalloutProps } from "./components/Callout";

export { Card, type CardProps } from "./components/Card";

export { CodeBlock, type CodeBlockProps } from "./components/CodeBlock";

export { Divider, type DividerProps } from "./components/Divider";

export { Drawer, type DrawerProps, showDrawer, hideDrawer, toggleDrawer, isDrawerOpen } from "./components/Drawer";

export {
    Element,
    type ElementProps,
    Div,
    Article,
    Aside,
    Body,
    Footer,
    Header,
    Main,
    Nav,
    Section,
    Span,
    Hyperlink
} from "./components/Element";

export {
    Form,
    type FormProps,
    FormItem,
    type FormItemProps,
    FormItemGroup,
    type FormItemGroupProps,
    InputField,
    type InputFieldProps,
    TextArea,
    type TextareaProps,
    InputLabel,
    type InputLabelProps,
    Select,
    type SelectProps,
    FileUpload,
    type FileUploadProps,
    RadioGroup,
    type RadioGroupProps,
    RadioButton,
    type RadioButtonProps,
    Checkbox,
    type CheckboxProps,
    CheckboxGroup,
    type InputGroupProps,
    Switch,
    SwitchGroup,
    type SwitchProps,
    Range,
    type RangeProps,
    RadioTabGroup,
    type RadioTabGroupProps,
    PinInputField,
    type PinInputFieldProps,
    ListBox,
    type ListBoxProps
} from "./components/Form";

export { Meter, type MeterProps, type MeterMetaProps } from "./components/Meter";

export { Modal, type ModalProps, showModal, hideModal, toggleModal } from "./components/Modal";

export {
    NotificationsWrapper,
    type NotificationsWrapperProps,
    NotificationItem,
    type NotificationItemProps,
} from "./components/Notification";

export { OptionCard, OptionCardsGroup, type OptionCardProps, type OptionCardsGroupRef } from "./components/OptionCard";
export { useOptionCard, useOptionCardsGroup } from "./components/OptionCard";

export { Pagination, type PaginationProps } from "./components/Pagination";

export { Portion, type PortionProps } from "./components/Portion";

export { ProgressBar, type ProgressBarProps, type ProgressBarMetaProps } from "./components/ProgressBar";

export { Row, type RowProps } from "./components/Row";

export {
    SidebarWrapper,
    type SidebarWrapperNewProps,
    ContentWrapper,
    type ContentWrapperProps,
    SidebarHeader,
    type SidebarHeaderNewProps,
    SidebarItem,
    type SidebarItemNewProps,
    SidebarFooter,
    type SidebarFooterNewProps,
} from "./components/Sidebar";

export {
    Skeleton,
    type SkeletonProps,
    SkeletonGroup,
    type SkeletonGroupProps,
} from "./components/Skeleton";

export { Spinner, type SpinnerProps } from "./components/Spinner";

export { Table, type TableProps } from "./components/Table";

export { Tabs, type TabsProps } from "./components/Tabs";

export { ThemeProvider, type ThemeProviderProps, useTheme } from "./components/ThemeProvider";

export { ToastsWrapper, type ToastsWrapperProps, ToastItem, type ToastItemProps } from "./components/Toast";

export { Tooltip, type TooltipProps } from "./components/Tooltip";

export {
    Text,
    type TextProps,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    type HeadingProps,
} from "./components/Typography";

// CONSTANTS AND TYPES /////////////////////////////////////////////////////////////////////////////////////////////////
export {
    DefaultColours,
    BasicColours,
    FictoanColours,
    type ColourPropTypes,
    type EmphasisTypes,
    type SpacingTypes,
    type ShadowTypes,
    type ShapeTypes,
    type OpacityTypes,
    type WeightTypes,
} from "./components/Element/constants";
