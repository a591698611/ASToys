function transformer(file, api) {
  const j = api.jscodeshift;

  return (
    j(file.source)

      .find(j.Identifier, {name: 'info'})

      .filter(p => {
        const node = p.parent.node;
        return (
          node.type === 'MemberExpression' &&
          node.object.type === 'Identifier' &&
          node.property.type === 'Identifier' &&
          p.parent.parent.node.type === 'CallExpression'
        )
      })

      .replaceWith(p => {
        Object.assign(p.node, {name: 'log'});
        return p.node
      })

      .toSource()
  )
}

module.exports = transformer;
