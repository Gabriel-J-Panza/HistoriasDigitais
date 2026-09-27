# Como o site é organizado

- `docs/index.html`: estrutura da página inicial e do mapa.
- `docs/assets/styles.css`: cores, tipografia, mapa, livro e layout responsivo.
- `docs/assets/app.js`: navegação entre cidades, abas e capítulos.
- `docs/assets/stories.js`: texto-base das crônicas.
- `docs/assets/expansions.js`: trechos narrativos adicionais do blog.
- `docs/assets/chronicles/`: ilustrações de abertura das crônicas.

O GitHub Pages publica diretamente a pasta `docs/` da branch principal. Por isso, alterações feitas nesses arquivos aparecem no site depois que são enviadas ao GitHub e o Pages termina a publicação.

## Desenvolvimento e publicação

Para testar localmente, abra um servidor na pasta `docs/` (por exemplo, com Python) e acesse `http://127.0.0.1:4173/`.

Para publicar uma alteração:

1. Edite os arquivos necessários.
2. Faça um commit com uma mensagem curta explicando a mudança.
3. Envie o commit para o GitHub (`git push`).
4. Aguarde o GitHub Pages concluir a nova publicação.

Os PDFs usados como referência ficam fora da publicação por causa do `.gitignore`. O site usa os textos preparados nos arquivos JavaScript e as imagens leves da pasta `docs/assets/`.
