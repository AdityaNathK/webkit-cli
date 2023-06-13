import * as fs from "fs";

// Get the current working directory
const currentWorkingDirectory = process.cwd();

// Function to create the directory contents by copying files and subdirectories
const createContents = (templatePath, newProjectPath) => {
    // Get the files in the template directory
    const filesToCopy = fs.readdirSync(templatePath);

    // Iterate over each file/directory in the template directory
    filesToCopy.forEach((file) => {
        const originalFilePath = `${templatePath}/${file}`;

        // Get stats about the file/directory
        const fileStats = fs.statSync(originalFilePath);

        if (fileStats.isFile()) {
            // If it's a file, read its contents
            const fileContents = fs.readFileSync(originalFilePath, "utf8");

            // Rename specific file
            if (file === ".npmignore") {
                file = ".gitignore";
            }

            // Determine the target file path in the new project directory
            const targetFilePath = `${currentWorkingDirectory}/${newProjectPath}/${file}`;

            // Write the file contents to the target file path
            fs.writeFileSync(targetFilePath, fileContents, "utf8");
        } else if (fileStats.isDirectory()) {
            // If it's a directory, create a new directory in the new project path
            fs.mkdirSync(
                `${currentWorkingDirectory}/${newProjectPath}/${file}`
            );

            // Recursively call createContents to handle files and subdirectories inside the current directory
            createContents(
                `${templatePath}/${file}`,
                `${newProjectPath}/${file}`
            );
        }
    });
};

export default createContents;
