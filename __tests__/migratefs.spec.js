const migratefs = require('../index');
const util = require('util');
const readFileStructure = util.promisify(require('fs-file-tree'));
const fs = require('fs-extra');

describe('migratefs', () => {
  const tempDir = 'temp/migrated-to';

  it('migrateFunctionExist', () => {
    expect(migratefs).toEqual(expect.any(Function));
  });

  it('files and folders are migrated', () => {
    let fileStructure = {};
    const migrateConfig = {
      './fixtures/*/original-from/first-component/middleware': tempDir,
      './fixtures/*/original-from/first-component/server-side': tempDir,
      './fixtures/*/original-from/third-component/ui': tempDir
    };
    const expectedFileStructure = {
      'server.py': expect.any(Object),
      'setup.sql': expect.any(Object),
      'script.js': expect.any(Object)
    };
    migratefs(migrateConfig, __dirname, __dirname).then( () =>
      readFileStructure(tempDir).then( (fileStructure) =>
      expect(fileStructure).toEqual(expectedFileStructure)
      )
    );
  });
});
