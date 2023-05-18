const Nunjucks = require('nunjucks');

/**
 * Creates a Nunjucks environment.
 *
 * @param {string|Array<string>} path The path to the Nunjucks templates.
 * @returns {Nunjucks.Environment} The Nunjucks environment.
 */
module.exports = (path) => {
  var nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader(Array.isArray(path) ? path : [path], {
      watch: process.env.NODE_ENV === 'development',
    }),
    {
      lstripBlocks: true,
      trimBlocks: true,
    }
  );
  return nunjucksEnvironment;
};
