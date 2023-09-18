require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./db/connectDB');

const server = http.createServer(app);

const port = process.env.PORT || 4000;

const main = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`App is listining on port ${port}`);
    });
  } catch (e) {
    console.log('Database Connection Failed');
    console.log('Message:', e.message);
  }
};

main();
