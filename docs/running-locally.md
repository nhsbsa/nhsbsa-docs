# Setup with your eleventy project

After [installing](../README.md#installation) the NHSBSA-Docs dependency through npm. You will need to setup the `nhsbsa-docs` within your `.eleventy.js` config file.

To do this, you can include the following line of code within the `.eleventy.js` module export:

```js
require('nhsbsa-docs/nhsbsa-docs')(eleventyConfig);
```

By default, your application should now run with the library components and styling made available to your project. Further [configuration](project-configuration) can be setup to overide the default `nhsbsa-docs` configuration.
