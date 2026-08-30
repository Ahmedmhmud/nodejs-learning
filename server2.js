import { createServer } from 'http';
const PORT = process.env.PORT;

const users = [
  { id: 1, name: 'Ahmed' },
  { id: 2, name: 'Mohamed' },
  { id: 3, name: 'Omar' },
];

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

// Route handler /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

// Route handler /api/users/:id
const getUserByIdHandler = (req, res) => {
  const id = req.url.split('/')[3];
  const user = users.find((user) => id === user.id);

  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: '404 User Not Found' }));
  }

  res.end();
};

// Route handler /api/users POST
const createUserHandler = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end;  
  });
};

// Not Found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: '404 Not Found' }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () =>{
    jsonMiddleware(req, res, () => {
      if (req.url === '/api/users' && req.method === 'GET') {
        getUsersHandler(req,res);
      } else if(req.url.match('/\/api/\\users/\([0-9]+)/') && req.method === 'GET') {
        getUserByIdHandler(req, res);
      } else if (req.url === '/api/users' && req.method === 'POST') {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});