const devData = require('../data/development-data/index.js');
const testData = require("../data/test-data/index.js");
const seed = require('./seed.js');
const db = require('../index.js');

const runSeed = () => {
  console.log("Dev Seed Created")
  return seed(devData)
    .then(() => {
      console.log("Test Seed Created")
    return  seed(testData)
  })
    .then(() => {
    return db.end()
  })
};

runSeed();