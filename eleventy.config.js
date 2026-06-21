export default function (eleventyConfig) {
  // Copia a pasta assets/ (imagens, etc.) direto pro site gerado
  eleventyConfig.addPassthroughCopy("assets");

  // Coleção de posts definida pela pasta (não pela tag "post"), assim o campo
  // "tags" do front matter fica livre para uso do autor
  eleventyConfig.addCollection("post", (api) =>
    api.getFilteredByGlob("posts/*.md")
  );

  // Formata datas de forma legível em pt-BR (usado nos templates via | date)
  eleventyConfig.addFilter("date", (value) => {
    const d =
      value instanceof Date ? value : value === "now" ? new Date() : new Date(value);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  // Data + hora (usado no "editado em"). Interpreta o valor escrito como
  // horário literal (UTC), pra mostrar exatamente o que o autor digitou,
  // independente do fuso da máquina que faz o build.
  eleventyConfig.addFilter("datetime", (value) => {
    const d =
      value instanceof Date
        ? value
        : new Date(String(value).replace(" ", "T") + "Z");
    const dia = d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
    const hora = d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
    return `${dia} às ${hora}`;
  });

  return {
    dir: { input: ".", output: "_site", includes: "_includes" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
