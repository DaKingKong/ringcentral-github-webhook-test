const simpleGit = require('simple-git');
const git = simpleGit();
const packageJson = require('./package.json');
const fs = require('fs');

async function test() {
    try {
        packageJson.version ="0.0.4";
        fs.writeFile('./package.json', JSON.stringify(packageJson, null, 4), ()=>{});
        await git.add('*').commit("test").push().addTag(packageJson.version);
        //const diffSummary = await git.diff();
        
    }
    catch (e) {
        console.log(e);
    }
}

test();