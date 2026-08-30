import { eventEmitter } from 'events';

const myEmitter = new eventEmitter();
const NAME = 'Ahmed';

function greet(name) {
    console.log(`Hello, ${name}!`);
}

function farewell(name) {
    console.log(`Goodbye, ${name}!`);
}   

myEmitter.on('greet', greet);
myEmitter.on('farewell', farewell);

myEmitter.emit('greet', NAME);
myEmitter.emit('farewell', NAME);

myEmitter.on('error', (err) => {
    console.error(err);
});