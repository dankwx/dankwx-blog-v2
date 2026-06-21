export default function (eleventyConfig) {
  // Formata datas de forma legível em pt-BR (usado nos templates via | date)
  eleventyConfig.addFilter("date", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  return {
    dir: { input: ".", output: "_site", includes: "_includes" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
