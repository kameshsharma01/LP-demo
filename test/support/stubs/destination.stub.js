// 3rd-party
const R = require('ramda');

exports.write = function () {
  throw new Error('Destination write method not stubbed');
};

exports.calls = function (query = {}) {
  const filter = R.filter(R.whereEq(query));
  return filter(
    exports.write.mock.calls.map((call) => {
      try {
        return JSON.parse(call[0]);
      } catch (err) {
        return call[0];
      }
    })
  );
};
