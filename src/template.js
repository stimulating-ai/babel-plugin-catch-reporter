const template = require('babel-template');

const promiseCatchStatement = template(`
  BODY.catch(function(ERR){
      HANDLER(ERR)
  })`);

const promiseCatchEnhancer = template(`{
     HANDLER(ARGUMENTS)
    BODY
 }`);

const returnStatement = template(`{
    return STATEMENT
}`);

module.exports = {
    promiseCatchStatement,
    promiseCatchEnhancer,
    returnStatement
};
