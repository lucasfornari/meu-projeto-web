# Fornari - Projeto Web

Site multi-paginas como exercicio pratico de front-end, controle de versao com Git e ferramentas modernas de desenvolvimento.

---

## Tecnologias e ferramentas

- HTML5 e Bootstrap 5.3 (via CDN)
- JavaScript ES6 (modulos)
- SASS (compilado pelo Vite)
- date-fns (manipulacao de datas)
- Vite (build e servidor de desenvolvimento)
- ESLint + Prettier (qualidade e formatacao de codigo)
- Husky + lint-staged (executa lint automaticamente antes de cada commit)
- APIs externas: JSONPlaceholder, ViaCEP

---

## Estrutura de arquivos

```
meu-projeto-web/
├── index.html              Pagina inicial
├── web/
│   ├── produtos.html       Vitrine de produtos, orcamento e carrinho
│   ├── contato.html        Formulario de contato com busca de CEP
│   ├── depoimentos.html    Pagina de depoimentos
│   └── compra.html         Resumo do carrinho
├── js/
│   ├── api.js              Funcoes de fetch (APIs externas)
│   └── main.js             Ponto de entrada, event listeners
├── styles/
│   └── main.scss           Estilos em SASS
└── vite.config.js          Configuracao do Vite (entradas multi-pagina)
```

---

## Funcionalidades

### Home (index.html)

- Navbar responsiva
- Tema claro/escuro salvo no localStorage
- Depoimentos carregados via GET na API JSONPlaceholder

### Produtos (web/produtos.html)

- Cards de produtos com imagem, descricao e preco
- Simulador de orcamento com valor total em tempo real
- Carrinho salvo no localStorage
- Modal dinamico do Bootstrap com dados do produto injetados via JS
- Botao "Concluir Compra" habilitado so quando o carrinho tem itens

### Contato (web/contato.html)

- Formulario com nome, e-mail e mensagem
- Busca de endereco automatica pelo CEP via ViaCEP
- Envio via POST para JSONPlaceholder com feedback visual

### Carrinho (web/compra.html)

- Lista os itens do localStorage
- Remove itens individuais ou limpa o carrinho inteiro

---

## Como executar

```
git clone https://github.com/lucasfornari/meu-projeto-web.git
cd meu-projeto-web
npm install
npm run dev
```

Outros comandos:

```
npm run build    # gera os arquivos de producao na pasta dist/
npm run preview  # serve o build de producao localmente
```

---

## Autor

Lucas Fornari
