const app = require('./app');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDb Connected'));

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
