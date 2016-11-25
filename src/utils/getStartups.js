const startups = require('./startups.json');
const splitPairs = (arr) => {
  const pairs = [];
  for (let i = 0; i < arr.length; i += 2) {
    if (arr[i + 1] !== undefined) {
      pairs.push([arr[i], arr[i + 1]]);
    } else {
      pairs.push([arr[i]]);
    }
  }
  return pairs;
};

export default () => {
  const arr = startups.slice();
  arr.sort(() => 0.5 - Math.random());
  return splitPairs(arr)[0];
};
