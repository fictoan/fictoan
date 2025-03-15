//  Code sample 01 ////////////////////////////////////////////////////////////
export const sampleCodeBlock = `<CodeBlock withSyntaxHighlighting source=\{sampleCode} language="jsx" />`;

//  Code sample 02 ////////////////////////////////////////////////////////////
export const sampleBashCode = `#!/bin/bash
echo "Hello, World!"`;

//  Code sample 03 ////////////////////////////////////////////////////////////
export const sampleCSharpCode = `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}`;

export const sampleHTMLCode = `<!DOCTYPE html>

<html lang="en">
    <head>
        <title>Sample HTML</title>
    </head>

    <body>
        <h1>Hello, World!</h1>
    </body>
</html>`;

//  Code sample 04 ////////////////////////////////////////////////////////////
export const sampleCSSCode = `& code[class*=language-] ::-moz-selection {
    text-shadow : none;
    color       : var(--text-selected);
    background  : var(--text-bg-selected) !important;
}

@media print {
    & pre[class*="language-"],
    & code[class*="language-"] {
        text-shadow : none;
    }
}

#some-id,
.some-class {
    position   : absolute;
    top        : -2px;
    height     : calc(100% + 4px);
    background : var(--meter-optimum-marker-bg);
}`;

//  Code sample 05 ////////////////////////////////////////////////////////////
export const sampleSwiftCode = `import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        print("Hello, World!")
    }
}`;

//  Code sample 06 ////////////////////////////////////////////////////////////
export const sampleRustCode = `fn main() {
    println!("Hello, World!");
}`;

//  Code sample 07 ////////////////////////////////////////////////////////////
export const sampleKotlinCode = `import kotlin.random.Random

fun main() {
    val adjectives = listOf("sparkling", "shimmery", "mysterious", "vibrant")
    val nouns = listOf("forest", "ocean", "galaxy", "dream")

    val randomAdjective = adjectives[Random.nextInt(adjectives.size)]
    val randomNoun = nouns[Random.nextInt(nouns.size)]

    val phrase = "The $randomAdjective $randomNoun"

    println(phrase)
}`;

//  Code sample 08 ////////////////////////////////////////////////////////////
export const samplePythonCode = `num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

result = num1 + num2
print("The sum of", num1, "and", num2, "is", result)

def fibonacci(n):
  a, b = 0, 1
  for _ in range(n):
    yield a
    a, b = b, a + b

for number in fibonacci(10):
  print(number)

filename = "my_text_file.txt"  # Replace with your file's name

with open(filename, 'r') as file:
    contents = file.readlines()

for line in contents:
    print(line.strip())  # Remove any extra whitespace`;


// Code sample 09 ////////////////////////////////////////////////////////////
export const sampleJSXCode = `import React from "react";
import { CodeBlock } from "fictoan-react";
import { sampleCode } from "./sampleCode";
    
const MyComponent = (props) => {
    <CodeBlock
        source={sampleCode}
        language="jsx"
        showCopyButton
        showLineNumbers
    />
}`;

// Code sample 10 ////////////////////////////////////////////////////////////
export const sampleObjectiveCCode = `#import <Foundation/Foundation.h>

// Interface section of the Person class
@interface Person : NSObject {
    NSString *name;
    NSInteger age;
}

@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) NSInteger age;

- (void)displayInfo;

@end

@implementation Person
@synthesize name, age;

- (void)displayInfo {
    NSLog(@"Name: %@, Age: %ld", name, (long)age);
}

@end

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Person *person = [[Person alloc] init];
        person.name = @"John Doe";
        person.age = 30;
        [person displayInfo];
    }
    return 0;
}`;

// Code sample 11 ////////////////////////////////////////////////////////////
export const sampleMarkdownCode = `# Sample Markdown Document

This is a sample document to demonstrate **Markdown syntax**.

## Headings
Headings are created using \`#\` symbols at the start of a line.

### Sub-heading

## Lists

- Bulleted list item 1
- Bulleted list item 2
  - Nested item 1

1. Numbered list item 1
2. Numbered list item 2

## Code Blocks

Inline \`code\` is wrapped with backticks.

\`\`\`python
# Python code block
def hello_world():
    print("Hello, Markdown!")
\`\`\``;
