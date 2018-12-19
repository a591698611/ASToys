function transformer(file, api) {
  const j = api.jscodeshift;

  return (
    j(file.source)

      .find(j.MemberExpression, {
        object: {name: 'React'},
        property: {name: 'createClass'},
      })

      .filter(path => {
        const cObject = path.node.object;
        const cProperty = path.node.property;
        return cObject.type === 'Identifier' &&
          cObject.name === 'React' &&
          cProperty.type === 'Identifier' &&
          cProperty.name === 'createClass';
      })

      .forEach(path => {
        j(path).replaceWith(j.identifier('createReactClass'));
      })

      .toSource()
  )
}

module.exports = transformer;
