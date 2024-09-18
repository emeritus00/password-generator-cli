#!/usr/bin/env node

const crypto = require("crypto");

// Default options
const DEFAULT_LENGTH = 8;
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";

// Function to generate password
function generatePassword(length = DEFAULT_LENGTH) {
  let chars = LOWERCASE_CHARS;

  // Generate random password
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(crypto.randomInt(0, chars.length));
  }

  return password;
}

// Parse command-line arguments
const args = process.argv.slice(2);
const helpFlag = args.includes("--help");
const lengthFlagIndex = args.indexOf("--length");

// Display help message
if (helpFlag) {
  console.log(`
    Usage: password-generator [options]
    Options:
      --help       Show help message
      --length     Specify password length (default: 8)
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
const password = generatePassword(length);
console.log(`Generated password: ${password}`);
