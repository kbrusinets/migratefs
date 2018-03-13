const forEach = require('lodash/foreach');
const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const glob = util.promisify(require('glob'));

module.exports = migratefs;

async function migratefs(config, baseFrom, baseTo) {
  let dest,
    migrate = [];

  process.chdir(baseFrom);

  forEach(config, (to, from) => {
    migrate.push(glob(from).then((entries) => {
    return entries.map(async function (element) {
      return fs.lstat(element).then(stats => {
        stats.isFile() ? dest = path.join(baseTo, to, path.basename(element)) : dest = path.join(baseTo, to);
      return fs.copy(element, dest);
    });
    });
}));
});

  return Promise.all(migrate);
}
