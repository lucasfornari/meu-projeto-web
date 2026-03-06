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
        totalProduto.innerText = total.toFixed(2);
    }
    for (var i = 0; i < produtoSelecionado.length; i++) {
        produtoSelecionado[i].addEventListener("change", calcularTotal);
        quantidades[i].addEventListener("input", calcularTotal);
    }

    var botoes = document.querySelectorAll(".btn-primary");

    var botoes = document.querySelectorAll(".btn-adicionar");

    botoes.forEach(function (btn, i) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            if (!produtoSelecionado[i].checked) {
                alert("selecione algum protudo");
                return;
            }

            var carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

            carrinho.push({
                nome: "produto " + (i + 1),
                preco: produtoSelecionado[i].value,
                quantidade: quantidades[i].value
            });

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            alert("produto adicionado ao carrinho!");
        });
    });
});