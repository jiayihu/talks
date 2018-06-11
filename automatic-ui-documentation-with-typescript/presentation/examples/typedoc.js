const typedoc = require('typedoc');
const traverse = require('./typedoc-traverse');

const app = new typedoc.Application(options);
const files = app.expandInputFiles(filePaths);
const projectReflection = app.convert(files);

const componentsReflections = traverse.getDecoratedClasses(projectReflection, ['Directive', 'Component', 'Injectable']);

const componentsMembers = traverse.getComponentsMembers(componentsReflections);

const componentsTypes = traverse.getComponentsTypes({
  componentsReflections,
  supportedKinds: ['Class', 'Interface', 'Type alias'],
  excludedClasses: documentedDecorators
});

const components = merge(componentsMembers, componentsTypes);

writeToJSON(components, jsonPath);
