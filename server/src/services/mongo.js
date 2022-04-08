const mongoose = require('mongoose');

const MONGO_URL = process.env.DB_URL;

mongoose.connection.once('open', () => {
  console.log('MongoDB Connection Ready!');
});

mongoose.connection.on('error',(err) => {
  console.error(err);
});

async function mongoConnect() {
  mongoose.connect(MONGO_URL);
};

async function mongoDisconnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect
};