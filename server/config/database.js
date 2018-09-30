const mongoose = require('mongoose');
const { Mockgoose } = require('mockgoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.set('runValidators', true);


const open = () => {
  const connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  if (process.env.NODE_ENV === 'test') {
    const mockgoose = new Mockgoose(mongoose);
    mockgoose.prepareStorage().then(() =>{
      mongoose.connect(connectionString, (done) => {
        console.log(`Connected to : ${connectionString}`);
        done();
      });
    });
  } else {
    return mongoose.connect(connectionString)
      .then(() => console.log(`Connection to Database successful @ ${connectionString}`))
      .catch((err) => console.log(`Error While Connecting to Database @ ${connectionString}`));
  }
}

const close = () => {
  return mongoose.disconnect();
};

module.exports = {
  close,
  open,
};