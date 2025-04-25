const { prepare } = require('./options');

function pre() {
    this.babelPluginLoggerSettings = prepare(this.opts)
}

function post() {
    this.babelPluginLoggerSettings = undefined
}

module.exports = {
    pre,
    post
};
