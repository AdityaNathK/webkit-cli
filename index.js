#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createContents from "./createContent.js";

// Get the current working directory and the directory of the current module
const currentWorkingDirectory = process.cwd();
const currentModuleDirectory = dirname(fileURLToPath(import.meta.url));

// Get the choices (template directories) from the templates folder
const templateChoices = fs.readdirSync(`${currentModuleDirectory}/templates`);

// Define the available template choices with descriptions
const templateChoicesAlt = [
    {
        name: "Blank Template - Empty html,css,js files",
        value: templateChoices[1],
    },
    {
        name: "Contentful Template - Contentful html,css,js files",
        value: templateChoices[2],
    },
];
// Define the prompts which are displayed in terminal, for the user
const prompts = [
    {
        name: "templateType",
        type: "list",
        message: "Select a front-end development template:",
        choices: templateChoicesAlt,
        default: templateChoices[1],
        prefix: "Step 1: ",
    },
    {
        name: "projectName",
        type: "input",
        message: "Enter project folder name (press enter to use default):",
        default: "MyAwesomeProject",
        prefix: "Step 2: ",
    },
];

// Prompt the user with the questions and process the answers
inquirer.prompt(prompts).then((answers) => {
    const { templateType, projectName } = answers;

    // Calculate the path of the selected template
    const selectedTemplatePath = `${currentModuleDirectory}/templates/${templateType}`;

    // Create the project directory
    fs.mkdirSync(`${currentWorkingDirectory}/${projectName}`);

    // Call the createContents function to copy template files to the project directory
    createContents(selectedTemplatePath, projectName);
});
