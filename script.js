
async function carregarDepoimentos() {
    const lista = document.getElementById("lista-depoimentos");
    if (!lista) return;

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=6");
        const dados = await response.json();

        lista.innerHTML = dados.map(item => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body text-start">
                        <h5 class="card-title text-primary">${item.name}</h5>
                        <p class="card-text text-muted">${item.body}</p>
                        <small class="text-secondary"><em>Por: ${item.email}</em></small>
                    </div>
                </div>
            </div>
        `).join("");
    } catch (erro) {
        console.error("Erro ao carregar depoimentos:", erro);
        lista.innerHTML = '<div class="col-12"><p class="text-danger">Não foi possível carregar os depoimentos.</p></div>';
    }
}

carregarDepoimentos();

document.addEventListener("DOMContentLoaded", function () {

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
            const botao     = event.relatedTarget;
            const nome      = botao.getAttribute("data-nome");
            const descricao = botao.getAttribute("data-descricao");
            const preco     = botao.getAttribute("data-preco");

            document.getElementById("modalNome").textContent = nome;
            document.getElementById("modalDescricao").textContent = descricao;
            document.getElementById("modalPreco").textContent =
                parseFloat(preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        });
    }

    const formContato = document.getElementById("form-contato");

    if (formContato) {
        formContato.addEventListener("submit", async function (e) {
            e.preventDefault();

            const nome     = document.getElementById("nome").value.trim();
            const email    = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();
            const alertDiv = document.getElementById("alert-form");

            function mostrarAlerta(msg, tipo) {
                alertDiv.innerHTML = `
                    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                        ${msg}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
                    </div>`;
                setTimeout(() => alertDiv.innerHTML = "", 6000);
            }

            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ nome, email, mensagem })
                });

                if (response.status === 201) {
                    mostrarAlerta("✅ Mensagem enviada com sucesso! Entraremos em contato em breve.", "success");
                    formContato.reset();
                } else {
                    mostrarAlerta("❌ Erro ao enviar mensagem. Tente novamente.", "danger");
                }
            } catch (erro) {
                mostrarAlerta("❌ Erro de conexão. Verifique sua internet.", "danger");
            }
        });
    }

});
