import { carregarDepoimentos, enviarFormulario, buscarCep } from "./api.js";
import { renderizarDepoimentos, mostrarAlerta } from "./ui.js";

if (document.getElementById("lista-depoimentos")) {
    carregarDepoimentos().then(function(dados) {
        renderizarDepoimentos(dados);
    });
}

var checkboxes = document.querySelectorAll(".item-produto");
var quantidades = document.querySelectorAll(".qtd-produto");

function calcularTotal() {
    var total = 0;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            total += parseFloat(checkboxes[i].value) * parseInt(quantidades[i].value);
        }
    }
    if (document.getElementById("valor-total")) {
        document.getElementById("valor-total").innerText = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
    if (document.getElementById("btn-compra")) {
        document.getElementById("btn-compra").disabled = document.querySelectorAll(".item-produto:checked").length === 0;
    }
}

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", calcularTotal);
    quantidades[i].addEventListener("change", calcularTotal);
}

calcularTotal();

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
            mostrarAlerta("CEP inválido. Digite 8 números.", "danger", "alert-form");
            limparEndereco();
            return;
        }

        try {
            var dados = await buscarCep(cep);

            if (dados.erro) {
                mostrarAlerta("CEP não encontrado.", "danger", "alert-form");
                limparEndereco();
                return;
            }

            document.getElementById("rua").value = dados.logradouro;
            document.getElementById("bairro").value = dados.bairro;
            document.getElementById("cidade").value = dados.localidade;
            document.getElementById("estado").value = dados.uf;
        } catch (erro) {
            mostrarAlerta("Erro ao buscar CEP. Verifique sua conexão.", "danger", "alert-form");
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

        var response = await enviarFormulario(nome, email, mensagem);

        if (response.status === 201) {
            mostrarAlerta("Mensagem enviada com sucesso!", "success", "alert-form");
            formContato.reset();
            limparEndereco();
        } else {
            mostrarAlerta("Erro ao enviar mensagem.", "danger", "alert-form");
        }
    });
}
