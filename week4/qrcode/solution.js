/*
  Author: Coralia Montalvo
  Date: February 6, 2026
  Overview: QR Code Generator CLI
  This script prompts the user for a URL, generates a QR code PNG, and saves the URL to a text file.
  Key Highlights:
    - Uses inquirer for user input
    - Uses qr-image to generate QR code
    - Saves QR code as qr_img.png
    - Saves URL as URL.txt
    - User-friendly prompts and error handling
    - AI-generated comments and improvements marked below (GitHub Copilot, GPT-4.1)
*/

// AI-generated: Imports for required packages
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// AI-generated: Prompt user for URL with better instructions and validation
inquirer
  .prompt([
    {
      message: "Enter a URL to generate a QR code (e.g., https://www.example.com):",
      name: "URL",
      validate: (input) => {
        // AI-generated: Input validation for non-empty and valid URL format
        if (!input || input.trim() === "") {
          return "Input cannot be empty.";
        }
        // Simple URL validation regex
        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
        if (!urlPattern.test(input.trim())) {
          return "Please enter a valid URL (e.g., https://www.example.com).";
        }
        return true;
      },
    },
  ])
  .then((answers) => {
    // AI-generated: Extract and sanitize URL from user input
    const url = answers.URL.trim();

    // AI-generated: Generate a safe filename from the URL
    const safeFileName = url
      .replace(/https?:\/\//, "") // Remove protocol
      .replace(/[^a-zA-Z0-9-_]/g, "_") // Replace unsafe chars
      .slice(0, 30); // Limit length
    const imgFile = `qr_${safeFileName}.png`;
    const txtFile = `URL_${safeFileName}.txt`;

    // AI-generated: Generate QR code PNG from URL
    const qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream(imgFile));

    // AI-generated: Save URL to text file
    fs.writeFile(txtFile, url, (err) => {
      if (err) {
        console.error("Error saving", txtFile, ":", err);
        return;
      }
      // AI-generated: Improved output UX
      console.log(`\nSuccess! Your QR code was saved as: ${imgFile}`);
      console.log(`The URL was saved as: ${txtFile}`);
      console.log("You can now open the image to view your QR code.");
    });
  })
  .catch((error) => {
    // AI-generated: Handle errors from inquirer
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      console.error("An unexpected error occurred:", error);
    }
  });
/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
