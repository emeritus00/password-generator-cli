#!/usr/bin/env node

const crypto = require("crypto");

// Default options
const DEFAULT_LENGTH = 8;
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";

// Function to generate password
function generatePassword(length = DEFAULT_LENGTH) {
  let chars = LOWERCASE_CHARS;

  // Add optional character sets
  if (includeNumbers) chars += "0123456789";
  if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Generate random password
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(crypto.randomInt(0, chars.length));
  }

  return password;
}

// Parse command-line arguments
const args = process.argv.slice(2);
const helpFlag = args.includes("--help") || args.includes("-h");
const lengthFlagIndex = args.indexOf("--length");
const includeNumbers = args.includes("--numbers");
const includeUppercase = args.includes("--uppercase");
const includeSymbols = args.includes("--symbols");

// Display help message
if (helpFlag) {
  console.log(`
    Usage: password-generator [options]
    Options:
      --help       Show help message
      --length     Specify password length (default: 8)
      --numbers    Include numbers in the password
      --uppercase  Include uppercase letters in the password
      --symbols    Include symbols in the password
    `);
  process.exit(0);
}

// Get password length from the flag
let length = DEFAULT_LENGTH;
if (lengthFlagIndex !== -1 && args[lengthFlagIndex + 1]) {
  length = parseInt(args[lengthFlagIndex + 1], 10);
  if (isNaN(length) || length <= 0) {
    console.error("Invalid length specified. Please provide a valid number.");
    process.exit(1);
  }
}

// Generate and display the password
const password = generatePassword(
  length,
  includeNumbers,
  includeUppercase,
  includeSymbols
);
console.log(`Generated password: ${password}`);
