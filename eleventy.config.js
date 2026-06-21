import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // Copia a pasta assets/ (fontes, ícones, etc.) direto pro site gerado.
  // As imagens referenciadas em <img>/markdown são otimizadas pelo plugin
  // abaixo, mas o passthrough garante que o original também exista no site.
  eleventyConfig.addPassthroughCopy("assets");

  // Otimização automática de imagens: varre o HTML gerado e, para toda <img>
  // (inclusive as vindas de ![]() do markdown), gera versões avif/webp +
  // o formato original como fallback, trocando a tag por um <picture>.
  // As versões processadas vão para _site/img/.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "auto"], // "auto" = mantém o formato original como fallback
    widths: ["auto"], // mantém a resolução original (sem upscaling)
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

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
