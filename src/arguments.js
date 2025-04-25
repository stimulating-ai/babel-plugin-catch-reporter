const types = require('@babel/types');
const { MEMBER_EXPRESSION_CATCH } = require('./constants');

function getSceneInfo(knownData) {
    const sceneInfo = `[${knownData.source}:${knownData.line}:${knownData.column}]`

    return types.stringLiteral(sceneInfo)
}

function getFunctionArguments(path) {
    const { node: { params = [] } = {} } = path

    return params
        .filter((param) => types.isIdentifier(param))
        .map((param) => param.name)
}

function getFunction(path, _, knownData) {
    const argumentsToAdd = []

    const isCatchClause = types.isCatchClause(path)
    if (isCatchClause) {
        if (!path.node.param) {
            path.node.param = types.identifier('e')
        }
        argumentsToAdd.push(path.node.param.name)
    } else if (knownData.name === MEMBER_EXPRESSION_CATCH) {
        argumentsToAdd.push(...getFunctionArguments(path))
    }

    const identifierArgs = argumentsToAdd.map((identifierName) => {
        return identifierName && types.identifier(identifierName)
    }).filter(Boolean)

    return identifierArgs
}

function getArgs(path, state, knownData) {
    // ignore for now:
    // const sceneInfo = getSceneInfo(knownData)
    const fnArgs = getFunction(path, state, knownData)

    return [...fnArgs]
}

module.exports = {
    getArgs
};
