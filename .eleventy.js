const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // ── Markdown with HTML enabled ──────────────────────────────────────────
  // Allows <div class="case-sample"> and other HTML blocks in .md files.
  const md = markdownIt({ html: true, linkify: true, typographer: true });
  eleventyConfig.setLibrary("md", md);

  // Static passthroughs — copied as-is to the output folder
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("admin");

  // Human-friendly date filter, e.g. "12 June 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("d LLLL yyyy");
  });

  // ISO date for <time datetime="...">
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Collection of blog posts, newest first
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").reverse();
  });

  // Unique list of all tags used across posts (for the topic filter)
  eleventyConfig.addCollection("postTags", (collectionApi) => {
    const tags = new Set();
    collectionApi.getFilteredByGlob("src/blog/posts/*.md").forEach((post) => {
      (post.data.tags || []).forEach((t) => tags.add(t));
    });
    return [...tags].sort();
  });

  // Collection of work cases
  eleventyConfig.addCollection("cases", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/work/cases/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
