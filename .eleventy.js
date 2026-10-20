module.exports = function (eleventyConfig) {
  // Static assets copied as-is into the build output
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/nav.js");
  eleventyConfig.addPassthroughCopy("src/contact-protect.js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
