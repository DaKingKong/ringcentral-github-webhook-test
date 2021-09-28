#! /usr/bin/env node
const simpleGit = require('simple-git');
const git = simpleGit();
const packageJson = require('./package.json');
const fs = require('fs');
const commander = require('commander');
const program = new commander.Command();

program
    .command('publishMajor')
    .action(()=>{

    });

async function test(versionType) {
    try {
        const versionNumbers = packageJson.version.split('.');
        let major = versionNumbers[0];
        let minor = versionNumbers[1];
        let patch = versionNumbers[2];
        if(versionType === "major")
        {
            major = Number(major)++;
        }
        else if(versionType === "minor")
        {
            minor = Number(minor)++;
        }
        else if(versionType === "patch")
        {
            patch = Number(patch)++;
        }
        const newVersionNumber = `${major}.${minor}.${patch}`;
        packageJson.version = newVersionNumber;
        fs.writeFile('./package.json', JSON.stringify(packageJson, null, 4), ()=>{});
        await git.add('*').commit("test").push().addTag(packageJson.version);
        //const diffSummary = await git.diff();
        
    }
    catch (e) {
        console.log(e);
    }
}

test();