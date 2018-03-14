const forEach = require('lodash.foreach');
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
    migrate.push(glob(from).then(entries =>
      entries.map(async element =>
        fs.lstat(element).then((stats) => {
          stats.isFile() ? dest = path.join(baseTo, to, path.basename(element)) : dest = path.join(baseTo, to);
          return Promise.resolve(fs.copySync(element, dest));
        }))));
  });

  return Promise.all(migrate);
}
