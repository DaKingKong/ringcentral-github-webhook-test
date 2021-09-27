const simpleGit = require('simple-git');
const git = simpleGit();

async function test() {
    try {
        await git
            .add('./*')
            .commit("test");
    }
    catch (e) {
        console.log(e);
    }
}

test();