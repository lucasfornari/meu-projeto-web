document.addEventListener("DOMContentLoaded", function () {

    var produtoSelecionado = document.querySelectorAll(".item-produto");
    var quantidades = document.querySelectorAll(".qtd-produto");
    var totalProduto = document.getElementById("valor-total");

    function calcularTotal() {
        var total = 0;
        for (var i = 0; i < produtoSelecionado.length; i++) {
            if (produtoSelecionado[i].checked) {
                var preco = Number(produtoSelecionado[i].value);
                var quantidade = Number(quantidades[i].value);
                total = total + (preco * quantidade);
            }
        }
        totalProduto.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    for (var i = 0; i < produtoSelecionado.length; i++) {
        produtoSelecionado[i].addEventListener("change", calcularTotal);
        quantidades[i].addEventListener("input", calcularTotal);
    }

    var botoes = document.querySelectorAll(".btn-adicionar");
    var alertContainer = document.createElement("div");
    alertContainer.id = "alert-container";
    var totalProdutoElement = document.getElementById("valor-total");
    totalProdutoElement.parentNode.insertBefore(alertContainer, totalProdutoElement);

    function mostrarAlerta(mensagem, tipo) {
        var alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-" + tipo + " alert-dismissible fade show";
        alertDiv.setAttribute("role", "alert");
        alertDiv.innerHTML = `
            ${mensagem}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertContainer.appendChild(alertDiv);

        setTimeout(function() {
            alertDiv.remove();
        }, 5000);
    }

    botoes.forEach(function (btn, i) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            if (!produtoSelecionado[i].checked) {
                mostrarAlerta("Selecione algum produto", "warning");
                return;
            }

            var carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

            carrinho.push({
                nome: "produto " + (i + 1),
                preco: Number(produtoSelecionado[i].value),
                quantidade: Number(quantidades[i].value)
            });

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            mostrarAlerta("Produto adicionado ao carrinho!", "success");
        });
    });
});

async function carregarDepoimentos() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=6");
            const dados = await response.json();
            
            const listaDepoimentos = document.getElementById("lista-depoimentos");
            
            listaDepoimentos.innerHTML = '<div class="row">';
            
            dados.forEach(function(item) {
                const card = `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.body}</p>
                                <small class="text-muted">Por: ${item.email}</small>
                            </div>
                        </div>
                    </div>
                `;
                listaDepoimentos.innerHTML += card;
            });
            
            listaDepoimentos.innerHTML += '</div>';
        } catch (erro) {
            console.error("Erro ao carregar depoimentos:", erro);
        }
    }
    
    carregarDepoimentos();