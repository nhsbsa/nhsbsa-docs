const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

function parseUserAppConfig() {
  const configFile = 'nhsbsa-docs.config.yaml';
  try {
    const fileContents = fs.readFileSync(`./${configFile}`, 'utf8');
    const config = yaml.load(fileContents);
    return config;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.info(
        `[nhsbsa-docs]: It looks like you don't have a ${configFile} file. Using defaults instead.`
      );
    } else {
      console.error(error);
      return null;
    }
  }
}

function logStartupLogo() {
  console.log(`
     __ _  _  _  ____  ____  ____   __       ____   __    ___  ____ 
    (  ( \\/ )( \\/ ___)(  _ \\/ ___) / _\\  ___(    \\ /  \\  / __)/ ___)
    /    /) __ (\\___ \\ ) _ (\\___ \\/    \\(___)) D ((  O )( (__ \\___ \\
    \\_)__)\\_)(_/(____/(____/(____/\\_/\\_/    (____/ \\__/  \\___)(____/
    version: ${process.env.npm_package_version}
  `);
}

function initDocs(eleventyConfig) {
  logStartupLogo();
  const appConfig = parseUserAppConfig();

  eleventyConfig.setLibrary(
    'njk',
    require('./lib/_libraries/nunjucks')([
      'node_modules/nhsbsa-docs/lib/_layouts',
      'node_modules/nhsbsa-docs/lib/_components',
      'node_modules/nhsuk-frontend/packages/components',
      ...(appConfig?.nunjucks?.templates ?? []).map((template) =>
        path.resolve(template)
      ),
    ])
  );
  eleventyConfig.setLibrary('md', require('./lib/_libraries/markdown'));

  // filters
  eleventyConfig.addFilter('date', require('./lib/_filters/date'));
  eleventyConfig.addFilter('fixed', require('./lib/_filters/fixed'));
  eleventyConfig.addFilter('markdown', require('./lib/_filters/markdown'));
  eleventyConfig.addFilter('pretty', require('./lib/_filters/pretty'));
  eleventyConfig.addFilter('slug', require('./lib/_filters/slug'));
  eleventyConfig.addFilter('sort', require('./lib/_filters/sort'));
  eleventyConfig.addFilter('tokenize', require('./lib/_filters/tokenize'));
  eleventyConfig.addFilter(
    'totalFromRows',
    require('./lib/_filters/total-from-rows')
  );
  eleventyConfig.addFilter('widont', require('./lib/_filters/widont'));
  eleventyConfig.addFilter(
    'sortByOrder',
    require('./lib/_filters/sortByOrder')
  );
  eleventyConfig.addFilter('blank', require('./lib/_filters/blank'));
  eleventyConfig.addFilter('urlEncode', require('./lib/_filters/urlEncode'));
  eleventyConfig.addFilter('debug', require('./lib/_filters/debug'));
  eleventyConfig.addFilter('absoluteUrl', require('./lib/_filters/urls'));

  // pass through
  eleventyConfig.addPassthroughCopy({ './lib/_javascripts': '/javascripts' });
  eleventyConfig.addPassthroughCopy({ './lib/_images': '/images' });
  eleventyConfig.addPassthroughCopy({
    'node_modules/nhsuk-frontend/packages/assets': '/nhsuk-frontend/assets',
  });
  eleventyConfig.addPassthroughCopy({
    'node_modules/nhsuk-frontend/dist/*.js': '/javascripts',
  });
  eleventyConfig.addPassthroughCopy('src/**/*.jpg');
  eleventyConfig.addPassthroughCopy('src/**/*.jpeg');
  eleventyConfig.addPassthroughCopy('src/**/*.png');
  eleventyConfig.addPassthroughCopy('src/**/*.docx');

  //data
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  // plugins
  eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
  eleventyConfig.addPlugin(require('eleventy-plugin-nesting-toc'), {
    tags: ['h2', 'h3'],
    wrapper: 'div',
    wrapperClass: 'nhsbsa-nav__list',
  });
  eleventyConfig.addPlugin(require('eleventy-plugin-external-links'), {
    name: 'external-links',
    regex: /^((http[s]?:)|(\/\/))/i, // Regex that test if href is external
    target: '_blank',
    rel: 'noopener',
    extensions: ['.html'],
    includeDoctype: true,
  });
  const extendedCss = appConfig?.extendBaseCss;
  const cssLocation = extendedCss?.cssLocation;
  const cssFile = extendedCss?.cssFileName;
  const cssOutDir = extendedCss?.outDir;

  eleventyConfig.addPlugin(require('eleventy-plugin-dart-sass'), {
    sassLocation: cssLocation ?? '../nhsbsa-docs/lib/_stylesheets/',
    sassIndexFile: cssFile ?? 'application.scss',
    outputStyle: 'expanded',
    outDir: cssOutDir ?? '_site/nhsbsa-docs/',
    outPath: 'stylesheets',
    outFileName: 'application.css',
  });
}

module.exports = initDocs;
