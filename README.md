# Fornari - Projeto Web

Site multi-páginas desenvolvido com HTML, Bootstrap 5 e JavaScript puro como exercício prático de desenvolvimento front-end e controle de versão com Git.

---

## Tecnologias utilizadas

- HTML5
- Bootstrap 5.3 (via CDN)
- JavaScript (ES6)
- Git e GitHub
- APIs externas: JSONPlaceholder, ViaCEP

---

## Estrutura de arquivos

```
meu-projeto-web/
├── index.html          Página inicial com depoimentos dinâmicos
├── produtos.html       Vitrine de produtos com simulador de orçamento e carrinho
├── contato.html        Formulário de contato com busca de CEP automática
├── depoimentos.html    Página dedicada a depoimentos
├── compra.html         Resumo do carrinho de compras
├── script.js           JavaScript principal (utilizado em produção)
└── js/
    ├── api.js          Funções de comunicação com APIs externas (ES6 module)
    ├── ui.js           Funções de manipulação do DOM (ES6 module)
    └── main.js         Ponto de entrada dos módulos ES6
```

---

## Funcionalidades

### Home (index.html)
- Navbar responsiva com links para todas as páginas
- Alternancia de tema claro/escuro salvo no localStorage
- Depoimentos carregados dinamicamente via GET na API JSONPlaceholder

### Produtos (produtos.html)
- 3 cards de produtos com imagem, descricao e preco
- Simulador de orcamento: selecione produtos e quantidades para ver o valor total atualizado em tempo real
- Botao "Adicionar" salva o item no carrinho via localStorage
- Modal dinamico do Bootstrap: ao clicar em "Ver Detalhes", os dados do produto sao injetados no modal via atributos data-*
- Botao "Concluir Compra" habilitado apenas quando o carrinho nao esta vazio

### Contato (contato.html)
- Formulario com campos de nome, e-mail e mensagem
- Busca de endereco automatica pelo CEP usando a API ViaCEP (acionada ao sair do campo CEP)
- Envio dos dados via POST para JSONPlaceholder com feedback visual de sucesso ou erro usando alertas do Bootstrap

### Carrinho (compra.html)
- Lista os itens adicionados em produtos.html lendo o localStorage
- Permite remover itens individuais ou limpar o carrinho completo

---

## Modulos ES6 (js/)

Os arquivos dentro da pasta `js/` representam a versao modularizada do codigo, separando responsabilidades:

- `api.js` exporta as funcoes de fetch (depoimentos, envio de formulario, busca de CEP)
- `ui.js` exporta as funcoes de manipulacao do DOM (alertas, renderizacao de cards, tema)
- `main.js` importa e conecta tudo, registrando os event listeners

Esta versao requer um servidor local para funcionar (por exemplo, a extensao Live Server do VS Code), pois modulos ES6 nao funcionam via protocolo `file://`.

O arquivo `script.js` na raiz e a versao de producao que roda diretamente no navegador sem necessidade de servidor.

---

## Como executar

1. Clone o repositorio:
   ```
   git clone https://github.com/seu-usuario/meu-projeto-web.git
   ```

2. Abra a pasta no VS Code e use a extensao Live Server para servir os arquivos, ou abra o `index.html` diretamente no navegador (o `script.js` funciona sem servidor).

---

## Historico de branches

O projeto foi desenvolvido de forma incremental, com cada funcionalidade em uma branch isolada:

| Branch                  | Descricao                                      |
|-------------------------|------------------------------------------------|
| adiciona-estilo         | Integracao do CDN do Bootstrap                 |
| nova-ideia              | Texto alternativo para o h1 (conflito proposital) |
| desenvolvimento-site    | Criacao das paginas produtos e contato         |
| feature-orcamento       | Simulador de orcamento com JavaScript          |
| feature-depoimentos     | Consumo da API JSONPlaceholder via GET         |
| feature-envio-form      | Envio do formulario de contato via POST        |
| refatoracao-modulos     | Separacao do codigo em modulos ES6             |
| feature-modal-dinamico  | Modal do Bootstrap com dados injetados via JS  |

---

## Autor

Lucas Fornari
