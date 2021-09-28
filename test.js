const simpleGit = require('simple-git');
const git = simpleGit();

async function test() {
    try {
        // await git.add('*').commit("test").push();
        const diffSummary = await git.diff();
        console.log(diffSummary);
    }
    catch (e) {
        console.log(e);
    }
}

test();