console.log(process.argv[1]);

console.log(process.env);

// Process ID
console.log(process.pid);

// Current working directory
console.log(process.cwd());

// Process Title
console.log(process.title);

// memory usage
console.log(process.memoryUsage());

// uptime
console.log(process.uptime());

// process exit event
process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});

// exit
process.exit(0);