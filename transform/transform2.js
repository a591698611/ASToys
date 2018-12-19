function transformer(file, api) {
  const j = api.jscodeshift;

  return (
    j(file.source)

      .find(j.Identifier, {name: 'a'})

      .filter(p => {
        const node = p.parent.node;
        return (
          node.type === 'VariableDeclarator' &&
          node.init.type === 'Literal'
        )
      })

      .replaceWith(p => {
        Object.assign(p.node, {name: 'b'});
        return p.node
      })

      .toSource()
  )
}

module.exports = transformer;
