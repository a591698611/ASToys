function transformer(file, api) {
  const j = api.jscodeshift;

  return (
    j(file.source)

      .find(j.Identifier, {name: 'finished'})

      .filter(p => {
        const node = p.parent.node;
        return (
          node.type === 'Property' &&
          node.key.type === 'Identifier' &&
          node.key.name === 'finished'
        )
      })

      .filter(p => {
        const parent = p.parent.parent.parent;
        if (parent.node.type === 'CallExpression') {
          const call = parent.node;
          const node = call.callee;
          const types = (
            node.type === 'MemberExpression' &&
            node.object.type === 'Identifier' &&
            node.property.type === 'Identifier'
          );
          const identifiers = (
            node.object.name === 'Base' &&
            node.property.name === 'extend'
          );
          return types && identifiers
        }
        return false
      })

      .replaceWith(p => {
        Object.assign(p.node, {name: 'ready'});
        return p.node
      })

      .toSource()
  )
}

module.exports = transformer;
