import path from 'path';
import url from 'url';

const filePath = './dir1/dir2/file.txt';

console.log('Base File: ', path.basename(filePath));
console.log('Directory Name: ', path.dirname(filePath));
console.log('File extension: ', path.extname(filePath));
console.log('Parsed object with all path properties: ', path.parse(filePath));

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath2 = path.join(__dirname, 'dir1', 'dir2', 'file.txt');