#! /usr/bin/env node
const simpleGit = require('simple-git');
const git = simpleGit();
const packageJson = require('./package.json');
const fs = require('fs');
const commander = require('commander');
const program = new commander.Command();

program
    .command('major')
    .action(() => {
        test('major');
    });
program
    .command('minor')
    .action(() => {
        test('minor');
    });
program
    .command('patch')
    .action(() => {
        test('patch');
    });

program.parse(process.argv);

async function test(versionType) {
    try {
        const versionNumbers = packageJson.version.split('.');
        let major = versionNumbers[0];
        let minor = versionNumbers[1];
        let patch = versionNumbers[2];
        if (versionType === "major") {
            major = Number(major) + 1;
        }
        else if (versionType === "minor") {
            minor = Number(minor) + 1;
        }
        else if (versionType === "patch") {
            patch = Number(patch) + 1;
        }
        const newVersionNumber = `${major}.${minor}.${patch}`;
        packageJson.version = newVersionNumber;
        fs.writeFile('./package.json', JSON.stringify(packageJson, null, 4), () => { });
        await git.add('*').commit("test").push().addTag(packageJson.version);
        //const diffSummary = await git.diff();

    }
    catch (e) {
        console.log(e);
    }
}