---
title: Migração de Estrutura de blog
date: 2025-06-21
---
Uma ótima experiência fazendo a migração desse blog, que usava o desnecessário Next.js, pra apenas um site estático, e também complicado de adicionar novos posts, pois o conteúdo era escrito direto na IDE.

Agora, reestruturado do zero, usando simples html, com o eleventy fazendo a conversão dos posts escritos em .md pra html.

Os posts são todos escritos diretos do Obsidian, que torna mais prático visto que o uso diariamente pra anotações pessoais do meu trabalho, apenas trocar a vault, criar/alterar o post e fazer o commit e push no próprio Obsidian com o plugin do Git.

Alterei a hospedagem também, de Vercel pra Netlify, integração em ambas extremamente simples, e adicionar o domínio próprio rápido e intuitivo em ambos.

Otimizado também todas imagens do site, com AVIV com fallback em WebP pra extrair o máximo de performance e atingir o menor pacote possível, o Eleventy tem uma ferramenta própria que converte imagens de outros formatos JPG, PNG direto pra AVIF com fallback em WebP.

Aproveitado também a mudança pra começar a utilizar esse tema retro/neocities que combina com o aspecto rápido e pacote leves da web.

Até agora diria que a criação e manuntenção de posts ficou 90% mais simples de realizar, sem problemas, mais fácil de manter o repositório, e satisfatório.