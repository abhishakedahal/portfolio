const { HtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Automatically rewrite internal root-relative URLs with pathPrefix when deployed
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // Passthrough static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Watch CSS and JS assets for changes during development
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // Collection: All projects sorted by order (ascending) or date (descending)
  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByTag("project").sort((a, b) => {
      const orderA = typeof a.data.order === "number" ? a.data.order : 999;
      const orderB = typeof b.data.order === "number" ? b.data.order : 999;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return (b.date || 0) - (a.date || 0);
    });
  });

  // Collection: Featured projects for homepage showcase
  eleventyConfig.addCollection("featuredProjects", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("project")
      .filter((item) => Boolean(item.data.featured))
      .sort((a, b) => {
        const orderA = typeof a.data.order === "number" ? a.data.order : 999;
        const orderB = typeof b.data.order === "number" ? b.data.order : 999;
        return orderA - orderB;
      });
  });

  // Filter: Format dates (e.g. "2024-06" or Date object to "June 2024" or "2024")
  eleventyConfig.addFilter("readableDate", function (dateVal) {
    if (!dateVal) return "";
    const date = new Date(dateVal);
    if (isNaN(date.getTime())) return String(dateVal);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  });

  // Filter: Get current year for footer copyright
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    // Configurable base path for GitHub Pages subpath deployment
    pathPrefix: process.env.PATH_PREFIX || "/"
  };
};
