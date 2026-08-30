import fs from 'fs';

// Async readFile
fs.readFile('../text.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// readFileSync
const data = fs.readFileSync('../text.txt', 'utf8');
console.log(data);

///////////////////////////////////////////////////////

import fs from 'fs/promises';

// readFile (promise & then)
fs.readFile('../text.txt', 'utf8')
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

// readFile async/await
const readFile = async () => {
    try {
        const data = await fs.readFile('../text.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

readFile();

// Write file asyn/await
const writeFile = async () => {
    try {
        await fs.writeFile('../text.txt', 'Hello, I\'m Ahmed');
        console.log('Typing...');
    } catch (error) {
        console.log(error);
    }
}

writeFile();

// Append
const appendFile = async () => {
    try {
        await fs.appendFile('../text.txt', '\nHello, I\'m Ahmed (Again)');
        console.log('Typing...');
    } catch (error) {
        console.log(error);
    }
}

appendFile();