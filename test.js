#! /usr/bin/env node
const simpleGit = require('simple-git');
const git = simpleGit();
const filePath = './package.json';
const packageJson = require(filePath);
const fs = require('fs');
const commander = require('commander');
const program = new commander.Command();
const inquirer = require('inquirer');

program
    .command('publish')
    .description('create a new release')
    .action(() => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'releaseType',
                    message: 'Choose a release type:',
                    choices: [
                        'major',
                        'minor',
                        'patch'
                    ],
                },
                {
                    type: 'input',
                    name: 'commit',
                    message: 'Enter commit description:',
                    default: ''
                },
            ])
            .then((answers) => {
                test(answers);
            })
    });

program.parse(process.argv);

async function test(answers) {
    try {
        const versionNumbers = packageJson.version.split('.');
        let major = versionNumbers[0];
        let minor = versionNumbers[1];
        let patch = versionNumbers[2];
        if (answers.releaseType === "major") {
            major = Number(major) + 1;
        }
        else if (answers.releaseType === "minor") {
            minor = Number(minor) + 1;
        }
        else if (answers.releaseType === "patch") {
            patch = Number(patch) + 1;
        }
        const newVersionNumber = `${major}.${minor}.${patch}`;
        packageJson.version = newVersionNumber;
        fs.writeFile(filePath, JSON.stringify(packageJson, null, 4), (err) => { if (err) { console.log(err); } });
        await git.add('*').commit(answers.commit).push().addTag(packageJson.version);

    }
    catch (e) {
        console.log(e);
    }
}