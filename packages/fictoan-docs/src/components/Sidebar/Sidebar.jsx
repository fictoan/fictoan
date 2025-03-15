// EXTERNAL DEPS ///////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// INTERNAL DEPS ///////////////////////////////////////////////////////////////////////////////////////////////////////
import {
    SidebarWrapper,
    SidebarHeader,
    SidebarItem,
    SidebarFooter,
    Divider,
    Accordion,
    useTheme,
    Text,
} from "fictoan-react";

// COMPONENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////

// STYLES //////////////////////////////////////////////////////////////////////////////////////////////////////////////
import "./sidebar.css";

// ASSETS //////////////////////////////////////////////////////////////////////////////////////////////////////////////
import FictoanIcon from "../../assets/images/fictoan-icon.svg";
import FictoanLogo from "../../assets/images/fictoan-logo.svg";

import AccordionIcon from "../../assets/icons/accordion.svg";
import BadgeIcon from "../../assets/icons/badge.svg";
import BaseElementIcon from "../../assets/icons/building-block.svg";
import BreadcrumbsIcon from "../../assets/icons/breadcrumbs.svg";
import ButtonIcon from "../../assets/icons/button.svg";
import CalloutIcon from "../../assets/icons/callout.svg";
import CardIcon from "../../assets/icons/card.svg";
import CheckboxIcon from "../../assets/icons/checkbox.svg";
import CodeIcon from "../../assets/icons/braces.svg";
import ColourIcon from "../../assets/icons/water.svg";
import DividerIcon from "../../assets/icons/hrule.svg";
import FormWrapperIcon from "../../assets/icons/form-wrapper.svg";
import HomeIcon from "../../assets/icons/home.svg";
import InfoPanelIcon from "../../assets/icons/drawer.svg";
import InputFieldIcon from "../../assets/icons/input.svg";
import ListBoxIcon from "../../assets/icons/list-box.svg";
import LayoutIcon from "../../assets/icons/layout.svg";
import ModalIcon from "../../assets/icons/modal.svg";
import ManifestoIcon from "../../assets/icons/manifesto.svg";
import NotificationIcon from "../../assets/icons/notification.svg";
import PaginationIcon from "../../assets/icons/pagination.svg";
import PinInputIcon from "../../assets/icons/pin-input.svg";
import OptionCardsIcon from "../../assets/icons/option-cards.svg";
import ProgressBarIcon from "../../assets/icons/progress-bar.svg";
import RadioButtonIcon from "../../assets/icons/radio-button.svg";
import RangeIcon from "../../assets/icons/range.svg";
import SelectIcon from "../../assets/icons/select.svg";
import SidebarIcon from "../../assets/icons/sidebar.svg";
import SkeletonIcon from "../../assets/icons/skeleton.svg";
import TableIcon from "../../assets/icons/table.svg";
import TabsIcon from "../../assets/icons/tabs.svg";
import ThemeIcon from "../../assets/icons/paintbrush.svg";
import ThemeSwitchIcon from "../../assets/icons/theme.svg";
import ToastIcon from "../../assets/icons/toast.svg";
import TooltipIcon from "../../assets/icons/tooltip.svg";
import ToolboxIcon from "../../assets/icons/toolbox.svg";
import TypographyIcon from "../../assets/icons/typography.svg";


