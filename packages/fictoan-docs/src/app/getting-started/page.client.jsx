"use client";

// REACT CORE ==========================================================================================================
import Link from "next/link";
import React, { useState, useEffect } from "react";

// UI ==================================================================================================================
import { Element, Row, Portion, Heading1, Heading4, Heading5, Heading6, Text, Divider, Drawer, Tabs, CodeBlock, Accordion, Section, Span, Article } from "fictoan-react";

// ASSETS ==============================================================================================================
import AppleIcon from "../../assets/icons/logo-apple.svg";
import LinuxIcon from "../../assets/icons/logo-linux.svg";
import NPMIcon from "../../assets/icons/npm.svg";
import PNPMIcon from "../../assets/icons/pnpm.svg";
import WindowsIcon from "../../assets/icons/logo-windows.svg";
import YarnIcon from "../../assets/icons/yarn.svg";
import { snippetPageSetupJSX, snippetPageSetupCSS, snippetStructure, snippetUsage, snippetInstallation } from "../../assets/code-samples/CodeSamples";

// STYLES ==============================================================================================================
import "./getting-started.css";

// OTHER ===============================================================================================================
import { InteractiveCardExample } from "./InteractiveCardExample";

const GettingStarted = () => {
    const [isComplexSetupDrawerOpen, setIsComplexSetupDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("macos-docs");

    useEffect(() => {
        // Check if we're in a browser environment
        if (typeof window !== "undefined") {
            const platform = navigator.platform.toLowerCase();
            if (platform.includes("win")) {
                setSelectedTab("windows-docs");
            } else if (platform.includes("mac")) {
                setSelectedTab("macos-docs");
            } else if (platform.includes("linux")) {
                setSelectedTab("linux-docs");
            }
        }
    }, []);

    return (
        <Article id="page-getting-started">
            <Row
                horizontalPadding="huge"
                marginTop="medium"
                marginBottom="small"
            >
                <Portion>
                    <Heading1 className="text-hue">Getting started</Heading1>
                </Portion>
            </Row>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* FIRST TIMERS */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="dev-environment-setup">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Accordion
                            isFullWidth
                            summary={
                                <Heading5>First time coding? Click here.</Heading5>
                            }
                        >
                            <Tabs
                                activeTab={selectedTab}
                                onTabChange={setSelectedTab}
                                tabs={[
                                    {
                                        key     : "macos-docs",
                                        label   : (
                                            <Element verticallyCentreItems>
                                                <AppleIcon />
                                                <Text marginLeft="nano">Mac OS</Text>
                                            </Element>
                                        ),
                                        content : (
                                            <>
                                                {/* STEP 1 — INSTALL HOMEBREW ////////////////////////////////////////////////////////// */}
                                                <Text marginTop="small" marginBottom="micro">
                                                    This might <em>seem</em> scary—but it really is not! You got this!
                                                    😊
                                                </Text>

                                                <Heading6 marginBottom="nano">Step 1 — Install Homebrew</Heading6>

                                                <Text marginBottom="micro">
                                                    First, you&rsquo;ll need a package manager called <a
                                                    href="https://brew.sh"
                                                    target="_blank"
                                                    rel="noreferrer">Homebrew &#8599;</a>.
                                                    <Span opacity="60">
                                                        A package manager is a tool that lets you install and manage
                                                        software &ldquo;packages&rdquo; on your computer, right from
                                                        within your terminal.
                                                    </Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Open up the <strong>Terminal</strong> app.<br />
                                                        <Span opacity="60">This is what is called a CLI—a command line
                                                            interface—no buttons
                                                            or menus, just commands that you type and have the computer
                                                            execute.</Span>
                                                    </li>
                                                    <li>
                                                        Copy the below command and paste it into the terminal, and hit
                                                        Enter.
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>
                                                            /bin/bash -c "$(curl -fsSL
                                                            https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                                                        </CodeBlock>
                                                    </li>
                                                </ul>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Enter your password if asked, and follow any instructions you
                                                        may see on the screen.
                                                    </li>
                                                    <li>
                                                        Once the installation is complete, you can verify that Homebrew
                                                        is installed by
                                                        typing this command:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>
                                                            brew --version
                                                        </CodeBlock>
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                {/* STEP 2 — INSTALL NODE.JS /////////////////////////////////////////////////////////// */}
                                                <Heading6 weight="700" marginBottom="nano">Step 2 — Install
                                                    Node.js</Heading6>

                                                <Text marginBottom="micro">
                                                    Next, we&rsquo;ll need to install Node.js on your computer. <Span
                                                    opacity="60">Most
                                                    modern web apps are built with Javascript, or JS. You can think of
                                                    Node.js as the box
                                                    within which you can build and run those web apps.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>Visit the <a
                                                        href="https://nodejs.org/en/download/prebuilt-binaries"
                                                        target="_blank"
                                                        rel="noreferrer">NodeJS downloads &#8599;</a> page.<br />
                                                        That link should already point your to appropriate version for
                                                        your machine. If not,
                                                        pick the latest Long Term Support(LTS) version.
                                                    </li>

                                                    <li>
                                                        Verify installation by opening your terminal and running:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>node
                                                            --version</CodeBlock>
                                                    </li>

                                                    <li>
                                                        And then:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>npm
                                                            --version</CodeBlock>
                                                        Both should display a version number.
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                {/* STEP 3 — INSTALL YARN ////////////////////////////////////////////////////////////// */}
                                                <Heading6 weight="700" marginBottom="nano">
                                                    Step 3 — Install yarn
                                                </Heading6>

                                                <Text marginBottom="micro">
                                                    Now, we need to install <code>yarn</code>. <Span opacity="60">This
                                                    is also a package
                                                    manager, but we&rsquo;ll just for your project dependencies, not for
                                                    your entire
                                                    system.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Open your terminal and run:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>brew install
                                                            yarn</CodeBlock>
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                {/* STEP 4 — INSTALL NODE.JS /////////////////////////////////////////////////////////// */}
                                                <Heading6 weight="700" marginBottom="nano">
                                                    Step 4 — Download starter project
                                                </Heading6>

                                                <Text marginBottom="micro">
                                                    Almost there. We&rsquo;ll need a boilerplate setup. <Span
                                                    opacity="60">A boilerplate is
                                                    a starting point for a new project, like a template with everything
                                                    you need to
                                                    begin coding.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>Visit the <a href="https://github.com/fictoan/next-boilerplate"
                                                                     target="_blank"
                                                                     rel="noreferrer">Fictoan
                                                        boilerplate &#8599;</a> page on Github.
                                                    </li>

                                                    <li>
                                                        Click the green <code>Code</code> dropdown, and click on <code>Download
                                                        ZIP</code> link. Extract this file to your computer.
                                                    </li>

                                                    <li>
                                                        In your terminal, navigate to the directory you extracted the
                                                        file to, and run:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton marginBottom="nano">
                                                            yarn install
                                                        </CodeBlock>
                                                        This will install all the dependencies the project needs to run.
                                                    </li>

                                                    <li>
                                                        Once the installation is complete, then run:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton marginBottom="nano">yarn
                                                            dev</CodeBlock>
                                                        This should open a new tab in your default browser, go
                                                        to <code>http://localhost:3000</code> and display the home page
                                                        of the boilerplate.
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                {/* STEP 3 — INSTALL IDE /////////////////////////////////////////////////////////////// */}
                                                <Heading6 weight="700" marginBottom="nano">Step 5 — Install
                                                    VSCode</Heading6>

                                                <Text marginBottom="micro">
                                                    Last step, we&rsquo;ll need an IDE. <Span opacity="60">An IDE, or
                                                    Integrated Development
                                                    Environment, is a program that allows you to write, compile, and
                                                    debug code.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>Visit the <a href="https://code.visualstudio.com/"
                                                                     target="_blank" rel="noreferrer">
                                                        VSCode &#8599;</a> website. Download and install the latest
                                                        version.
                                                    </li>

                                                    <li>
                                                        Once installed, go to File &rarr; Open Folder, and select the
                                                        folder you extracted
                                                        the boilerplate file to. You should now see the code files
                                                        listed on the left side
                                                        of
                                                        the IDE window.
                                                    </li>

                                                    <li>
                                                        That&rsquo;s it— you&rsquo;re ready to start your coding
                                                        journey!
                                                    </li>
                                                </ul>

                                                <Heading6 weight="400" marginTop="tiny">
                                                    Good luck and build great things! 🥳
                                                </Heading6>
                                            </>
                                        ),
                                    },
                                    {
                                        key     : "windows-docs",
                                        label   : (
                                            <Element verticallyCentreItems>
                                                <WindowsIcon />
                                                <Text marginLeft="nano">Windows</Text>
                                            </Element>
                                        ),
                                        content : (
                                            <>
                                                <Text marginTop="small" marginBottom="micro">
                                                    This might <em>seem</em> scary—but it really is not! You got this!
                                                    😊
                                                </Text>

                                                <Heading6 marginBottom="nano">Step 1 — Install Node.js</Heading6>

                                                <Text marginBottom="micro">
                                                    First, we’ll need to install Node.js on your computer. <Span
                                                    opacity="60">Most modern web apps are built with Javascript, or JS.
                                                    You can think of Node.js as the box within which you can build and
                                                    run those web apps.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Visit the <a href="https://nodejs.org/en/download"
                                                                     target="_blank" rel="noreferrer">NodeJS
                                                        downloads &#8599;</a> page.<br />
                                                        Download the Windows Installer (.msi) file. Make sure to select
                                                        the LTS (Long Term Support) version.
                                                    </li>
                                                    <li>
                                                        Run the installer you downloaded and follow the installation
                                                        wizard’s instructions.
                                                    </li>
                                                    <li>
                                                        Verify installation by opening Command Prompt (cmd) and running:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>node
                                                            --version</CodeBlock>
                                                    </li>
                                                    <li>
                                                        And then:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>npm
                                                            --version</CodeBlock>
                                                        Both should display a version number.
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                <Heading6 weight="700" marginBottom="nano">Step 2 — Install
                                                    yarn</Heading6>

                                                <Text marginBottom="micro">
                                                    Now, we need to install <code>yarn</code>. <Span opacity="60">This
                                                    is a package manager that we&rsquo;ll use for your project
                                                    dependencies.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Open PowerShell as Administrator and run:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>
                                                            npm install -g yarn
                                                        </CodeBlock>
                                                    </li>
                                                    <li>
                                                        Close and reopen PowerShell, then verify the installation by
                                                        running:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>yarn
                                                            --version</CodeBlock>
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                <Heading6 weight="700" marginBottom="nano">Step 3 — Download starter
                                                    project</Heading6>

                                                <Text marginBottom="micro">
                                                    Almost there. We’ll need a boilerplate setup. <Span opacity="60">A
                                                    boilerplate is a starting point for a new project, like a template
                                                    with everything you need to begin coding.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Visit the <a href="https://github.com/fictoan/next-boilerplate"
                                                                     target="_blank" rel="noreferrer">Fictoan
                                                        boilerplate &#8599;</a> page on Github.
                                                    </li>
                                                    <li>
                                                        Click the green <code>Code</code> dropdown, and click on <code>Download
                                                        ZIP</code> link. Extract this file to your computer.
                                                    </li>
                                                    <li>
                                                        Open PowerShell, navigate to the directory you extracted the
                                                        file to, and run:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton marginBottom="nano">yarn
                                                            install</CodeBlock>
                                                        This will install all the dependencies the project needs to run.
                                                    </li>
                                                    <li>
                                                        Once the installation is complete, then run:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton marginBottom="nano">yarn
                                                            dev</CodeBlock>
                                                        This should open a new tab in your default browser, go
                                                        to <code>http://localhost:3000</code> and display the home page
                                                        of the boilerplate.
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                <Heading6 weight="700" marginBottom="nano">
                                                    Step 4 — Install VSCode
                                                </Heading6>

                                                <Text marginBottom="micro">
                                                    Last step, we’ll need an IDE. <Span opacity="60">An IDE, or
                                                    Integrated Development Environment, is a program that allows you to
                                                    write, compile, and debug code.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Visit the <a href="https://code.visualstudio.com/"
                                                                     target="_blank"
                                                                     rel="noreferrer">VSCode &#8599;</a> website.
                                                        Download and install the latest version for Windows.
                                                    </li>
                                                    <li>
                                                        Once installed, go to File → Open Folder, and select the folder
                                                        you extracted the boilerplate file to. You should now see the
                                                        code files listed on the left side of the IDE window.
                                                    </li>
                                                    <li>
                                                        That's it— you're ready to start your coding journey!
                                                    </li>
                                                </ul>

                                                <Heading6 weight="400" marginTop="tiny">
                                                    Good luck and build great things! 🥳
                                                </Heading6>
                                            </>
                                        ),
                                    },
                                    {
                                        key     : "linux-docs",
                                        label   : (
                                            <Element verticallyCentreItems>
                                                <LinuxIcon />
                                                <Text marginLeft="nano">Linux</Text>
                                            </Element>
                                        ),
                                        content : (
                                            <>
                                                <Text marginTop="small" marginBottom="micro">
                                                    This might <em>seem</em> scary—but it really is not! Plus, if you’re using Linux—you obviously got this!
                                                    😊
                                                </Text>

                                                <Heading6 marginBottom="nano">Step 1 — Install Node.js</Heading6>

                                                <Text marginBottom="micro">
                                                    First, we’ll need to install Node.js on your computer. <Span
                                                    opacity="60">Most modern web apps are built with Javascript, or JS.
                                                    You can think of Node.js as the box within which you can build and
                                                    run those web apps.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Open your terminal and run these commands:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>
                                                            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E
                                                            bash -
                                                            sudo apt-get install -y nodejs
                                                        </CodeBlock>
                                                    </li>
                                                    <li>
                                                        Verify installation by running:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>node
                                                            --version</CodeBlock>
                                                    </li>
                                                    <li>
                                                        And then:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>npm
                                                            --version</CodeBlock>
                                                        Both should display a version number.
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                <Heading6 weight="700" marginBottom="nano">Step 2 — Install
                                                    yarn</Heading6>

                                                <Text marginBottom="micro">
                                                    Now, we need to install <code>yarn</code>. <Span opacity="60">This
                                                    is a package manager that we&rsquo;ll use for your project
                                                    dependencies.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Run this command:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>
                                                            npm install -g yarn
                                                        </CodeBlock>
                                                    </li>
                                                    <li>
                                                        Close and reopen your terminal, then verify the installation:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>yarn
                                                            --version</CodeBlock>
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                <Heading6 weight="700" marginBottom="nano">Step 3 — Download starter
                                                    project</Heading6>

                                                <Text marginBottom="micro">
                                                    Almost there. We’ll need a boilerplate setup. <Span opacity="60">A
                                                    boilerplate is a starting point for a new project, like a template
                                                    with everything you need to begin coding.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        Visit the <a href="https://github.com/fictoan/next-boilerplate"
                                                                     target="_blank" rel="noreferrer">Fictoan
                                                        boilerplate &#8599;</a> page on Github.
                                                    </li>
                                                    <li>
                                                        Click the green <code>Code</code> dropdown, and click on <code>Download
                                                        ZIP</code> link. Extract this file to your computer.
                                                    </li>
                                                    <li>
                                                        In your terminal, navigate to the directory you extracted the
                                                        file to, and run:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton marginBottom="nano">
                                                            yarn install
                                                        </CodeBlock>
                                                        This will install all the dependencies the project needs to run.
                                                    </li>
                                                    <li>
                                                        Once the installation is complete, then run:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton marginBottom="nano">yarn
                                                            dev</CodeBlock>
                                                        This should open a new tab in your default browser, go
                                                        to <code>http://localhost:3000</code> and display the home page
                                                        of the boilerplate.
                                                    </li>
                                                </ul>

                                                <Divider kind="secondary" verticalMargin="tiny" />

                                                <Heading6 weight="700" marginBottom="nano">Step 4 — Install
                                                    VSCode</Heading6>

                                                <Text marginBottom="micro">
                                                    Last step, we’ll need an IDE. <Span opacity="60">An IDE, or
                                                    Integrated Development Environment, is a program that allows you to
                                                    write, compile, and debug code.</Span>
                                                </Text>

                                                <ul className="tutorial-steps">
                                                    <li>
                                                        For Ubuntu/Debian-based systems:
                                                        <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>
                                                            sudo apt-get install code
                                                        </CodeBlock>
                                                        For other distributions, visit the <a
                                                        href="https://code.visualstudio.com/" target="_blank"
                                                        rel="noreferrer">VSCode &#8599;</a> website.
                                                    </li>
                                                    <li>
                                                        Once installed, go to File → Open Folder, and select the folder
                                                        you extracted the boilerplate file to. You should now see the
                                                        code files listed on the left side of the IDE window.
                                                    </li>
                                                    <li>
                                                        That's it— you're ready to start your coding journey!
                                                    </li>
                                                </ul>

                                                <Heading6 weight="400" marginTop="tiny">Good luck and build great
                                                    things! 🥳</Heading6>
                                            </>
                                        ),
                                    },
                                ]}
                            />
                        </Accordion>
                    </Portion>
                </Row>

                <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />
            </Section>

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* EXPERIENCED DEVS */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Section id="first-steps">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Accordion
                            isFullWidth
                            summary={<Heading5>Done this before? Jump right in.</Heading5>}
                        >
                            <Heading6 marginTop="small" marginBottom="nano">Installation</Heading6>

                            <Text marginBottom="micro">
                                If you’re starting a new project from scratch, consider using the{" "}
                                <a
                                    href="https://github.com/fictoan/next-boilerplate"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Fictoan boilerplate &#8599;
                                </a>
                                . It’s a simple, bare-bones NextJS app with Fictoan already installed, and a few basics
                                already setup.
                            </Text>

                            <Text marginBottom="micro">
                                Or, you can install it in your existing project—
                            </Text>

                            <Tabs
                                tabs={[
                                    {
                                        key     : "tab1",
                                        label   : (
                                            <Element verticallyCentreItems>
                                                <PNPMIcon />
                                                <Text marginLeft="nano">pnpm</Text>
                                            </Element>
                                        ),
                                        content : (
                                            <CodeBlock withSyntaxHighlighting language="bash" showCopyButton>
                                                pnpm add fictoan-react
                                            </CodeBlock>
                                        ),
                                    },
                                    {
                                        key     : "tab2",
                                        label   : (
                                            <Element verticallyCentreItems>
                                                <YarnIcon />
                                                <Text marginLeft="nano">yarn</Text>
                                            </Element>
                                        ),
                                        content : (
                                            <CodeBlock withSyntaxHighlighting language="bash">yarn add fictoan-react</CodeBlock>
                                        ),
                                    },
                                    {
                                        key     : "tab3",
                                        label   : (
                                            <Element verticallyCentreItems>
                                                <NPMIcon />
                                                <Text marginLeft="nano">npm</Text>
                                            </Element>
                                        ),
                                        content : (
                                            <CodeBlock withSyntaxHighlighting language="bash">npm install fictoan-react</CodeBlock>
                                        ),
                                    },
                                ]}
                                marginBottom="micro"
                            />
                        </Accordion>
                    </Portion>
                </Row>

                <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading6 marginBottom="nano">Boilerplate structure</Heading6>

                        <Text marginBottom="micro">
                            The{" "}
                            <a
                                href="https://github.com/fictoan/react-boilerplate"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Fictoan boilerplate &#8599;
                            </a>{" "}
                            is a NextJS project and uses the latest{" "}
                            <a
                                href="https://nextjs.org/docs/app"
                                target="_blank"
                                rel="noreferrer"
                            >
                                App router &#8599;
                            </a>{" "}
                            setup. The folder structure looks like this—
                        </Text>

                        <CodeBlock
                            id="boilerplate-structure"
                            source={snippetStructure}
                            language="html"
                            marginBottom="micro"
                        />

                        <Text marginBottom="micro">
                            There are four main
                            folders—<code>app</code>,{" "}<code>components</code>, <code>styles</code>,
                            and{" "}<code>assets</code>.
                        </Text>

                        {/* /app =========================================== */}
                        <Text weight="700" marginBottom="nano">/app</Text>
                        <Text marginBottom="nano">
                            <code>page.tsx</code> is where you can start adding your content.
                        </Text>

                        <Text marginBottom="micro">
                            <code>layout.tsx</code> is the main entry point for the app. We have
                            a <code>RootClientSideLayout</code>{" "}component which contains
                            the{" "}<code>ThemeProvider</code> and
                        </Text>

                        <Text marginBottom="micro">
                            Why such a roundabout setup, you ask? Click&nbsp;
                            <Span textColour="blue" onClick={() => setIsComplexSetupDrawerOpen(true)}>here</Span>
                            &nbsp;for a rant.
                        </Text>

                        {/* DRAWER */}
                        <Drawer
                            position="right" size="medium"
                            showOverlay closeOnClickOutside
                            openWhen={isComplexSetupDrawerOpen}
                            closeWhen={() => setIsComplexSetupDrawerOpen(false)}
                            padding="micro"
                        >
                            <Heading4>NextJS sucks</Heading4>
                        </Drawer>

                        <Divider kind="tertiary" verticalMargin="nano" />

                        {/* /app/About =========================================== */}
                        <Text weight="700" marginBottom="nano">/app/about</Text>

                        <Text marginBottom="nano">
                            This is a sample sub-page that you can use as a reference for creating your own pages.
                            Routing is based on the folder structure, so this one is available at <code>/about</code>.
                        </Text>

                        <CodeBlock
                            withSyntaxHighlighting
                            id="boilerplate-structure"
                            language="jsx"
                            source={snippetPageSetupJSX}
                            marginBottom="micro"
                        />

                        <CodeBlock
                            withSyntaxHighlighting
                            id="boilerplate-structure"
                            source={snippetPageSetupCSS}
                            language="css"
                            marginBottom="micro"
                        />

                        <Text marginBottom="micro">
                            We’re using a simple method to scope the CSS to the page—the <code>id</code> of the page is
                            used as the parent-most selector, and the CSS is written inside it. This way, the CSS is
                            scoped to the page, and doesn’t leak to other pages.
                        </Text>

                        <Text>
                            The components also follow a similar structure.
                        </Text>
                    </Portion>
                </Row>
            </Section>

            <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* USAGE */}
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Element as="section" id="patterns">
                <Row horizontalPadding="huge">
                    <Portion>
                        <Heading4>Using components</Heading4>
                    </Portion>
                </Row>

                {/* IMPORT ========================================================================================= */}
                <Row
                    id="nomenclature"
                    layout="grid"
                    horizontalPadding="huge"
                    marginBottom="nano"
                >
                    <Portion>
                        <Heading6 marginBottom="nano">Importing</Heading6>

                        <Text marginBottom="micro">
                            Import the main CSS file in your app entry point. This will make sure that the Fictoan
                            styles are available to all components.
                        </Text>

                        <CodeBlock
                            withSyntaxHighlighting
                            showCopyButton
                            source={snippetInstallation}
                            language="jsx"
                            marginBottom="micro"
                        />

                        <Text marginBottom="micro">
                            In your content files, just import the components you need at the top, and use them inside
                            the return function like so—
                        </Text>

                        <CodeBlock
                            withSyntaxHighlighting
                            showCopyButton
                            source={snippetUsage}
                            language="jsx"
                            marginBottom="micro"
                        />

                        <Text marginBottom="micro">
                            Now you’re ready to use Fictoan components in your project.
                        </Text>
                    </Portion>

                    <Portion>
                        <Heading6 marginBottom="nano">Usage</Heading6>

                        <Text marginBottom="micro">
                            Fictoan components are just simple wrappers around HTML elements. You can extend their look
                            and feel by passing props to them.
                        </Text>

                        <Text marginBottom="micro">For example, a <code>Card</code> component has props such
                            as <code>shape</code>, <code>shadow</code> and{" "}<code>padding</code>. Similarly,
                            a{" "}<code>Table</code> has <code>bordersFor</code>,{" "}<code>isStriped</code> and so on.
                            You don’t have to remember complex terminology, and Fictoan tries to be as intuitive as
                            possible.
                        </Text>

                        <Text marginBottom="micro">
                            Here’s an interactive example. Here we have a default <code>Card</code> component. It looks
                            like just a line because all you’re seeing is the border. Start by adding some padding to
                            it.
                        </Text>
                    </Portion>
                </Row>

                <InteractiveCardExample />

                <Row horizontalPadding="huge">
                    <Portion>
                        <Text marginBottom="micro">
                            It’s that easy. The markup is clean, easy to
                            understand, and no complex nomenclature or cryptic
                            notation to remember.
                        </Text>

                        <Text>
                            The global default values for the background colour,
                            border colour and width, and the border-radius value
                            are set via the theme file. You can change them by
                            creating your own theme file and over-riding the
                            values.{" "}
                            <Link href="/theme">
                                Read more about theming here
                            </Link>
                            .
                        </Text>
                    </Portion>
                </Row>

                <Divider kind="primary" horizontalMargin="huge" verticalMargin="small" />

                {/* ATTRIBUTE VALUES /////////////////////////////////////////////////////////////////////////////// */}
                <Row id="attributes" horizontalPadding="huge">
                    <Portion>
                        <Text
                            weight="700"
                            size="large"
                            marginBotto
                            textColour="white"
                            m="nano"
                        >
                            Attribute values
                        </Text>

                        <Text marginBottom="micro">
                            Keeping in line with the reduced terminology to
                            remember, most elements and components have the same
                            list of values for their props.
                        </Text>

                        <Text marginBottom="micro">
                            Since a vast majority of UI design revolves around
                            relationships and position between elements, it
                            makes sense to have a finite list of default values
                            to manage these aspects.
                        </Text>

                        <Text marginBottom="micro">
                            The list of props on the left all take values from
                            the right. Some props of certain elements don’t
                            accept <code>nano</code> and <code>micro</code>, as
                            their values would be too small to discern on the
                            screen.
                        </Text>
                    </Portion>

                    <Portion>
                        <Row marginBottom="none" retainLayoutAlways>
                            <Portion desktopSpan="half">
                                <Text
                                    weight="700"
                                    size="large"
                                    marginBottom="none"
                                >
                                    Prop
                                </Text>

                                <Divider
                                    kind="tertiary"
                                    verticalMargin="nano"
                                />

                                <Element as="div" marginBottom="micro">
                                    <Text marginBottom="nano">
                                        <code>margin</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>marginTop</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>marginRight</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>marginBottom</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>marginLeft</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>horizontalMargin</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>verticalMargin</code>
                                    </Text>
                                </Element>

                                <Element as="div" marginBottom="micro">
                                    <Text marginBottom="nano">
                                        <code>padding</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>paddingTop</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>paddingRight</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>paddingBottom</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>paddingLeft</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>horizontalPadding</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>verticalPadding</code>
                                    </Text>
                                </Element>

                                <Element as="div" marginBottom="micro">
                                    <Text marginBottom="nano">
                                        <code>size</code>
                                    </Text>
                                    <Text marginBottom="nano">
                                        <code>gutters</code>
                                    </Text>
                                </Element>
                            </Portion>

                            <Portion desktopSpan="half">
                                <Text weight="700" size="large">
                                    Possible value
                                </Text>

                                <Divider
                                    kind="tertiary"
                                    verticalMargin="nano"
                                />

                                <Text marginBottom="nano">
                                    <code>none</code> — 0
                                </Text>
                                <Text marginBottom="nano">
                                    <code>nano</code> — 8px
                                </Text>
                                <Text marginBottom="nano">
                                    <code>micro</code> — 24px
                                </Text>
                                <Text marginBottom="nano">
                                    <code>tiny</code> — 2vmax
                                </Text>
                                <Text marginBottom="nano">
                                    <code>small</code> — 4vmax
                                </Text>
                                <Text marginBottom="nano">
                                    <code>medium</code> — 8vmax
                                </Text>
                                <Text marginBottom="nano">
                                    <code>large</code> — 16vmax
                                </Text>
                                <Text marginBottom="nano">
                                    <code>huge</code> — 24vmax
                                </Text>
                            </Portion>
                        </Row>
                    </Portion>

                    <Portion>
                        <Text marginBottom="micro">
                            Each of these values can be again changed in the
                            theme file.
                        </Text>

                        <Divider kind="secondary" verticalMargin="micro" />

                        <Text
                            weight="700"
                            size="large"
                            marginBotto
                            textColour="white"
                            m="nano"
                        >
                            Contextual values
                        </Text>

                        <Text marginBottom="micro">
                            Another thing to keep in mind is that they are also
                            contextual. For example,{" "}
                            <code>padding="small"</code> might mean different
                            things to a <code>Card</code> component and a{" "}
                            <code>Table</code> component. While this seems
                            counter-intuitive, it takes into account the
                            possible real-world use cases. It is unlikely you’d
                            need a <code>Table</code> cell with <code>4vh</code>{" "}
                            of padding, right?
                        </Text>
                    </Portion>
                </Row>
            </Element>
        </Article>
    );
};

export default GettingStarted;
