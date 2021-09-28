const simpleGit = require('simple-git');
const git = simpleGit();
const packageJson = require('./package.json');
const fs = require('fs');

async function test() {
    try {
        await git.add('*').commit("test").push().addTag("tag1");
        //const diffSummary = await git.diff();
        
        // packageJson.version ="0.0.3";
        // fs.writeFile('./package.json', JSON.stringify(packageJson, null, 4), ()=>{});
    }
    catch (e) {
        console.log(e);
    }
}

test();