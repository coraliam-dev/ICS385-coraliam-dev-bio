

# qrcode (ICS 385 Week 4 / Assignment 4b)

## Overview
This project generates QR codes from user input (URL or text) using Node.js.

## Setup
```
npm install
```

## How to Run
```
node index.js
```

## New Features Added (Design)
1) Input validation: Rejects empty strings and requires valid URL format for URLs.
2) Better prompts: Clearer terminal questions with examples.
3) File naming: Auto-generates safe filenames (removes spaces/special characters).
4) User options: Choose between URL QR and plain text QR.
5) Output UX: Prints the saved file path and next steps after generating.

## Testing
- Test 1: Entered a valid URL (https://youtube.com)
	Expected: QR code and text file created with safe names, success messages shown.
	Actual: (fill in your result)
- Test 2: Entered invalid/empty input
	Expected: Validation error message, no files created.
	Actual: (fill in your result)
- Test 3: Entered plain text ("Hello ICS 385!")
	Expected: QR code and text file created for the text, success messages shown.
	Actual: (fill in your result)

## AI Attribution
- Tool(s) used: GitHub Copilot, ChatGPT (GPT-4.1)
- Files/sections generated or modified by AI: index.js (main logic, comments, validation, prompts, file naming, user options), ReadMe.md (structure, documentation)
- All code marked 'AI-generated' was created with GitHub Copilot and ChatGPT (GPT-4.1).
- What I personally changed/verified: Ran and tested the code, verified all features work, added/edited comments and test results.

## Reflection (Manager Notes)
- What my manager requested: Understand, document, and improve the starter QR code generator; make it user-friendly and maintainable; clearly label AI-generated code; document process and learning.
- What I learned: How to use Node.js for CLI tools, importance of input validation and user experience, how to document and attribute AI-generated code, and how to design/test improvements.
- Next improvements I would make: Add WiFi QR code support, allow color/logo customization, improve error handling for more edge cases, and add more output formats (SVG, PDF).
