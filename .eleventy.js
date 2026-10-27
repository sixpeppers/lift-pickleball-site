module.exports = function (eleventyConfig) {
  // Static assets copied as-is into the build output
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/nav.js");
  eleventyConfig.addPassthroughCopy("src/contact-protect.js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/images");

  // The Decap CMS editor lives in /admin at the project root (outside the
  // "src" input directory), so it needs its own explicit passthrough rule —
  // otherwise Eleventy never copies it into the build output and the live
  // /admin page 404s even though the rest of the site builds and deploys fine.
  eleventyConfig.addPassthroughCopy({ admin: "admin" });

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
