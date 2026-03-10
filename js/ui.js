export function renderizarDepoimentos(dados) {
    var lista = document.getElementById("lista-depoimentos");
    if (!lista) return;

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

export function mostrarAlerta(mensagem, tipo, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '<div class="alert alert-' + tipo + '">' + mensagem + '</div>';
}
