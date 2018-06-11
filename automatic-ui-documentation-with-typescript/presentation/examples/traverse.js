function getDecoratedClasses(reflection, decorators) {
  const classKind = 128;

  return reflection.getReflectionsByKind(classKind)
    .filter(classRefl => {
      const isIncluded = decorators.includes(getDecoratorName(classRefl));
      return !isInternal(classRefl) && !isExternal(classRefl) && (isIncluded || isAbstract(classRefl));
    });
}

function getComponentsMembers(componentsReflections) {
  return componentsReflections.reduce((componentsMap, componentRefl) => {
    const members = traverseMembers(componentRefl.children);
    const componentName = componentRefl.name;
    componentsMap[componentName] = Object.assign({
      name: componentName,
      comment: componentRefl.comment,
      selector: getDirectiveSelector(componentRefl),
    }, members);

    return componentsMap;
  }, {});
}

function traverseMembers(declarations) {
  const members = {
    properties: [],
    inputs: [],
    outputs: [],
    methods: []
  };

  if (isInherited(declaration)) return members;

  const isProperty = declaration.kindString === 'Property' || isSetter(declaration);
  const isMethod = declaration.kindString === 'Method';

  if (isProperty) {
    const decoratorName = getDecoratorName(declaration);
    if (decoratorName === 'Input')
      members.inputs.push(traverseProperty(declaration, 'Input'));

    else if (decoratorName === 'Output')
      members.outputs.push(traverseProperty(declaration, 'Output'));

    else if (!isInternal(declaration))
      members.properties.push(traverseProperty(declaration));
  }

  if (isMethod && !isInternal(declaration) && !isAngularLifecycle(declaration)) {
    members.methods.push(traverseMethod(declaration));
  }
}

function getComponentsTypes({ componentsReflections, supportedKinds, excludedClasses }) {
  componentModule.children.forEach(statement => {
    const typeKind = statement.kindString;

    if (!isExported(statement) || isInternal(statement) || isAbstract(statement) || !supportedKinds.includes(typeKind)) return;
    if (excludedClasses.includes(getDecoratorName(statement))) return;

    if (typeKind === 'Class') {
      const members = traverseMembers(statement.children);
      componentsMap[componentName].types.push({
        name: statement.name,
        kind: typeKind,
        comment: statement.comment,
        properties: members.properties,
        methods: members.methods,
      });
      return;
    }

    if (typeKind === 'Interface') {
      const members = traverseMembers(statement.children);
      componentsMap[componentName].types.push({
        name: statement.name,
        kind: typeKind,
        comment: statement.comment,
        properties: members.properties,
        methods: members.methods,
      });
      return;
    }
  });
}
