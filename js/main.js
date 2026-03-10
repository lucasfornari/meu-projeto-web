
import { carregarDepoimentos, enviarFormulario } from "./api.js";
import { renderizarDepoimentos, mostrarAlerta } from "./ui.js";


if (document.getElementById("lista-depoimentos")) {
    carregarDepoimentos()
        .then(dados => renderizarDepoimentos(dados))
        .catch(err => console.error("Erro ao carregar depoimentos:", err));
}


const checkboxes  = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");
const totalEl     = document.getElementById("valor-total");
const btnCompra   = document.getElementById("btn-compra");

function calcularTotal() {
    let total = 0;
    checkboxes.forEach((cb, i) => {
        if (cb.checked) {
            total += parseFloat(cb.value) * parseInt(quantidades[i].value || 1);
        }
    });
    if (totalEl) {
        totalEl.innerText = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
    if (btnCompra) {
        btnCompra.disabled = document.querySelectorAll(".item-produto:checked").length === 0;
    }
}

checkboxes.forEach((cb, i) => {
    cb.addEventListener("change", calcularTotal);
    if (quantidades[i]) quantidades[i].addEventListener("input", calcularTotal);
});

calcularTotal();


const produtoModal = document.getElementById("produtoModal");

if (produtoModal) {
    produtoModal.addEventListener("show.bs.modal", function (event) {
        const botao      = event.relatedTarget;
        const nome       = botao.getAttribute("data-nome");
        const descricao  = botao.getAttribute("data-descricao");
        const preco      = botao.getAttribute("data-preco");

        document.getElementById("modalNome").textContent = nome;
        document.getElementById("modalDescricao").textContent = descricao;
        document.getElementById("modalPreco").textContent =
            parseFloat(preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    });
}


const formContato = document.querySelector("form#form-contato");

if (formContato) {
    formContato.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nome     = document.getElementById("nome").value.trim();
        const email    = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        try {
            const response = await enviarFormulario(nome, email, mensagem);

            if (response.status === 201) {
                mostrarAlerta(
                    "✅ Mensagem enviada com sucesso! Entraremos em contato em breve.",
                    "success",
                    "alert-form"
                );
                formContato.reset();
            } else {
                mostrarAlerta(
                    "❌ Erro ao enviar mensagem. Tente novamente.",
                    "danger",
                    "alert-form"
                );
            }
        } catch (erro) {
            mostrarAlerta(
                "❌ Erro de conexão. Verifique sua internet.",
                "danger",
                "alert-form"
            );
        }
    });
}
