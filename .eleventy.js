const { DateTime } = require('luxon');

const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPassthroughCopy('./src/css');

  eleventyConfig.addWatchTarget('./src/css');

  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Return all the tags used in a collection
  eleventyConfig.addFilter('getAllTags', (collection) => {
    let tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    }
    return Array.from(tagSet);
  });

  eleventyConfig.addFilter('filterTagList', function filterTagList(tags) {
    return (tags || []).filter(
      (tag) =>
        ['all', 'nav', 'post', 'posts', 'blogs', 'projects'].indexOf(tag) === -1
    );
  });

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid', 'json', 'txt'],

    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },

    htmlTemplateEngine: 'njk',

    markdownTemplateEngine: 'njk',

    pathPrefix: '/',
  };
};
