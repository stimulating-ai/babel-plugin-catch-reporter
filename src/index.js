const { declare } = require('@babel/helper-plugin-utils');

const setup = require('./setup');
const visitors = require('./visitors');

function babelPluginAutoReportError(api) {
    api.assertVersion(7)

    return {
        name: 'babel-plugin-catch-logger',
        post: setup.post,
        pre: setup.pre,
        visitor: {
            CatchClause: visitors.CatchClause,
            Program: { exit: visitors.Program },
            CallExpression: visitors.CallExpression,
        },
    }
}

module.exports = declare(babelPluginAutoReportError);
