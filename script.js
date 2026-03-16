async function carregarDepoimentos() {
    var lista = document.getElementById("lista-depoimentos");
    if (!lista) return;

    var response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");
    var dados = await response.json();

    dados.forEach(function(item) {
        lista.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.body}</p>
                        <small class="text-muted">Por: ${item.email}</small>
                    </div>
                </div>
            </div>
        `;
    });
}

function mostrarAlerta(containerId, mensagem, tipo) {
    var div = document.getElementById(containerId);
    if (!div) return;
    div.innerHTML = '<div class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert">' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';
    setTimeout(function() { div.innerHTML = ""; }, 4000);
}

carregarDepoimentos();

var checkboxes = document.querySelectorAll(".item-produto");
var quantidades = document.querySelectorAll(".qtd-produto");

function calcularTotal() {
    var total = 0;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            var preco = parseFloat(checkboxes[i].value);
            var qtd = parseInt(quantidades[i].value);
            total = total + (preco * qtd);
        }
    }
    if (document.getElementById("valor-total")) {
        document.getElementById("valor-total").innerText = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
    if (document.getElementById("btn-compra")) {
        var carrinhoAtual = JSON.parse(localStorage.getItem("carrinho") || "[]");
        document.getElementById("btn-compra").disabled = carrinhoAtual.length === 0;
    }
}

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", calcularTotal);
    quantidades[i].addEventListener("change", calcularTotal);
}

calcularTotal();

var botoes = document.querySelectorAll(".btn-adicionar");
for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", function(e) {
        var btn = e.currentTarget;
        var index = btn.getAttribute("data-index");
        var cb = checkboxes[index];
        var qtd = quantidades[index];

        if (!cb.checked) {
            mostrarAlerta("alert-carrinho", "Selecione o produto antes de adicionar ao carrinho.", "warning");
            return;
        }

        var carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
        var nome = btn.getAttribute("data-nome");
        var preco = parseFloat(cb.value);
        var quantidade = parseInt(qtd.value);

        var encontrado = false;
        for (var j = 0; j < carrinho.length; j++) {
            if (carrinho[j].nome === nome) {
                carrinho[j].quantidade += quantidade;
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            carrinho.push({ nome: nome, preco: preco, quantidade: quantidade });
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        calcularTotal();
        mostrarAlerta("alert-carrinho", nome + " adicionado ao carrinho!", "success");
    });
}

var produtoModal = document.getElementById("produtoModal");
if (produtoModal) {
    produtoModal.addEventListener("show.bs.modal", function(event) {
        var botao = event.relatedTarget;
        document.getElementById("modalNome").textContent = botao.getAttribute("data-nome");
        document.getElementById("modalDescricao").textContent = botao.getAttribute("data-descricao");
        document.getElementById("modalPreco").textContent = "R$ " + botao.getAttribute("data-preco");
    });
}

function limparEndereco() {
    var campos = ["rua", "bairro", "cidade", "estado"];
    for (var i = 0; i < campos.length; i++) {
        var el = document.getElementById(campos[i]);
        if (el) el.value = "";
    }
}

var campoCep = document.getElementById("cep");
if (campoCep) {
    campoCep.addEventListener("blur", async function() {
        var cep = campoCep.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            mostrarAlerta("alert-form", "CEP inválido. Digite 8 números.", "danger");
            limparEndereco();
            return;
        }

        try {
            var response = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
            var dados = await response.json();

            if (dados.erro) {
                mostrarAlerta("alert-form", "CEP não encontrado.", "danger");
                limparEndereco();
                return;
            }

            document.getElementById("rua").value = dados.logradouro;
            document.getElementById("bairro").value = dados.bairro;
            document.getElementById("cidade").value = dados.localidade;
            document.getElementById("estado").value = dados.uf;
        } catch (erro) {
            mostrarAlerta("alert-form", "Erro ao buscar CEP. Verifique sua conexão.", "danger");
            limparEndereco();
        }
    });
}

var formContato = document.getElementById("form-contato");
if (formContato) {
    formContato.addEventListener("submit", async function(e) {
        e.preventDefault();

        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var mensagem = document.getElementById("mensagem").value;

        var dados = { nome: nome, email: email, mensagem: mensagem };

        var response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(dados)
        });

        if (response.status === 201) {
            mostrarAlerta("alert-form", "Mensagem enviada com sucesso!", "success");
            formContato.reset();
            limparEndereco();
        } else {
            mostrarAlerta("alert-form", "Erro ao enviar mensagem.", "danger");
        }
    });
}
