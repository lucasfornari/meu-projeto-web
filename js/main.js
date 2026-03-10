import { carregarDepoimentos, enviarFormulario } from "./api.js";
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
        } else {
            mostrarAlerta("Erro ao enviar mensagem.", "danger", "alert-form");
        }
    });
}
