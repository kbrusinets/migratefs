const migratefs = require('../index');
const util = require('util');
const readFileStructure = util.promisify(require('fs-file-tree'));
const fs = require('fs-extra');

describe('migratefs', () => {
  const tempDir = 'temp/migrated-to/';

  beforeEach(async () => {
    await fs.remove(tempDir);
    await fs.ensureDir(tempDir);
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  it('migrateFunctionExist', () => {
    expect(migratefs).toEqual(expect.any(Function));
  });

  it('files and folders are migrated', async () => {
    const migrateConfig = {
      './fixtures/folders/original-from/*/middleware': tempDir,
      './fixtures/folders/original-from/*/server-side': tempDir,
      './fixtures/folders/original-from/*/ui': tempDir,
    };
    const cwd = './fixtures/folders/original-from';
    const expectedFileStructure = {
      'server.py': expect.any(Object),
      'setup.sql': expect.any(Object),
      'script.js': expect.any(Object),
    };
    await migratefs(migrateConfig, __dirname, __dirname);
    expect(await readFileStructure(tempDir)).toEqual(expectedFileStructure);
  });
});
