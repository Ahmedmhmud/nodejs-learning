import { createServer } from 'http';
const PORT = process.env.PORT;

const users = [
  { id: 1, name: 'Ahmed' },
  { id: 2, name: 'Mohamed' },
  { id: 3, name: 'Omar' },
];

const server = createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } else if(req.url.match('/\/api/\\users/\([0-9]+)/') && req.method === 'GET') {
    const id = req.url.split('/')[3];
    const user = users.find((user) => id === user.id);

    res.setHeader('Content-Type', 'application/json');
    if (user) {
      res.write(JSON.stringify(user));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 404;
      res.write(JSON.stringify({ message: '404 User Not Found' }));
    }

    res.end();  
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.write(JSON.stringify({ message: '404 Not Found' }));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});