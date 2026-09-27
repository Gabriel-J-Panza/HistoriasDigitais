# Crônicas de Aurelia — GitHub Pages

Site estático pronto para publicação pelo GitHub Pages a partir da pasta `docs/`.

## Publicar

1. Envie este projeto para um repositório no GitHub.
2. Em **Settings → Pages**, selecione **Deploy from a branch**.
3. Escolha a branch principal e a pasta **/docs**.

## Atualizar as histórias

O arquivo `assets/stories.js` é gerado a partir dos PDFs consolidados do acervo. Depois de editar um PDF, execute `tools/build_stories.py` em um ambiente com `pypdf` instalado.

As cenas narrativas adicionais do blog ficam em `assets/expansions.js`. Elas são preservadas quando `stories.js` é regenerado.