export const Sidebar = ({ sidebarState, setSidebarState, showSidebarOnMobile, setShowSidebarOnMobile }) => {
    const ref = useRef(null);

    // const [ theme, setTheme ] = useTheme();
    //
    // const toggleTheme = () => {
    //     if (theme === "theme-light") {
    //         setTheme("theme-dark");
    //     } else {
    //         setTheme("theme-light");
    //     }
    // };

    const openMobileSidebar = () => {
        setShowSidebarOnMobile(true);
    };

    const closeMobileSidebar = () => {
        setShowSidebarOnMobile(false);
    };

    const pathname = usePathname();

    const headerOnClick = () => {
        setSidebarState(sidebarState === "collapsed" ? "" : "collapsed");
    };

    return (
        <SidebarWrapper
            ref={ref}
            showMobileSidebar={showSidebarOnMobile}
            closeOnClickOutside={closeMobileSidebar}
            className={`${sidebarState === "collapsed" ? "collapsed" : ""}`}
        >
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* HEADER */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <SidebarHeader isSticky onClick={headerOnClick}>
                <div className="header-logo">
                    <FictoanLogo />
                </div>

                <div className="header-icon">
                    <FictoanIcon />
                </div>
            </SidebarHeader>

            <Link href="/" className={`${pathname === "/" ? "active" : ""}`}>
                <SidebarItem onClick={closeMobileSidebar}>
                    <HomeIcon />
                    <Text weight="400">Home</Text>
                </SidebarItem>
            </Link>

            <Link href="/manifesto" className={`${pathname === "/manifesto" ? "active" : ""}`}>
                <SidebarItem onClick={closeMobileSidebar}>
                    <ManifestoIcon />
                    <Text weight="400">Manifesto</Text>
                </SidebarItem>
            </Link>

            <Divider kind="tertiary" verticalMargin="micro" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* OVERVIEW */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <SidebarItem hasEmptyIcon>
                <Text weight="400">OVERVIEW</Text>
            </SidebarItem>

            {/* GETTING STARTED ==================================================================================== */}
            <Link href="/getting-started">
                <SidebarItem onClick={closeMobileSidebar}>
                    <HomeIcon />
                    <Text weight="400">Getting started</Text>
                </SidebarItem>
            </Link>

            {/* THEME ============================================================================================== */}
            <Link href="/theme" className={`${pathname === "/theme" ? "active" : ""}`}>
                <SidebarItem onClick={closeMobileSidebar}>
                    <ThemeIcon />

                    <Text weight="400">Theme</Text>
                </SidebarItem>
            </Link>

            {/* BASE ELEMENT ======================================================================================= */}
            <Link href="/base-element">
                <SidebarItem onClick={closeMobileSidebar}>
                    <BaseElementIcon />

                    <Text weight="400">Base element</Text>
                </SidebarItem>
            </Link>

            {/* LAYOUT ============================================================================================= */}
            <Link href="/layout">
                <SidebarItem onClick={closeMobileSidebar}>
                    <LayoutIcon />
                    <Text weight="400">Layout</Text>
                </SidebarItem>
            </Link>

            {/* TYPOGRAPHY ========================================================================================= */}
            <Link href="/typography">
                <SidebarItem onClick={closeMobileSidebar}>
                    <TypographyIcon />
                    <Text weight="400">Typography</Text>
                </SidebarItem>
            </Link>

            {/* COLOUR ============================================================================================= */}
            <Link href="/colour">
                <SidebarItem onClick={closeMobileSidebar}>
                    <ColourIcon />
                    <Text weight="400">Colour</Text>
                </SidebarItem>
            </Link>

            <Divider kind="tertiary" verticalMargin="micro" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* ELEMENTS */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <SidebarItem hasEmptyIcon>
                <Text weight="400">COMPONENTS</Text>
            </SidebarItem>

            {/* ACCORDION ========================================================================================== */}
            <Link href="/components/accordion">
                <SidebarItem onClick={closeMobileSidebar}>
                    <AccordionIcon />
                    <Text weight="400">Accordion</Text>
                </SidebarItem>
            </Link>

            {/* BADGE ============================================================================================== */}
            <Link href="/components/badge">
                <SidebarItem onClick={closeMobileSidebar}>
                    <BadgeIcon />
                    <Text weight="400">Badge</Text>
                </SidebarItem>
            </Link>

            {/* BREADCRUMBS ======================================================================================== */}
            <Link href="/components/breadcrumbs">
                <SidebarItem onClick={closeMobileSidebar}>
                    <BreadcrumbsIcon />
                    <Text weight="400">Breadcrumbs</Text>
                </SidebarItem>
            </Link>

            {/* BUTTON ============================================================================================= */}
            <Link href="/components/button">
                <SidebarItem onClick={closeMobileSidebar}>
                    <ButtonIcon />
                    <Text weight="400">Button</Text>
                </SidebarItem>
            </Link>

            {/* CALLOUT ============================================================================================ */}
            <Link href="/components/callout">
                <SidebarItem onClick={closeMobileSidebar}>
                    <CalloutIcon />
                    <Text weight="400">Callout</Text>
                </SidebarItem>
            </Link>

            {/* CARD =============================================================================================== */}
            <Link href="/components/card">
                <SidebarItem onClick={closeMobileSidebar}>
                    <CardIcon />
                    <Text weight="400">Card</Text>
                </SidebarItem>
            </Link>

            {/* CHECKBOX / SWITCH ================================================================================== */}
            <Link href="/components/checkbox">
                <SidebarItem onClick={closeMobileSidebar}>
                    <CheckboxIcon />
                    <Text weight="400">Checkbox / Switch</Text>
                </SidebarItem>
            </Link>

            {/* CODE BLOCK ========================================================================================= */}
            <Link href="/components/code-block">
                <SidebarItem onClick={closeMobileSidebar}>
                    <CodeIcon />
                    <Text weight="400">Code block</Text>
                </SidebarItem>
            </Link>

            {/* DIVIDER ============================================================================================ */}
            <Link href="/components/divider">
                <SidebarItem onClick={closeMobileSidebar}>
                    <DividerIcon />
                    <Text weight="400">Divider</Text>
                </SidebarItem>
            </Link>

            {/* DRAWER ============================================================================================= */}
            <Link href="/components/drawer">
                <SidebarItem onClick={closeMobileSidebar}>
                    <InfoPanelIcon />
                    <Text weight="400">Drawer</Text>
                </SidebarItem>
            </Link>

            {/* FORM WRAPPER ======================================================================================= */}
            <Link href="/components/form">
                <SidebarItem onClick={closeMobileSidebar}>
                    <FormWrapperIcon />
                    <Text weight="400">Form</Text>
                </SidebarItem>
            </Link>

            {/* INPUT FIELD ======================================================================================== */}
            <Link href="/components/input-field">
                <SidebarItem onClick={closeMobileSidebar}>
                    <InputFieldIcon />
                    <Text weight="400">Input field</Text>
                </SidebarItem>
            </Link>

            {/* METER ============================================================================================== */}
            <Link href="/components/list-box">
                <SidebarItem onClick={closeMobileSidebar}>
                    <ListBoxIcon />
                    <Text weight="400">List box</Text>
                </SidebarItem>
            </Link>

            {/* METER ============================================================================================== */}
            <Link href="/components/meter">
                <SidebarItem onClick={closeMobileSidebar}>
                    <ProgressBarIcon />
                    <Text weight="400">Meter</Text>
                </SidebarItem>
            </Link>

            {/* MODAL ============================================================================================== */}
            <Link href="/components/modal">
                <SidebarItem onClick={closeMobileSidebar}>
                    <ModalIcon />
                    <Text weight="400">Modal</Text>
                </SidebarItem>
            </Link>

            {/* NOTIFICATIONS ====================================================================================== */}
            <Link href="/components/notifications">
                <SidebarItem onClick={closeMobileSidebar}>
                    <NotificationIcon />
                    <Text weight="400">Notifications</Text>
                </SidebarItem>
            </Link>

            {/* OPTION CARDS ======================================================================================= */}
            <Link href="/components/option-cards">
                <SidebarItem onClick={closeMobileSidebar}>
                    <OptionCardsIcon />
                    <Text weight="400">Option cards</Text>
                </SidebarItem>
            </Link>

            {/* PAGINATION ========================================================================================= */}
            <Link href="/components/pagination">
                <SidebarItem onClick={closeMobileSidebar}>
                    <PaginationIcon />
                    <Text weight="400">Pagination</Text>
                </SidebarItem>
            </Link>

            {/* PIN INPUT FIELD ==================================================================================== */}
            <Link href="/components/pin-input-field">
                <SidebarItem onClick={closeMobileSidebar}>
                    <PinInputIcon />
                    <Text weight="400">Pin Input</Text>
                </SidebarItem>
            </Link>

            {/* PROGRESS BAR ======================================================================================= */}
            <Link href="/components/progress-bar">
                <SidebarItem onClick={closeMobileSidebar}>
                    <ProgressBarIcon />
                    <Text weight="400">Progress bar</Text>
                </SidebarItem>
            </Link>

            {/* RADIO BUTTON ======================================================================================= */}
            <Link href="/components/radio-button">
                <SidebarItem onClick={closeMobileSidebar}>
                    <RadioButtonIcon />
                    <Text weight="400">Radio button</Text>
                </SidebarItem>
            </Link>

            {/* RADIO TABS ========================================================================================= */}
            <Link href="/components/radio-tab-group">
                <SidebarItem onClick={closeMobileSidebar}>
                    <TabsIcon />
                    <Text weight="400">Radio tab group</Text>
                </SidebarItem>
            </Link>

            {/* SELECT ============================================================================================= */}
            <Link href="/components/range">
                <SidebarItem onClick={closeMobileSidebar}>
                    <RangeIcon />
                    <Text weight="400">Range</Text>
                </SidebarItem>
            </Link>

            {/* SELECT ============================================================================================= */}
            <Link href="/components/select">
                <SidebarItem onClick={closeMobileSidebar}>
                    <SelectIcon />
                    <Text weight="400">Select</Text>
                </SidebarItem>
            </Link>

            {/* SIDEBAR ============================================================================================ */}
            <Accordion summary={(
                <SidebarItem>
                    <SidebarIcon />
                    <Text weight="400">Sidebar</Text>
                </SidebarItem>
            )}>
                <Link href="/components/sidebar">
                    <SidebarItem onClick={closeMobileSidebar} hasEmptyIcon>
                        <Text weight="400" marginLeft="micro">Wrapper</Text>
                    </SidebarItem>
                </Link>

                <Link href="/components/sidebar-item">
                    <SidebarItem onClick={closeMobileSidebar} hasEmptyIcon>
                        <Text weight="400" marginLeft="micro">Item</Text>
                    </SidebarItem>
                </Link>
            </Accordion>

            {/* SKELETON =========================================================================================== */}
            <Link href="/components/skeleton">
                <SidebarItem onClick={closeMobileSidebar}>
                    <SkeletonIcon />
                    <Text weight="400">Skeleton</Text>
                </SidebarItem>
            </Link>

            {/* TABLE ============================================================================================== */}
            <Link href="/components/table">
                <SidebarItem onClick={closeMobileSidebar}>
                    <TableIcon />
                    <Text weight="400">Table</Text>
                </SidebarItem>
            </Link>

            {/* TABS =============================================================================================== */}
            <Link href="/components/tabs">
                <SidebarItem onClick={closeMobileSidebar}>
                    <TabsIcon />
                    <Text weight="400">Tabs</Text>
                </SidebarItem>
            </Link>

            {/* TOAST ============================================================================================== */}
            <Link href="/components/toast">
                <SidebarItem onClick={closeMobileSidebar}>
                    <ToastIcon />
                    <Text weight="400">Toast</Text>
                </SidebarItem>
            </Link>

            {/* TOOLTIP ============================================================================================ */}
            <Link href="/components/tooltip">
                <SidebarItem onClick={closeMobileSidebar}>
                    <TooltipIcon />
                    <Text weight="400">Tooltip</Text>
                </SidebarItem>
            </Link>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* FOOTER */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* <SidebarFooter> */}
            {/*     <SidebarItem onClick={toggleTheme}> */}
            {/*         <ThemeSwitchIcon /> */}
            {/*         <Text weight="400">Theme</Text> */}
            {/*     </SidebarItem> */}
            {/* </SidebarFooter> */}
        </SidebarWrapper>
    );
};
