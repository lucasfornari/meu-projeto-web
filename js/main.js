import { carregarDepoimentos, enviarFormulario, buscarCep } from "./api.js";

// tema
var temaSalvo = localStorage.getItem("tema");
if (temaSalvo) document.documentElement.setAttribute("data-theme", temaSalvo);

document.getElementById("navbar-toggler")?.addEventListener("click", () => {
    document.getElementById("navbarNav").classList.toggle("open");
    document.getElementById("btn-tema").classList.toggle("open");
});

document.getElementById("btn-tema")?.addEventListener("click", () => {
    var novo = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novo);
    localStorage.setItem("tema", novo);
});

// alerta temporário
function alerta(id, msg, tipo) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<div class="alert alert-${tipo}">${msg} <button class="btn-close" onclick="this.parentElement.remove()">✕</button></div>`;
    setTimeout(() => el.innerHTML = "", 4000);
}

// depoimentos
var listaDepoimentos = document.getElementById("lista-depoimentos");
if (listaDepoimentos) {
    carregarDepoimentos().then(dados => {
        listaDepoimentos.innerHTML = dados.map(d =>
            `<div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${d.name}</h5>
                        <p class="card-text">${d.body}</p>
                        <small class="text-muted">Por: ${d.email}</small>
                    </div>
                </div>
            </div>`
        ).join("");
    });
}

// produtos
var checkboxes = document.querySelectorAll(".item-produto");
var quantidades = document.querySelectorAll(".qtd-produto");

if (checkboxes.length > 0) {
    function calcularTotal() {
        var total = 0;
        checkboxes.forEach((cb, i) => {
            if (cb.checked) total += parseFloat(cb.value) * parseInt(quantidades[i].value);
        });
        var elTotal = document.getElementById("valor-total");
        if (elTotal) elTotal.innerText = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        var btnCompra = document.getElementById("btn-compra");
        if (btnCompra) btnCompra.disabled = JSON.parse(localStorage.getItem("carrinho") || "[]").length === 0;
    }

    checkboxes.forEach((cb, i) => {
        cb.addEventListener("change", calcularTotal);
        quantidades[i].addEventListener("change", calcularTotal);
    });
    calcularTotal();

    document.querySelectorAll(".btn-adicionar").forEach(btn => {
        btn.addEventListener("click", () => {
            var idx = btn.dataset.index;
            if (!checkboxes[idx].checked) {
                alerta("alert-carrinho", "Selecione o produto antes de adicionar.", "warning");
                return;
            }
            var carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
            var nome = btn.dataset.nome;
            var item = carrinho.find(p => p.nome === nome);
            if (item) item.quantidade += parseInt(quantidades[idx].value);
            else carrinho.push({ nome, preco: parseFloat(checkboxes[idx].value), quantidade: parseInt(quantidades[idx].value) });
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            calcularTotal();
            alerta("alert-carrinho", `${nome} adicionado!`, "success");
        });
    });

    // modal
    var modal = document.getElementById("produtoModal");
    document.querySelectorAll(".btn-ver-detalhes").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById("modalNome").textContent = btn.dataset.nome;
            document.getElementById("modalDescricao").textContent = btn.dataset.descricao;
            document.getElementById("modalPreco").textContent = "R$ " + btn.dataset.preco;
            modal.classList.add("open");
        });
    });
    var fecharModal = () => modal.classList.remove("open");
    document.getElementById("btn-fechar-modal")?.addEventListener("click", fecharModal);
    document.getElementById("btn-fechar-modal-footer")?.addEventListener("click", fecharModal);
    modal?.addEventListener("click", e => { if (e.target === modal) fecharModal(); });
}

// contato
document.getElementById("cep")?.addEventListener("blur", async function () {
    var cep = this.value.replace(/\D/g, "");
    if (cep.length !== 8) {
        alerta("alert-form", "CEP inválido.", "danger");
        return;
    }
    var dados = await buscarCep(cep);
    if (dados.erro) { alerta("alert-form", "CEP não encontrado.", "danger"); return; }
    document.getElementById("rua").value    = dados.logradouro;
    document.getElementById("bairro").value = dados.bairro;
    document.getElementById("cidade").value = dados.localidade;
    document.getElementById("estado").value = dados.uf;
});

document.getElementById("form-contato")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    var res = await enviarFormulario(
        document.getElementById("nome").value,
        document.getElementById("email").value,
        document.getElementById("mensagem").value
    );
    if (res.status === 201) { alerta("alert-form", "Mensagem enviada!", "success"); this.reset(); }
    else alerta("alert-form", "Erro ao enviar.", "danger");
});

// compra
function renderizarCarrinho() {
    var lista = document.getElementById("carrinhoLista");
    if (!lista) return;
    var carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    if (!carrinho.length) {
        lista.innerHTML = "<p class='text-muted'>Carrinho vazio.</p>";
        document.getElementById("totalCarrinho").textContent = "R$ 0,00";
        return;
    }
    var total = 0;
    lista.innerHTML = `<ul class="cart-list">${carrinho.map((p, i) => {
        var sub = p.preco * p.quantidade;
        total += sub;
        return `<li>
            <span>${p.nome} x${p.quantidade}</span>
            <span>R$ ${sub.toFixed(2)}</span>
            <button class="btn btn-sm btn-danger" data-index="${i}">X</button>
        </li>`;
    }).join("")}</ul>`;
    document.getElementById("totalCarrinho").textContent = "R$ " + total.toFixed(2);
    lista.querySelectorAll("[data-index]").forEach(btn => {
        btn.addEventListener("click", () => {
            var c = JSON.parse(localStorage.getItem("carrinho") || "[]");
            c.splice(parseInt(btn.dataset.index), 1);
            localStorage.setItem("carrinho", JSON.stringify(c));
            renderizarCarrinho();
        });
    });
}

if (document.getElementById("carrinhoLista")) {
    renderizarCarrinho();
    document.getElementById("btnLimpar")?.addEventListener("click", () => {
        localStorage.removeItem("carrinho");
        renderizarCarrinho();
    });
    document.getElementById("formPagamento")?.addEventListener("submit", function (e) {
        e.preventDefault();
        var carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
        if (!carrinho.length) { alerta("alert-compra", "Carrinho vazio!", "warning"); return; }
        var metodo = document.querySelector("input[name='pagamento']:checked").value;
        alerta("alert-compra", `Compra finalizada via ${metodo}!`, "success");
        localStorage.removeItem("carrinho");
        renderizarCarrinho();
    });
}
