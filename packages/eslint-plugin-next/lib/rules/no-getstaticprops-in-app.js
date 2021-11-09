module.exports = {
	meta: {
		docs: {
			description: 'Enforce no getStaticProps in pages/_app.js',
			recommended: true,
			url: 'https://nextjs.org/docs/messages/no-getstaticprops-in-app',
		},
	},
	create: function (context) {
		let appImportName
		return {
			ImportDeclaration(node) {
				if (node.source.value === 'next/app') {
					const documentImport = node.specifiers.find(
						({ type }) => type === 'ImportDefaultSpecifier'
					)
					if (documentImport && documentImport.local) {
						appImportName = documentImport.local.name
					}
				}
			},
			ReturnStatement(node) {
				const ancestors = context.getAncestors()
				console.log("ancestors")
				const appClass = ancestors.find(
					(ancestorNode) =>
						ancestorNode.type === 'FunctionDeclaration' &&
						ancestorNode.superClass &&
						ancestorNode.superClass.name === appImportName
				)

				if (!appClass) {
					return
				}

				// if (node.argument && node.argument.children) {
				// 	const headComponents = node.argument.children.filter(
				// 		(childrenNode) =>
				// 			childrenNode.openingElement &&
				// 			childrenNode.openingElement.name &&
				// 			childrenNode.openingElement.name.name === 'Head'
				// 	)

				// 	if (headComponents.length > 1) {
				// 		for (let i = 1; i < headComponents.length; i++) {
				// context.report({
				// 	node: headComponents[i],
				// 	message:
				// 		'Do not include getStaticProps in _app.js. See: https://nextjs.org/docs/messages/no-getstaticprops-in-app',
				// })
				// 		}
				// 	}
				// }
			},
		}
	},
}
