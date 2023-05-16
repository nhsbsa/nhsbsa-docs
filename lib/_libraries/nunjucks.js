const Nunjucks = require('nunjucks');

module.exports = (path) => {
  var nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader(Array.isArray(path) ? path : [path], {
      watch: process.env.NODE_ENV === 'development',
    }),
    {
      lstripBlocks: true,
      trimBlocks: true,
      autoescape: false,
    }
  );
  return nunjucksEnvironment;
};
