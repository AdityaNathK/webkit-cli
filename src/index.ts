#!/usr/bin/env node

import inquirer, { QuestionCollection } from "inquirer";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createContents from "./createContents.js";

// Get the current working directory and the directory of the current module
const currentWorkingDirectory: string = process.cwd();
const currentModuleDirectory: string = dirname(fileURLToPath(import.meta.url));
// Get the choices (template directories) from the templates folder
const templateChoices: string[] = fs
    .readdirSync(`${currentModuleDirectory}/templates`)
    .filter((item: string) => !item.startsWith("."));

// Define the available template choices with descriptions
const templateChoicesAlt = [
    {
        name: "Blank Template - Empty html,css,js files",
        value: templateChoices[0],
    },
    {
        name: "Contentful Template - Contentful html,css,js files",
        value: templateChoices[1],
    },
];
// Define the prompts which are displayed in terminal, for the user
const prompts: QuestionCollection = [
    {
        name: "templateType",
        type: "list",
        message: "Select a front-end development template:",
        choices: templateChoicesAlt,
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
    const { templateType, projectName } = answers as { templateType: string; projectName: string };

    if (!templateType) {
        console.error(
            "Invalid template type. Please make sure to select a valid template."
        );
        return;
    }

    // Calculate the path of the selected template
    const selectedTemplatePath: string = `${currentModuleDirectory}/templates/${templateType}`;

    try {
        // Create the project directory
        fs.mkdirSync(`${currentWorkingDirectory}/${projectName}`);
    } catch (error: unknown) {
        if ((error as NodeJS.ErrnoException).code === "EEXIST") {
            console.error(
                `The directory '${projectName}' already exists. Please choose a different project folder name.`
            );
            return;
        }
        // Handle other potential errors
        console.error(
            "An error occurred while creating the project directory:",
            error
        );
        return;
    }

    // Call the createContents function to copy template files to the project directory
    createContents(selectedTemplatePath, projectName);

    console.log(`Template generated successfully in directory: ${projectName}`);
});
