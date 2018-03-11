# migratefs
WIP: migrate file structure script nodejs
<!-- START doctoc -->
<!-- END doctoc -->
<!-- START jsdoc -->
<!-- END jsdoc -->
## algorithm
* read only one level json with properties as glob expressions that resolves to from and values as glob expressions that resolves to destination
* copy all resolved with glob paths to resolved with glob destinations
## notice
copy must be async, glob-expressions resolves must be async for more perfomance
## example
```
// original structure
- any
-- firstComponent
---- ui
---- middleware
-- secondComponent
---- Ui
---- thirdComponent
------ anyComponent
-------- ui
-- thirdComponent
---- ui-first
---- server
---- node_modules
------ notThirdComponent
-------- ui
-------- server
```
```javascript
function generateConfig(component){
    const exclude = `!(componentDependenciManager|node_modules)`
    return {
        [`${component}/[Uu]i*, ${exclude}`]: `migrated/ui/${component}`,
        [`${component}/server, ${exclude}`]: `migrated/server/${component}`
    }
};
const components = ['firstComponent', 'secondComponent', 'thirdComponent']
let migrates = [];
components.forEach((component)=>{
    migrates.push(migratefs(generateConfig(component), `any/${component}`));
})

await Promise.all(components);
```
```
// migrated structure
- migrated
-- server
---- thirdComponent
-- ui
---- secondComponent
---- firstComponent
---- thirdComponent
```
as you see migratefs take two arguments - config and cwd
script use fast-glob for config, with one difference - use globs in string separated by `,`
## develop
`npm install`
`npm test`
## TODO:
* tests
** add more coverage
** use fsify struc or another one for create fixtures
* implementing functionality - test must be green
* improve readme - add cases, contribute information...
* run ci checks on Travis