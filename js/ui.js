export function mostrarAlerta(containerId, mensagem, tipo) {
    var div = document.getElementById(containerId);
    if (!div) return;
    div.innerHTML = "<div class=\"alert alert-" + tipo + " alert-dismissible fade show\" role=\"alert\">" + mensagem + "<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button></div>";
    setTimeout(function() { div.innerHTML = ""; }, 4000);
}

export function renderizarDepoimentos(dados) {
    var lista = document.getElementById("lista-depoimentos");
    if (!lista) return;
    for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        lista.innerHTML += "<div class=\"col-md-4 mb-4\"><div class=\"card h-100\"><div class=\"card-body\"><h5 class=\"card-title\">" + item.name + "</h5><p class=\"card-text\">" + item.body + "</p><small class=\"text-muted\">Por: " + item.email + "</small></div></div></div>";
    }
}

export function limparEndereco() {
    var campos = ["rua", "bairro", "cidade", "estado"];
    for (var i = 0; i < campos.length; i++) {
        var el = document.getElementById(campos[i]);
        if (el) el.value = "";
    }
}

export function aplicarTema() {
    var temaSalvo = localStorage.getItem("tema");
    if (temaSalvo) {
        document.documentElement.setAttribute("data-bs-theme", temaSalvo);
    }
}

export function toggleTema() {
    var temaAtual = document.documentElement.getAttribute("data-bs-theme");
    var novoTema = temaAtual === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", novoTema);
    localStorage.setItem("tema", novoTema);
}
