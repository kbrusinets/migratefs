const migratefs = require('../index');
const util = require('util');
const readFileStructure = util.promisify(require('fs-file-tree'));
const fs = require('fs-extra');

describe('migratefs', () => {
    const tempDir = 'temp/migrated-to/'
    
    beforeEach(async () => {
        await fs.remove(tempDir);
        await fs.ensureDir(tempDir)
    })

    it('migrateFunctionExist', () => {
        expect(migratefs).toEqual(expect.any(Function))
    });

    it('files and folders are migrated', async () => {
        const migrateConfig = {
            "./fixtures/folders/original-from/*/middleware": tempDir,
            "./fixtures/folders/original-from/*/server-side": tempDir,
            "./fixtures/folders/original-from/*/ui": tempDir,
        }
        const cwd = "./fixtures/folders/original-from"
        const expectedFileStructure = { "middleware": { "first-component": { "server.py": jasmine.any(Object) }, "second-component": { "server.py": jasmine.any(Object) } }, "server-side": { "first-component": { "setup.sql": jasmine.any(Object) } }, "ui": { "first-component": { "script.js": jasmine.any(Object) }, "third-component": { "script.js": jasmine.any(Object) } } }
        await migratefs(migrateConfig, cwd);
        expect(await readFileStructure(tempDir)).toEqual(expectedFileStructure)
    })
});
