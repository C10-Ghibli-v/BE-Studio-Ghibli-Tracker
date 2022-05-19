const store = require("./store");

function saveScores(scoreData) {
  return new Promise(async (resolve, reject) => {
    const saveScore = await store.saveScore(scoreData);
    if (!saveScore) {
      reject("Internal error");
    }
    resolve(saveScore);
  });
}

function modifyScores(scoreData) {
  return new Promise(async (resolve, reject) => {
    const saveScore = await store.modifyScore(scoreData);
    if (!saveScore) {
      reject("Internal error");
    }
    resolve(saveScore);
  });
}

module.exports = {
  saveScores,
  modifyScores,
};
