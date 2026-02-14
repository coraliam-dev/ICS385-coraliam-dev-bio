
/*
	Author: Coralia Montalvo
	Date: February 6, 2026
	Overview: Simple QR Code Generator (index.js)
	This script prompts the user for a URL, generates a QR code image, and saves the URL to a text file.
	Key Highlights:
		- Uses inquirer for user input
		- Uses qr-image to generate QR code
		- Saves QR code as qr_img.png
		- Saves URL as URL.txt
		- AI-generated code is labeled (GitHub Copilot, GPT-4.1)
	Note: All code sections marked 'AI-generated' were created with GitHub Copilot and ChatGPT (GPT-4.1).
*/

// AI-generated: Import required packages
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// AI-generated: Prompt user for URL
inquirer
	.prompt([
		{
			message: "Enter a URL to generate a QR code (e.g., https://youtube.com):",
			name: "URL",
			validate: (input) => {
				if (!input || input.trim() === "") {
					return "Input cannot be empty.";
				}
				// Simple URL validation
				const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
				if (!urlPattern.test(input.trim())) {
					return "Please enter a valid URL (e.g., https://youtube.com).";
				}
				return true;
			},
		},
	])
	.then((answers) => {
		const url = answers.URL.trim();
		// AI-generated: Create a safe, unique filename from the URL
		const safeFileName = url
			.replace(/https?:\/\//, "") // Remove protocol
			.replace(/[^a-zA-Z0-9-_]/g, "_") // Replace unsafe chars
			.slice(0, 30); // Limit length
		const imgFile = `qr_${safeFileName}.png`;
		const txtFile = `URL_${safeFileName}.txt`;

		// AI-generated: Generate QR code image
		const qr_svg = qr.image(url);
		qr_svg.pipe(fs.createWriteStream(imgFile));

		// AI-generated: Save URL to text file
		fs.writeFile(txtFile, url, (err) => {
			if (err) {
				console.error(`Error saving ${txtFile}:`, err);
				return;
			}
			console.log(`\nSuccess! Your QR code was saved as: ${imgFile}`);
			console.log(`The URL was saved as: ${txtFile}`);
			console.log("You can now open the image to view your QR code.");
		});
	})
	.catch((error) => {
		if (error.isTtyError) {
			console.error("Prompt couldn't be rendered in the current environment.");
		} else {
			console.error("An unexpected error occurred:", error);
		}
	});
// AI-generated: Prompt user for QR code type (URL or plain text)
inquirer
	.prompt([
		{
			type: "list",
			name: "type",
			message: "What do you want to encode as a QR code?",
			choices: ["URL", "Plain Text"],
		},
		{
			message: "Enter the URL to encode (e.g., https://www.example.com):",
			name: "URL",
			when: (answers) => answers.type === "URL",
			validate: (input) => {
				if (!input || input.trim() === "") {
					return "Input cannot be empty.";
				}
				// Simple URL validation
				const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
				if (!urlPattern.test(input.trim())) {
					return "Please enter a valid URL (e.g., https://www.example.com).";
				}
				return true;
			},
		},
		{
			message: "Enter the plain text to encode:",
			name: "text",
			when: (answers) => answers.type === "Plain Text",
			validate: (input) => {
				if (!input || input.trim() === "") {
					return "Input cannot be empty.";
				}
				return true;
			},
		},
	])
	.then((answers) => {
		let data, safeFileName, imgFile, txtFile;
		if (answers.type === "URL") {
			data = answers.URL.trim();
			// AI-generated: Create a safe, unique filename from the URL
			safeFileName = data
				.replace(/https?:\/\//, "") // Remove protocol
				.replace(/[^a-zA-Z0-9-_]/g, "_") // Replace unsafe chars
				.slice(0, 30); // Limit length
			imgFile = `qr_url_${safeFileName}.png`;
			txtFile = `URL_${safeFileName}.txt`;
		} else {
			data = answers.text.trim();
			// AI-generated: Create a safe, unique filename from the text
			safeFileName = data.replace(/[^a-zA-Z0-9-_]/g, "_").slice(0, 30);
			imgFile = `qr_text_${safeFileName}.png`;
			txtFile = `Text_${safeFileName}.txt`;
		}

		// AI-generated: Generate QR code image
		const qr_svg = qr.image(data);
		qr_svg.pipe(fs.createWriteStream(imgFile));

		// AI-generated: Save data to text file
		fs.writeFile(txtFile, data, (err) => {
			if (err) {
				console.error(`Error saving ${txtFile}:`, err);
				return;
			}
			console.log(`\nSuccess! Your QR code was saved as: ${imgFile}`);
			console.log(`The data was saved as: ${txtFile}`);
			console.log("You can now open the image to view your QR code.");
		});
	})
	.catch((error) => {
		if (error.isTtyError) {
			console.error("Prompt couldn't be rendered in the current environment.");
		} else {
			console.error("An unexpected error occurred:", error);
		}
	});
