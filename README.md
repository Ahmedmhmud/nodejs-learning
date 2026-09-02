# NodeJS notes

This repo contains set of files that are explained with comments, they cove topics like

### Import/Export modules ways via commonjs and ES module.
This used for import/export modules (functions, objects, ...) across different files.

- **commonjs**: Default way in NodeJS and it is used by calling `require()` for importing and `module.exports` for exporting
- **ES module**: First we need to change the *type* property in `package.json` to "module" then we call `import` for importing and `export` for exporting.

---
### Creating raw http server without using dedicated framework
We can create a http server by `http.createServer()` that takes `req` and `res` objects and got a callback function for executing logic via each request.

---
### Using packages like nodemon for autoupdating the running server
We can install any npm package via
```bash
npm install <package-name>
```

Notice that you can add `-D` option to make it a developement dependency that will not be downloaded for the app as it doesn't depend on it except in development phase.

---
### Using Node scripts
in `"scripts"` object, you can add scripts and run it
```bash
npm <script-name>
```

Notice that there is no limit for the number of scripts you wan to add, you can add one for server initiation, testing and so on.

---
### Building simple API
We will do as the same of creating server except adding some logic for each route, route is determined by the url and the method used in the request we want to handle by this route.

---
### Middleware and handlers
Middleware is a module or a function that sets between the request and the server so it has the access on `req` and `res` objects.

This is an simple example for what middlewares are cabable of:
```js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
```

You can add authentication layer in web/mobile apps and so on.

---

In `demos` directory, there is some files for explaning modules like `fs`, `path`, `url`, `crypto`, `os` and others.

The best way for studying is by looking at the code and viewing each function and the commeent above it tha explains the expected output.
