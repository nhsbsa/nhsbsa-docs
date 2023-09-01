const { logStartupLogo, parseUserAppConfig } = require('./lib/utils');

/**
 * Initialises the nhsbsa-docs site.
 *
 * @param {EleventyConfig} eleventyConfig The Eleventy configuration object.
 */
function initDocs(eleventyConfig) {
  logStartupLogo();
  // user app configuration if present
  const appConfig = parseUserAppConfig();

  // library configuration
  const path = require('path');
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
  const yaml = require('js-yaml');
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

  eleventyConfig.addPlugin(require('eleventy-plugin-dart-sass'), {
    sassLocation:
      extendedCss?.cssLocation ?? '../nhsbsa-docs/lib/_stylesheets/',
    sassIndexFile: extendedCss?.cssFileName ?? 'application.scss',
    outputStyle: 'expanded',
    outDir: extendedCss?.outDir ?? '_site/nhsbsa-docs/',
    outPath: 'stylesheets',
    outFileName: 'application.css',
  });
}

module.exports = initDocs;
