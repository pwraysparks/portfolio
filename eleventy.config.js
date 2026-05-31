const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  // Copy static assets through to the build untouched.
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Published Storyline (Web/HTML5) output folders live here, one per project.
  // Copy them verbatim and never run them through the template engine — their
  // HTML/JS can contain syntax that would otherwise break the build.
  eleventyConfig.addPassthroughCopy({ "src/projects-content": "projects-content" });
  eleventyConfig.ignores.add("src/projects-content/**");

  // Rebuild when the stylesheet changes during `npm run dev`.
  eleventyConfig.addWatchTarget("src/css/");

  // Projects collection, sorted by the `order` front-matter field.
  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("project")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  return {
    pathPrefix: "/portfolio/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
